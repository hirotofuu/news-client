import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {getCategoryArticle} from "../../libs/fetchFunction"
import { GetServerSideProps } from 'next'
import Frame from "../../components/frame"
import CategoryBar from "../../components/categoryBar"
import NotFound from "../../components/notFound"
import ArticlesPage from "../../components_pro/articlespage"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const category=context.params.category;
  const categoryArticle: any=await getCategoryArticle(category);
  const number: number= categoryArticle.length;
  return{
    props: {
      factor: {
        categoryArticle,
        category,
        number
      }
    },
  };
}


const Category: NextPage = ({factor}: any) => {
  return (
      <>
        <Frame>
          <CategoryBar></CategoryBar>
          <h1 className="p-2 text-lg font-semibold border-b-2 border-blue-500 bg-whitw">{factor.category}</h1>
          {factor.number ? <ArticlesPage articles={factor.categoryArticle}></ArticlesPage> : <NotFound >{factor.category}には記事がありません</NotFound>}

        </Frame>


      </>
  );
}

export default Category