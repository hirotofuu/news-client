import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useUserState } from '../atoms/userAtom';
import { useRouter } from 'next/router';
import {getIndexArticle, getTimelineArticle} from "../libs/fetchFunction"
import { GetServerSideProps } from 'next'
import type {Article} from "../types/article"
import Frame from "../components/frame"
import CategoryBar from "../components/categoryBar"
import ArticlesPage from "../components_pro/articlespage"



export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: string | string[]=context.query.id ? context.query.id : '';
  const userArticle: Article[] | null= id!=='' ? await getTimelineArticle(id) : [] ;
  const IndexArticle: Article[] | null= id==='' ? await getIndexArticle() : [] ;
  return{
    props: {
      factor:{
        IndexArticle,
        userArticle,
        id,

      }

    },
  };
}

const Home: NextPage = ({factor}: any) => {
  const {user}=useUserState();
  const router = useRouter();
  const goTimeline=()=>{
    if(user.id===null){
      router.push("/login");
      return;
    }
    router.push({
      pathname:'/',
      query: {id: `${user.id}`}
    });
  }


  return (
      <>
          
            <Frame>

              <CategoryBar></CategoryBar>
              <div className="flex mb-1">
                <div className={factor.id==='' ? "w-1/2 border-b-2 border-blue-500" : "w-1/2"}>
                  <Link href="/"><a  className="block p-3 text-lg font-bold text-center hover:opacity-40 ">top</a></Link>
                </div>
                <div className={factor.id!=='' ? "w-1/2 border-b-2 border-blue-500" : "w-1/2"}>
                  <button onClick={goTimeline} className="w-full  ml-auto mr-auto block p-3 text-lg font-bold text-center hover:opacity-40" >following</button>
                </div>
              </div>
              <ArticlesPage articles={factor.id==='' ? factor.IndexArticle  : factor.userArticle}></ArticlesPage>
            </Frame>
      </>

  );
}

export default Home
