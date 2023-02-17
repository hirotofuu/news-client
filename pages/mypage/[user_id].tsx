import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import {getMyArticle, getMypageInfo} from "../../libs/fetchFunction"
import {getMyComments} from "../../libs/commentFunction"
import { GetServerSideProps } from 'next'
import { useUserState } from '../../atoms/userAtom';
import type {Article} from "../../types/article"
import type {User} from "../../types/user"
import Frame from "../../components/frame"
import UserProfile from "../../components/userProfile"
import NotFound from "../../components/notFound"
import CommentsUserPage from "../../components_pro/commentUserPage"
import ArticlesUserPage from "../../components_pro/articlesUserPage"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user_id: string | string[]=context.params.user_id;
  const type : string | string[]=context.query.type ? context.query.type : '';
  const userArticle: Article[] | null= type==='' ? await getMyArticle(user_id) : [];
  const userComment: any= type!=='' ? await getMyComments() : [];
  const userInfo: User | null=await getMypageInfo(user_id);
  const Anumber: number= userArticle.length;
  const Cnumber: number=await userComment.length;
  return{
    props: {
      factor: {
        userArticle,
        userComment,
        userInfo,
        Anumber,
        Cnumber,
        type,
      }
    },
  };
}


const User: NextPage = ({factor}: any) => {
  const router = useRouter();

  const {user}=useUserState();

  const article=factor.Anumber ? <ArticlesUserPage articles={factor.userArticle}></ArticlesUserPage> : <NotFound>ここには何もありません<a href="/create" className="text-blue-500">記事を書こう</a></NotFound>;

  const comment=factor.Cnumber ? <CommentsUserPage comments={factor.userComment}></CommentsUserPage> : <NotFound>コメントをしていません</NotFound>;

  const goUser=()=>{
    router.push({
      pathname:`/mypage/${user.id}`,
      query: {type: "user"}
    });
  }

  const goArticle=()=>{
    router.push({
      pathname:`/mypage/${user.id}`
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