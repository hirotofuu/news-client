import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from '../../libs/axios'
import useSWR from "swr";
import { useEffect, useState, useLayoutEffect } from 'react'
import { useRouter } from 'next/router';
import {getMyArticle} from "../../libs/fetchFunction"
import {getMyComments} from "../../libs/commentFunction"
import { GetServerSideProps } from 'next'
import { useRequireLogin } from "../../hooks/useRequireLogin"
import {currentUserState} from '../../atoms/userAtom'
import type {Article} from "../../types/article"
import type {User} from "../../types/user"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import {logout} from '../../libs/account'
import Frame from "../../components/frame"
import UserProfile from "../../components/userProfile"
import NotFound from "../../components/notFound"
import ArticlesUserPage from "../../components_pro/articlesUserPage"
import CommentsUserPage from "../../components_pro/commentUserPage"




const User: NextPage = () => {
  const router = useRouter();
  const { isAuthChecking, currentUser } = useCurrentUser();
  const fetcher = (url: string) => axios.get(url).then(res => res.data.data);
  const { data: comments } = useSWR(currentUser ? `/api/fetchMyComments/${currentUser.id}`: null, fetcher
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





    
  if(isAuthChecking) return (<div>ログイン情報を確認中…</div>);
  
  if(!currentUser) return (<div>ログインしていません</div>);

  return (
      <>
        <Frame>
        <UserProfile info={currentUser} mypage={true}></UserProfile>
          <div className="flex gap-2   pl-2">
              <button onClick={goArticle}>
                <div className="p-2 hover:bg-gray-300">articles</div>
              </button>
                <div className={"text-blue-500 p-2 hover:bg-gray-300 border-b-2 border-blue-500"}>comments</div>
          </div>
          {comment}


        </Frame>


      </>
  );
}

export default User