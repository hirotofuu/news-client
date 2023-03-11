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

  useEffect(useCallback(() => {
    (async function () {

        const currentUser = await fetchCurrentUser(); // サーバーへのリクエスト（未ログインの場合は401等を返すものとする）
        console.log(currentUser);
        if(currentUser===401 || currentUser===419 || currentUser===500){
          setCurrentUser(null);
          return
        }
        setCurrentUser(currentUser);
    })();
  },[]), [setCurrentUser])
  
  return null;
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
