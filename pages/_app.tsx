import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from "../components/header"
import '@fortawesome/fontawesome-svg-core/styles.css'
import {config} from '@fortawesome/fontawesome-svg-core'
import { useEffect, useCallback } from 'react';
import { useSetRecoilState, RecoilRoot, } from 'recoil';
import { currentUserState } from '../atoms/userAtom';
import { fetchCurrentUser } from '../libs/account';
import NextNprogress from 'nextjs-progressbar'


config.autoAddCss=false
function AppInit() {
  const setCurrentUser = useSetRecoilState(currentUserState);
  useEffect(()=>{
    const fetch =async()=>{
      const i  = await fetchCurrentUser(); 
      setCurrentUser(i);
    }
    fetch()
  }, [])
  return null
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <RecoilRoot>  
          <NextNprogress/>
          <Header></Header>
          <Component {...pageProps} />
          <AppInit />
        </RecoilRoot>

    </>
  
  )
}

export default MyApp
