import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from '../../libs/axios'
import useSWR from "swr";
import Link from 'next/link'
import { useRouter } from 'next/router';
import type {User} from "../../types/user"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import Meta from '../../components/meta'
import Frame from "../../components/frame"
import UserProfile from "../../components/userProfile"
import NotFound from "../../components/notFound"
import ArticlesUserPage from "../../components_pro/articlesUserPage"




const User: NextPage = () => {
  const router = useRouter();
  const { isAuthChecking, currentUser } = useCurrentUser();
  const fetcher = (url: string) => axios.get(url).then(res => res.data.data);
  const { data: articles } = useSWR(currentUser ? `/api/fetchMyArticle/${currentUser.id}`: null, fetcher
  );


  






  const article=<div>{typeof articles === "undefined" ? (
    <p>loading...</p>
  ) : articles.length!==0? (
    <ArticlesUserPage articles={articles}></ArticlesUserPage>
  ) : (
    <NotFound><><h1>we couldn’t find any results</h1><Link href="/create"><a className="p-1 mt-3 text-blue-500 rounded-md  ">create an article</a></Link></></NotFound>
  )}</div>
 





  const goComment=()=>{
    router.push({
      pathname:`/mypage/comments`
    });
  }





    
  if(isAuthChecking) return (<div>ログイン情報を確認中…</div>);
  
  if(!currentUser) return (<div>ログインしていません</div>);

  return (
      <>
        <Meta pageTitle={`master article page - newsbyte`} pageDesc={`you can check and delete your articles`}></Meta>
        <Frame>
        <UserProfile info={currentUser} mypage={true}></UserProfile>
          <div className="flex gap-2   pl-2">
              <div className="text-blue-500 p-2 hover:bg-gray-300 border-b-2 border-blue-500">articles</div>
              <button onClick={goComment}>
                <div className={'p-2 hover:bg-gray-300'}>comments</div>
              </button>
          </div>
          {article}



        </Frame>


      </>
  );
}

export default User