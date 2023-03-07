import type {   NextPage, GetStaticPaths, GetStaticProps   } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Frame from "../../../components/frame"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faComment} from '@fortawesome/free-solid-svg-icons'
import {getComments} from '../../../libs/commentFunction'
import {getTitleArticle} from '../../../libs/fetchFunction'
import {Comment} from "../../../types/comment"
import { useRouter } from 'next/router';
import Meta from '../../../components/meta'
import CommentsPage from '../../../components_pro/commentspage'
import CommentTitle from "../../../components/commentTitle"
import NotFound from "../../../components/notFound"


type InputType={
  comment: string;
  day_time: string;
  article_id: number;
}

export const getStaticProps: GetStaticProps= async (context) => {
  const id=context.params.id;
  const user_id=context.params.id
  const getArticle: InputType=await getTitleArticle(id);
  const comments : Comment[]=await getComments(id);
  const commentsNumber: number=comments.length;
  
  return{
    props: {
      content:{id, user_id, comments, getArticle, commentsNumber},

    },
    revalidate: 60,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};


const NotUserComment: NextPage = ({content}: any) => {
 const router=useRouter();



  return (
      <>
      <Meta pageTitle={`${content.getArticle.title} comment - newsbyte`} pageDesc={`${content.getArticle.title} comment `} ></Meta>
      <Frame>
          <CommentTitle article={content.getArticle}></CommentTitle>      

        <div className="border-b-4 bg-white">
          <div  className=" pt-3 pb-3" >
            <div className=" ml-auto mr-auto text-center">
              <Link href="/login"><a  className="text-blue-500 hover:underline ">Please login to comment</a></Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between bg-gray-600 border-b p-2 px-6">
          <h1 className="font-semibold text-blue-300">{content.commentsNumber} <FontAwesomeIcon icon={faComment}></FontAwesomeIcon></h1>
        </div>
        {!content.commentsNumber ? <NotFound>ここにコメントはございません</NotFound> : <div className="pl-4 bg-white"><CommentsPage comments={content.comments} isMypage={false}></CommentsPage></div>   }

               
           
      </Frame>



      </>
  );
}

export default NotUserComment