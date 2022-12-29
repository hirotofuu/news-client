import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Frame from "../../../components/frame"
import { useUserState } from 'atoms/userAtom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faComment} from '@fortawesome/free-solid-svg-icons'
import {useState, ChangeEvent} from "react"
import {GetServerSideProps} from 'next'
import {createComment, getComments} from '../../../libs/commentFunction'
import {getShowArticle} from '../../../libs/fetchFunction'
import { useRouter } from 'next/router';
import Comments from "../../../components_pro/comments"
import CommentsPage from '../../../components_pro/commentspage'
import CommentTitle from "../../../components/commentTitle"
import NotFound from "../../../components/notFound"


export const getServerSideProps: GetServerSideProps= async (context) => {
  const id=context.params.id;
  const user_id=context.params.id
  const getArticle: any=await getShowArticle(id);
  const comments=await getComments(id);
  const commentsNumber: number=await comments.length
  return{
    props: {
      content:{id, user_id, comments, getArticle, commentsNumber},

    },
  };
}
type InputType={
  comment: string;
  day_time: string;
  article_id: number;
}

const NotUserComment: NextPage = ({content}: any) => {
 const router=useRouter();




  const submit=()=>{
    if(!content.user_id){
      router.replace("/login");
      return;
    }

  };
  return (
      <>
      <Frame>
          <CommentTitle article={content.getArticle}></CommentTitle>      

        <div className="border-b-4 bg-white sticky top-0">
          <div  className=" pt-3 pb-3" >
            <div className=" ml-auto mr-auto text-center">
              <Link href="/login"><a  className="text-blue-500 hover:underline ">Please login to comment</a></Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between bg-gray-600 border-b p-2 px-6">
          <h1 className="font-semibold text-blue-300">{content.commentsNumber} <FontAwesomeIcon icon={faComment}></FontAwesomeIcon></h1>
          <h2 className="text-blue-300">Hot | New</h2>
        </div>
        {!content.commentsNumber ? <NotFound></NotFound> :   <CommentsPage comments={content.comments}></CommentsPage> }

               
           
      </Frame>



      </>
  );
}

export default NotUserComment