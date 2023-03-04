import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Frame from "../../../components/frame"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faComment} from '@fortawesome/free-solid-svg-icons'
import {useState, ChangeEvent} from "react"
import {GetServerSideProps} from 'next'
import {getComments} from '../../../libs/commentFunction'
import {getShowArticle} from '../../../libs/fetchFunction'
import {Comment} from "../../../types/comment"
import { useCurrentUser } from "../../../hooks/useCurrentUser"
import CommentTitle from "../../../components/commentTitle"
import NotFound from "../../../components/notFound"
import CommentsPage from '../../../components_pro/commentspage'
import { useIsMyInfoPage } from "../../../hooks/useMypageRoute"



type InputType={
  comment: string;
  day_time: string;
  article_id: number;
}

export const getServerSideProps: GetServerSideProps= async (context) => {
  const id=context.params.id;
  const getArticle: InputType=await getShowArticle(id);
  const comments : Comment[]=await getComments(id);
  const commentsNumber: number=comments.length;
  
  return{
    props: {
      content:{id, comments, getArticle, commentsNumber},

    },
  };
}


const AdminComment: NextPage = ({content}: any) => {
  useIsMyInfoPage(content.getArticle.user_id)


  return (
      <>
      <Frame>
          <CommentTitle article={content.getArticle}></CommentTitle>      

        <div className="flex justify-between bg-gray-600 border-b p-2 px-6">
          <h1 className="font-semibold text-blue-300">{content.commentsNumber} <FontAwesomeIcon icon={faComment}></FontAwesomeIcon></h1>
        </div>
        {!content.commentsNumber ? <NotFound>we couldn't find any resylts</NotFound> : <CommentsPage isMypage={true} comments={content.comments}></CommentsPage> }

               
           
      </Frame>



      </>
  );
}

export default AdminComment