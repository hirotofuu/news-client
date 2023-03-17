import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from '../../libs/axios'
import useSWR from "swr";
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useRouter } from 'next/router';
import {useGetUserinfo} from '../../hooks/useGetUserinfo'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import Meta from "../../components/meta"
import Frame from "../../components/frame"
import UserProfile from "../../components/userProfile"
import NotFound from "../../components/notFound"
import CommentsUserPage from "../../components_pro/commentUserPage"


export const getServerSideProps: GetServerSideProps= async (context) => {

  const cookies = nookies.get(context)

  return{
    props: {
      result:{cookies},
    },
  };
}

const Comment: NextPage = ({result}: any) => {
  const router = useRouter();
  const { isAuthChecking, currentUser } = useCurrentUser();
  const {getUserinfo}=useGetUserinfo()
  const fetcher = (url: string) => axios.get(url).then(res => res.data.data);
  const { data: comments } = useSWR(currentUser ? `/api/fetchMyComments/${currentUser.id}?api_token=${currentUser.api_token}`: null, fetcher
  );

  




  const comment=<div>{typeof comments === "undefined" ? (
    <p>loading...</p>
  ) : comments.length!==0? (
    <CommentsUserPage comments={comments}></CommentsUserPage>
  ) : (
    <NotFound>we couldn’t find any results</NotFound>
  )}</div>
 





  const goArticle=()=>{
    router.push({
      pathname:`/mypage/articles`
    });
  }



  getUserinfo(result.cookies.accessToken)

    
  if(isAuthChecking) return (<div>ログイン情報を確認中…</div>);
  
  if(!currentUser) return (<div>ログインしていません</div>);

  return (
      <>
        <Meta pageTitle={`master comment page - newsbyte`} pageDesc={`you can check and delete your comments`}></Meta>
        <Frame>
        <UserProfile info={currentUser} mypage={true}></UserProfile>
          <div className="flex gap-2   pl-2">
              <button onClick={goArticle}>
                <div className="p-2 hover:bg-gray-300">articles</div>
              </button>
                <h1 className={"text-blue-500 p-2 hover:bg-gray-300 border-b-2 border-blue-500"}>comments</h1>
          </div>
          {comment}


        </Frame>


      </>
  );
}

export default Comment