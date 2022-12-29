import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {getCategoryArticle} from "../../libs/fetchFunction"
import { GetServerSideProps } from 'next'
import Frame from "../../components/frame"
import CategoryBar from "../../components/categoryBar"
import Articles from "../../components_pro/articles"
import NotFound from "../../components/notFound"
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
          {factor.number ? <Articles articles={factor.categoryArticle}></Articles> : <NotFound keyword={factor.category}></NotFound>}

        </Frame>


      </>
  );
}

export default Category