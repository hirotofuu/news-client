import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import {getUserArticle} from "../../libs/fetchFunction"
import {getUserInfo} from "../../libs/fetchFunction"
import {getUserComments} from "../../libs/commentFunction"
import { GetServerSideProps } from 'next'
import Frame from "../../components/frame"
import Articles from "../../components_pro/articles"
import Comments from "../../components_pro/comments"
import UserProfile from "../../components/userProfile"
import {useState} from "react"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user_id=context.params.user_id;
  const type=context.query.type ? context.query.type : '';
  const userArticle: any=await getUserArticle(user_id);
  const userComment: any=await getUserComments(user_id)
  const userInfo: any=await getUserInfo(user_id);
  const number: number= userArticle.length;
  return{
    props: {
      factor: {
        userArticle,
        userComment,
        userInfo,
        number,
        type,
        user_id,
      }
    },
  };
}


const User: NextPage = ({factor}: any) => {
  const router = useRouter();
  const [type, setType]=useState<number>(1);
  const article=<Articles articles={factor.userArticle}></Articles>
  const comment=<Comments comments={factor.userComment}></Comments>
  const goUser=()=>{
    router.push({
      pathname:`/user/${factor.user_id}`,
      query: {type: "user"}
    });
  }

  const goArticle=()=>{
    router.push({
      pathname:`/user/${factor.user_id}`
    });
  }
  return (
      <>
        <Frame>
          <UserProfile info={factor.userInfo}></UserProfile>
          <div className="flex gap-2   pl-2">
              <button onClick={goArticle}>
                <div className={!factor.type?"text-blue-500 p-2 hover:bg-gray-300 border-b-2 border-blue-500":'p-2 hover:bg-gray-300'}>articles</div>
              </button>
              <button onClick={goUser}>
                <div className={factor.type==="user"?"text-blue-500 p-2 hover:bg-gray-300 border-b-2 border-blue-500":'p-2 hover:bg-gray-300'}>comments</div>
              </button>
              <button onClick={()=>setType(3)}>
                <div className={type===3?"text-blue-500 p-2 hover:bg-gray-300 border-b-2 border-blue-500":'p-2 hover:bg-gray-300'}>following</div>
              </button>
          </div>
          {!factor.type ? article : factor.type==="user" ? comment : '' }


        </Frame>


      </>
  );
}

export default User