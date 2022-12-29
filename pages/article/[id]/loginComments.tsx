import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Frame from "../../../components/frame"
import { useUserState } from 'atoms/userAtom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faComment, faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {useState, ChangeEvent} from "react"
import {GetServerSideProps} from 'next'
import {createComment, getComments} from '../../../libs/commentFunction'
import {getShowArticle} from '../../../libs/fetchFunction'
import { useRouter } from 'next/router';
import Comments from "../../../components_pro/comments"
import CommentsPage from '../../../components_pro/commentspage'
import CommentTitle from "../../../components/commentTitle"
import NotFound from "../../../components/notFound"
import { userAgent } from 'next/server'


export const getServerSideProps: GetServerSideProps= async (context) => {
  const id=context.params.id
  const getArticle: any=await getShowArticle(id);
  const comments=await getComments(id);
  const commentsNumber: number=await comments.length
  return{
    props: {
      content:{id , comments, getArticle, commentsNumber},

    },
  };
}
type InputType={
  comment: string;
  day_time: string;
  article_id: number;
}


const Comment: NextPage = ({content}: any) => {
  const now = new Date();

  const {user}=useUserState();

  const router = useRouter();

  const [myFactor, setMyFactor]=useState<boolean>(false);

  let myData=content.comments.filter((comment: any)=>{
    return comment.user_id===comment.user_id;
  });

  const otherData=content.comments.filter((comment: any)=>{
    return comment.user_id!==comment.user_id;
  });
  
  const [commentForm, setCommentForm]=useState<InputType>({
    comment: '',
    day_time: `${now.getFullYear()}/${(now.getMonth() + 1)}/${now.getDate()}`,
    article_id: content.id,
  })

  const updateCommentForm=(e: ChangeEvent<HTMLTextAreaElement>)=>{
    setCommentForm({ ...commentForm, comment: e.target.value });
  }

  const deposit=async()=>{
    const a=await createComment(commentForm);
    setCommentForm({ ...commentForm, comment:''});
    window.location.reload();
    return ;
  }

  const submit=()=>{
    if(!user){
      router.replace("/login");
      return;
    }
    deposit();

  };
  return (
      <>
      <Frame>
          <CommentTitle article={content.getArticle}></CommentTitle>      
        <div className=" bg-white sticky top-0">
          <div  className=" pt-3 pb-3" >
            <div className="flex ml-auto mr-auto w-11/12">
              <div className="bg-black  w-8 h-8 rounded-full">ssaeadsad</div>
              <textarea placeholder="Comment" onChange={updateCommentForm} value={commentForm.comment} className="resize-none border border-gray-500 w-full ml-3 p-1"></textarea>
              <button onClick={submit} className="p-1 bg-indigo-500 text-white rounded-r-sm">go</button>
            </div>
          </div>
        </div>

          <h2 onClick={()=>setMyFactor(!myFactor)} className="flex justify-between  bg-white p-3 text-lg font-medium hover: cursor-pointer">
            <div>your comments ({myData.length})</div>
            <div>{myFactor ? <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon> : <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>}</div>
            </h2>
        <div className={!myFactor ? "hidden": ""}>
          <Comments comments={myData}></Comments>
        </div>


        <div className="flex justify-between bg-gray-600 border-b p-2 px-6 mt-2">
          <h1 className="font-semibold text-blue-300">{otherData.length} <FontAwesomeIcon icon={faComment}></FontAwesomeIcon></h1>
          <h2 className="text-blue-300">Hot | New</h2>
        </div>
        {!otherData.length ? <NotFound></NotFound> :   <CommentsPage comments={otherData}></CommentsPage> }

               
           
      </Frame>



      </>
  );
}

export default Comment