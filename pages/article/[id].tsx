
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Frame from "../../components/frame"
import CategoryBar from "../../components/categoryBar"
import {getShowArticle, getRecommendArticle} from "../../libs/fetchFunction"
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { useCurrentUser } from "../../hooks/useCurrentUser"
import {getComments} from '../../libs/commentFunction'
import {useEffect, useState} from 'react'
import Meta from '../../components/meta'
import Content from "../../components/content"
import Title from "../../components/title"
import ArticlesUserPage from "../../components_pro/articlespage";
import CommentsPage from '../../components_pro/commentspage'
import {Article} from "../../types/article";
import {Comment} from "../../types/comment"

export const  getStaticProps: GetStaticProps= async (context) => {
  const id=context.params.id;
  const IndexArticle: Article | null=await getShowArticle(id);
  const categoryArticle: Article[] | null=await getRecommendArticle(IndexArticle.category);
  const Commentarticle: Comment[] =await getComments(id);

  
  return{
    props: {
      factor: {id, IndexArticle, Commentarticle, categoryArticle}
    },
    revalidate: 600,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};



const Comment: NextPage = ({factor}: any) => {

  const { isAuthChecking, currentUser } = useCurrentUser();
  const [article, setArticle] = useState<Article>(factor.IndexArticle)
  const isMine =currentUser && currentUser.id === factor.IndexArticle.user_id;

  useEffect(()=>{
    const reFetchArticle=async()=>{
      try {
        const data = await getShowArticle(factor.id);
        console.log(data)
        setArticle(data);
      } catch (err) {
        console.log(err)
      }
    }
    if(isMine===true){
      reFetchArticle();
      return
    }
  }, [factor.id, isMine])


  return (
      <>
        <Meta pageTitle={`${factor.IndexArticle.title} - newsbyte`} pageDesc={`${factor.IndexArticle.content}`} ></Meta>
        <Frame>
          <CategoryBar></CategoryBar>
          <Title article={article}></Title>
          <Content content={article}  ></Content>
          <div className="flex justify-between bg-white border-t-2">
            <h1 className=" bg-white pt-4 pl-3 text-lg font-medium">comments ({factor.Commentarticle.length})</h1>
            <Link href={currentUser ? `/article/${factor.id}/loginComments` : `/article/${factor.id}/comments`}><a className="mt-4 mr-4 border-2 px-2 p-1 rounded-lg rounded-l-full rounded-r-full text-blue-500">write!!</a></Link>
          </div>
            {factor.Commentarticle.length!==0?
            <>
                <CommentsPage isMypage={false} comments={factor.Commentarticle}></CommentsPage>
            </>
            : <h1 className="p-3 pb-4 text-center bg-white">There are no comments</h1>}
          <h1 className="bg-white pt-4 pb-4 pl-3 text-lg font-medium border-t-2">recommend</h1>
          <ArticlesUserPage articles={factor.categoryArticle} ></ArticlesUserPage>


        </Frame>


      </>
  );
}

export default Comment