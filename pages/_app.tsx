import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from "../components/header"
import '@fortawesome/fontawesome-svg-core/styles.css'
import {config} from '@fortawesome/fontawesome-svg-core'
import { useEffect, useCallback } from 'react';
import { useSetRecoilState, RecoilRoot, } from 'recoil';
import {getIndexArticle} from '../libs/fetchFunction'
import { currentUserState } from '../atoms/userAtom';
import { fetchCurrentUser } from '../libs/account';
import {useCurrentPass} from '../hooks/useCorrectPass'
import NextNprogress from 'nextjs-progressbar'
import {getcookies} from '../libs/cookie/tool'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
config.autoAddCss=false




function MyApp({ Component, pageProps }: AppProps, props: any) {
  const a=getcookies(null)

  function AppInit() {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const {currentPass}=useCurrentPass()
  useEffect(() => {
    (async function () {

        try {
          const currentUser  = await fetchCurrentUser(currentPass); // サーバーへのリクエスト（未ログインの場合は401等を返すものとする）
    // ログインユーザーの情報が取得できたのでグローバルステートにセット
          setCurrentUser(currentUser);
          return;
        } catch {
          // 未ログイン（未ログイン時のリダイレクト処理などをここに書いても良いかも）
          setCurrentUser(null);
        }

    })();
  },[])
  
  return null;
}

  return (
    <>
        <RecoilRoot>  
          <NextNprogress/>
          <Header></Header>
          <Component {...pageProps} />
        </RecoilRoot>

    </>
  
  )
}


export default MyApp
