import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import {getSearchArticle, getUserSearch} from "../../libs/fetchFunction"
import { GetServerSideProps } from 'next'
import type {Article} from "../../types/article"
import type {User} from "../../types/user"
import Meta from  '../../components/meta'
import Frame from "../../components/frame"
import CategoryBar from "../../components/categoryBar"
import NotFound from "../../components/notFound"
import Users from "../../components_pro/users"
import ArticlesPage from "../../components_pro/articlespage"

export const getServerSideProps: GetServerSideProps= async (context) => {
  const QWord: string | string[]=context.query.q;
  const QType: string | string[]=context.query.type ? context.query.type : '';
  const SearchResult: Article[] | null=QType==='' ? await getSearchArticle(QWord) : [];
  const SearchUser: User[] | null = QType!=='' ? await getUserSearch(QWord) : [];
  return{
    props: {
      result:{SearchResult, SearchUser, QWord, QType},
    },
  };
}


const Search: NextPage = ({result}: any) => {
  const router = useRouter();


  const a=result.SearchResult.length ? <ArticlesPage articles={result.SearchResult}></ArticlesPage> : <NotFound>{`we couldn’t find any results for “${result.QWord}”`}</NotFound>;
  const u=result.SearchUser.length?<Users users={result.SearchUser}></Users>: <NotFound>{`we couldn’t find any results for “${result.QWord}”`}</NotFound>;

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
        <Meta pageTitle={`search results for "${result.QWord}" - newsbyte`} pageDesc={`${result.SearchResult.length} search results for "${result.QWord}" - newsbyte`}></Meta>
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