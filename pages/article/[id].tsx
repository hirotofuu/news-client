import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Frame from "../../components/frame"
import CategoryBar from "../../components/categoryBar"
import {getShowArticle, getCategoryArticle} from "../../libs/fetchFunction"
import {GetServerSideProps} from 'next'
import {getComments} from '../../libs/commentFunction'
import { useUserState } from 'atoms/userAtom';
import Content from "../../components/content"
import Title from "../../components/title"
import Comments from "../../components_pro/comments"
import Back from "../../components/back"
import ArticlesUserPage from "../../components_pro/articlespage";
import {Article} from "../../types/article";

export const getServerSideProps: GetServerSideProps= async (context) => {
  const id=context.params.id;
  const IndexArticle: Article | null=await getShowArticle(id);
  const categoryArticle: Article[] | null=await getCategoryArticle(IndexArticle.category);
  const Commentarticle: any =await getComments(id);

  return{
    props: {
     article: {id, IndexArticle, Commentarticle, categoryArticle}
    },
  };
}



const Comment: NextPage = ({article}: any) => {
  const {user}=useUserState();
  return (
      <>
        <Frame>
          
          <CategoryBar></CategoryBar>
          <Title article={article.IndexArticle}></Title>
          <Content content={article.IndexArticle}  ></Content>
          <div className="flex justify-between bg-white border-t-2">
            <h1 className=" bg-white pt-4 pl-3 text-lg font-medium">comments ({article.Commentarticle.length})</h1>
            <Link href={user.id ? `/article/${article.id}/loginComments`:`/article/${article.id}/comments`}><a className="mt-4 mr-4 border-2 px-2 p-1 rounded-lg rounded-l-full rounded-r-full text-blue-500">write!!</a></Link>
          </div>
            {article.Commentarticle.length!==0?<Comments comments={article.Commentarticle}></Comments>: <h1 className="p-3 pb-4 text-center bg-white">There are no comments</h1>}
            <div className="bg-white">
          </div>
          <h1 className="bg-white pt-4 pl-3 text-lg font-medium border-t-2">recommend</h1>
          <ArticlesUserPage articles={article.categoryArticle}></ArticlesUserPage>


        </Frame>


      </>
  );
}

export default Comment