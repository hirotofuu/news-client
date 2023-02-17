import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import {getUserArticle, getUserInfo} from "../../libs/fetchFunction"
import {getUserComments} from "../../libs/commentFunction"
import { GetServerSideProps } from 'next'
import {getFollowing} from "../../libs/followFunction"
import type {User} from "../../types/user"
import type {Article} from "../../types/article"
import Frame from "../../components/frame"
import UserProfile from "../../components/userProfile"
import ArticlesPage from "../../components_pro/articlespage"
import NotFound from "../../components/notFound"
import CommentsPage from "../../components_pro/commentspage"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user_id: string | string[]=context.params.user_id;
  const type: string | string[]=context.query.type ? context.query.type : '';
  const userArticle: Article[] | null= type==='' ? await getUserArticle(user_id) : [] ;
  const userComment: any= type!=='' ? await getUserComments(user_id) : [] ;
  const userInfo: User | null=await getUserInfo(user_id);

  return{
    props: {
      factor: {
        userArticle,
        userComment,
        userInfo,
        type,
        user_id,
      }
    },
  };
}


const User: NextPage = ({factor}: any) => {
  const router = useRouter();
  const article=factor.userArticle.length ? <ArticlesPage articles={factor.userArticle}></ArticlesPage> : <NotFound>ここには何もありません</NotFound>;
  const comment=factor.userComment.length ? <CommentsPage comments={factor.userComment}></CommentsPage> : <NotFound>コメントをしていません</NotFound>;
  const goUser=()=>{
    router.push({
      pathname:`/user/${factor.user_id}`,
      query: {type: "user"}
    });
  }

  const goArticle=()=>{
    router.push({
      pathname:`/user/${factor.user_id}`
    });
  }
  return (
      <>
        <Frame>
          <UserProfile info={factor.userInfo}></UserProfile>
          <div className="flex gap-2   pl-2">
              <button onClick={goArticle}>
                <div className={!factor.type?"text-blue-500 p-2 hover:bg-gray-300 border-b-2 border-blue-500":'p-2 hover:bg-gray-300'}>articles</div>
              </button>
              <button onClick={goUser}>
                <div className={factor.type==="user"?"text-blue-500 p-2 hover:bg-gray-300 border-b-2 border-blue-500":'p-2 hover:bg-gray-300'}>comments</div>
              </button>
          </div>
          {!factor.type ? article : factor.type==="user" ? comment : '' }


        </Frame>


      </>
  );
}

export default User