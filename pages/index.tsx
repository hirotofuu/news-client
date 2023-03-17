import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import axios from '../libs/axios'
import useSWR from 'swr'
import { useRouter } from 'next/router';
import {getIndexArticle} from "../libs/fetchFunction"
import {useGetUserinfo} from '../hooks/useGetUserinfo'
import type {Article} from "../types/article"
import Meta from "../components/meta"
import NotFound from "../components/notFound"
import Frame from "../components/frame"
import CategoryBar from "../components/categoryBar"
import ArticlesPage from "../components_pro/articlespage"
import { useCurrentUser } from "../hooks/useCurrentUser"
import nookies from 'nookies'



export const getServerSideProps: GetServerSideProps = async (context) => {
  const userArticle: Article[] | null=  await getIndexArticle() ;
  const cookies = nookies.get(context)
  return{
    props: {
      factor:{
        userArticle,
        cookies

      }
    },
  };
}

const Home: NextPage = ({factor}: any) => {
  const { isAuthChecking, currentUser } = useCurrentUser();
  const {getUserinfo}=useGetUserinfo()
  getUserinfo(factor.cookies.uid)  
  return (
      <>
          
            <Frame>
              <Meta pageTitle="newsbyte" pageDesc="newsbyte home. you can share your knowledge, view and know world "></Meta>
              <CategoryBar></CategoryBar>
              <div className="flex mb-1">
                <div className={"w-1/2 border-b-2 border-blue-500"}>
                  <Link href="/"><a  className="block p-3 text-lg font-bold text-center hover:opacity-40 ">top</a></Link>
                </div>
                <div className={"w-1/2"}>
                <Link href={currentUser ? `/mypage/${currentUser.id}` : "/login"}><a  className="block p-3 text-lg font-bold text-center hover:opacity-40 ">following</a></Link>
                </div>
              </div>
              {factor.userArticle.length!==0 ? <ArticlesPage articles={factor.userArticle}></ArticlesPage> : <NotFound>we couldn’t find any results </NotFound>}
            </Frame>
      </>

  );
}

export default Home
