import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {getTimelineArticle} from "../../libs/fetchFunction"
import { GetServerSideProps } from 'next'
import {useGetUserinfo} from '../../hooks/useGetUserinfo'
import nookies from 'nookies'
import type {Article} from "../../types/article"
import Meta from '../../components/meta'
import NotFound from "../../components/notFound"
import Frame from "../../components/frame"
import CategoryBar from "../../components/categoryBar"
import ArticlesPage from "../../components_pro/articlespage"
import { useIsMyInfoPage } from "../../hooks/useMypageRoute"



export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: string | string[]=context.query.id ? context.query.id : '';
  const followingArticle: Article[] | null= await getTimelineArticle(id);
  const cookies = nookies.get(context)
  return{
    props: {
      factor:{
        followingArticle,
        id,
        cookies,
      }

    },
  };
}

const Home: NextPage = ({factor}: any) => {
  console.log(factor.cookies.accessToken)
  const {getUserinfo}=useGetUserinfo()
  getUserinfo(factor.cookies.uid)
  useIsMyInfoPage(factor.id)
  return (
    
      <>
            <Meta pageTitle={`following articles - newsbyte`} pageDesc={`you can check following user's articles`}></Meta>
          
            <Frame>
              <CategoryBar></CategoryBar>
              <div className="flex mb-1">
                <div className={"w-1/2"}>
                  <Link href="/"><a  className="block p-3 text-lg font-bold text-center hover:opacity-40 ">top</a></Link>
                </div>
                <div className={"w-1/2 border-b-2 border-blue-500"}>
                  <button className="w-full  ml-auto mr-auto block p-3 text-lg font-bold text-center hover:opacity-40" >following</button>
                </div>
              </div>
              {factor.followingArticle.length!==0 ? <ArticlesPage articles={factor.followingArticle}></ArticlesPage> : <NotFound>we couldn’t find any results </NotFound>}
            </Frame>
      </>

  );
}

export default Home