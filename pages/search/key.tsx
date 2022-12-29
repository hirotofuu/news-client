import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import { useRouter } from 'next/router';
import {getSearchArticle, getUserSearch} from "../../libs/fetchFunction"
import { GetServerSideProps } from 'next'
import Frame from "../../components/frame"
import CategoryBar from "../../components/categoryBar"
import Articles from "../../components_pro/articles"
import NotFound from "../../components/notFound"
import Users from "../../components_pro/users"


export const getServerSideProps: GetServerSideProps= async (context) => {
  const QWord=context.query.q;
  const QType=context.query.type ? context.query.type : '';
  const SearchResult: any=await getSearchArticle(QWord);
  const articleNumber: number= await SearchResult.length;
  const SearchUser: any=await getUserSearch(QWord);
  const userNumber: number=await SearchUser.length;
  return{
    props: {
      result:{SearchResult, articleNumber, SearchUser, userNumber, QWord, QType},
    },
  };
}


const Search: NextPage = ({result}: any) => {
  const router = useRouter();


  const a=result.articleNumber ? <Articles articles={result.SearchResult}></Articles> : <NotFound keyword={result.QWord} what="articles">articles</NotFound>;
  const u=result.userNumber?<Users users={result.SearchUser}></Users>: <NotFound keyword={result.QWord} what="users">users</NotFound>;

  const goUser=()=>{
    router.push({
      pathname:'/search/key',
      query: {q: result.QWord, type: "user"},
    });
  }

  const goArticle=()=>{
    router.push({
      pathname:'/search/key',
      query: {q: result.QWord}
    });
  }

  return (
      <>
        <Frame>
          <CategoryBar></CategoryBar>
          <div className="flex gap-2 m-4">
              <button onClick={goArticle} className={"p-2 rounded-3xl  hover:bg-gray-300"}>
                <div className={!result.QType?"text-blue-700":''}>articles</div>
              </button>
              <button onClick={goUser} className={`p-2 rounded-3xl hover:bg-gray-300 `}>
                <div className={result.QType==="user"?"text-blue-700":''}>users</div>
              </button>
          </div>
          <h1 className="bg-white p-3">{`results for " ${result.QWord} "`}</h1>
          <div>{!result.QType ? a : u}</div>
        </Frame>
      </>
  );
}

export default Search