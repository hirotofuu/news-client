import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {getCategoryArticle} from "../../libs/fetchFunction"
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import type {Article} from "../../types/article"
import Meta from "../../components/meta"
import Frame from "../../components/frame"
import CategoryBar from "../../components/categoryBar"
import NotFound from "../../components/notFound"
import ArticlesPage from "../../components_pro/articlespage"

export const getStaticProps: GetStaticProps = async (context) => {
  const category=context.params.category;
  const categoryArticle: Article[] | null=await getCategoryArticle(category);
  const number: number= categoryArticle.length;
  return{
    props: {
      factor: {
        categoryArticle,
        category,
        number
      }
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


const Category: NextPage = ({factor}: any) => {
  return (
      <>
        <Meta pageTitle={`${factor.category} - newsbyte`} pageDesc={`${factor.category} page`} ></Meta>
        <Frame>
          <CategoryBar></CategoryBar>
          <h1 className="p-2 text-lg font-semibold border-b-2 border-blue-500 bg-whitw">{factor.category}</h1>
          {factor.number ? <ArticlesPage articles={factor.categoryArticle}></ArticlesPage> : <NotFound >we could not  find any resylts for {factor.category}</NotFound>}

        </Frame>


      </>
  );
}

export default Category