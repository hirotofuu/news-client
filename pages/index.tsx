import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import axios from '../libs/axios'
import useSWR from 'swr'
import { useRouter } from 'next/router';
import {getIndexArticle} from "../libs/fetchFunction"
import { GetStaticProps, GetStaticPaths } from 'next'
import type {Article} from "../types/article"
import NotFound from "../components/notFound"
import Frame from "../components/frame"
import CategoryBar from "../components/categoryBar"
import ArticlesPage from "../components_pro/articlespage"
import { useCurrentUser } from "../hooks/useCurrentUser"



export const getStaticProps: GetStaticProps = async () => {
  const userArticle: Article[] | null=  await getIndexArticle() ;
  return{
    props: {
      factor:{
        userArticle,

      }

    },
    revalidate: 150,
  };
}

const Home: NextPage = ({factor}: any) => {
  const router = useRouter();
  const { isAuthChecking, currentUser } = useCurrentUser();

  if(isAuthChecking)return(<div>....login tyousa</div>)
  return (
      <>
          
            <Frame>
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
