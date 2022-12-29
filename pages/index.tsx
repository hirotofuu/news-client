import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {getIndexArticle} from "../libs/fetchFunction"
import { GetServerSideProps } from 'next'
import Articles from "../components_pro/articles"
import Frame from "../components/frame"
import CategoryBar from "../components/categoryBar"

type index={
  id: number,
  title: string,
  content: string,
  day_time: string,
  view_number: number,
  user_id: number,
  user_name: string,
};

export const getServerSideProps: GetServerSideProps = async () => {
  const IndexArticle: index[]=await getIndexArticle();
  return{
    props: {
     IndexArticle,
    },
  };
}

const Home: NextPage = ({IndexArticle}: any) => {
  return (
      <>
          
            <Frame>
              <CategoryBar></CategoryBar>
              <Articles articles={IndexArticle}></Articles>
            </Frame>
      </>

  );
}

export default Home
