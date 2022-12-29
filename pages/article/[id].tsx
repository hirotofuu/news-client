import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Frame from "../../components/frame"
import CategoryBar from "../../components/categoryBar"
import {getShowArticle} from "../../libs/fetchFunction"
import {getCategoryArticle} from "../../libs/fetchFunction"
import {GetServerSideProps} from 'next'
import {getComments} from '../../libs/commentFunction'
import { useUserState } from 'atoms/userAtom';
import Content from "../../components/content"
import Title from "../../components/title"
import Articles from "../../components_pro/articles"
import Comments from "../../components_pro/comments"

export const getServerSideProps: GetServerSideProps= async (context) => {
  const id=context.params.id;
  const IndexArticle: any=await getShowArticle(id);
  const CategoryArticle: any=await getCategoryArticle(IndexArticle.category);
  const Commentarticle: any =await getComments(id);
  const CommentNumber: number=Commentarticle.length;
  const recommendData:any =CategoryArticle.slice(0, 5);
  return{
    props: {
     article: {id, IndexArticle, recommendData, Commentarticle, CommentNumber}
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
          <Content content={article.IndexArticle.content} image_file={article.IndexArticle.image_file} ></Content>
          <div className="flex justify-between bg-white border-t-2">
            <h1 className=" bg-white pt-4 pl-3 text-lg font-medium">comments ({article.CommentNumber})</h1>
            <Link href={user ? `/article/${article.id}/loginComments`:`/article/${article.id}/comments`}><a className="mt-4 mr-4 border-2 px-2 p-1 rounded-lg rounded-l-full rounded-r-full text-blue-500">write!!</a></Link>
          </div>
          {article.CommentNumber!==0?<Comments comments={article.Commentarticle}></Comments>: <h1 className="p-3 pb-4 text-center bg-white">There are no comments</h1>}
          <div className="bg-white">
          </div>
          <h1 className="border-t-2 bg-white pt-4 pl-3 text-lg font-medium">recommends</h1>
          <Articles articles={article.recommendData}></Articles>

        </Frame>


      </>
  );
}

export default Comment