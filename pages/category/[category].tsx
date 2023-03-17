import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {getCategoryArticle} from "../../libs/fetchFunction"
import { GetServerSideProps, NextPage} from 'next'
import {useGetUserinfo} from '../../hooks/useGetUserinfo'
import nookies from 'nookies'
import type {Article} from "../../types/article"
import Meta from "../../components/meta"
import Frame from "../../components/frame"
import CategoryBar from "../../components/categoryBar"
import NotFound from "../../components/notFound"
import ArticlesPage from "../../components_pro/articlespage"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const category=context.params.category;
  const categoryArticle: Article[] | null=await getCategoryArticle(category);
  const number: number= categoryArticle.length;
  const cookies = nookies.get(context)
  return{
    props: {
      factor: {
        categoryArticle,
        category,
        number,
        cookies
      }
    },
  };
}



const Category: NextPage = ({factor}: any) => {
  const {getUserinfo}=useGetUserinfo()
  getUserinfo(factor.cookies.uid)
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