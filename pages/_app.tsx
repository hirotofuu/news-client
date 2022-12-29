import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from "../components/header"
import '@fortawesome/fontawesome-svg-core/styles.css'
import {config} from '@fortawesome/fontawesome-svg-core'
import {RecoilRoot} from 'recoil';
config.autoAddCss=false
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
          <Header></Header>
          <Component {...pageProps} />
      </RecoilRoot>

    </>
  
  )
}

export default MyApp
