import type {  NextPage, GetStaticPaths, GetStaticProps  } from 'next'
import Frame from "../../../components/frame"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faComment, faRotateRight} from '@fortawesome/free-solid-svg-icons'
import {useState, ChangeEvent} from "react"
import {createComment, getComments} from '../../../libs/commentFunction'
import {getTitleArticle} from '../../../libs/fetchFunction'
import { useRouter } from 'next/router';
import { useCurrentUser } from "../../../hooks/useCurrentUser"
import {Comment} from "../../../types/comment"
import {Article} from "../../../types/article"
import Meta from '../../../components/meta'
import CommentsPage from '../../../components_pro/commentspage'
import CommentTitle from "../../../components/commentTitle"
import NotFound from "../../../components/notFound"





export const getStaticProps: GetStaticProps= async (context) => {
  const id=context.params.id;
  const getArticle: Article=await getTitleArticle(id);
  const comments : Comment[]=await getComments(id);
  const commentsNumber: number=comments.length;


  return{
    props: {
      content:{id , comments, getArticle, commentsNumber},

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

type InputType={
  comment: string;
  day_time: string;
  article_id: string;
}


const Comment: NextPage = ({content}: any) => {
  const now = new Date();
  const [indexComment, setIndexComment]=useState<Comment[] | null>(content.comments);


  const router = useRouter();

  const { isAuthChecking, currentUser } = useCurrentUser();
  
  const [commentForm, setCommentForm]=useState<InputType>({
    comment: '',
    day_time: `${now.getFullYear()}/${(now.getMonth() + 1)}/${now.getDate()}`,
    article_id: content.id,
  })

  const updateCommentForm=(e: ChangeEvent<HTMLTextAreaElement>)=>{
    setCommentForm({ ...commentForm, comment: e.target.value });
  }


  const deposit=async()=>{
    const a=await createComment(commentForm, currentUser.api_token);
    setCommentForm({ ...commentForm, comment:''});
    return ;
  }


  const submit=async()=>{
    if(!currentUser){
      router.replace("/login");
      return;
    }
    const a = await deposit();



  };  
  
  const fetchComment=async()=>{
    const comments : Comment[]=await getComments(content.id);
    setIndexComment(comments)
  }
  







  if(isAuthChecking) return (<div>ログイン情報を確認中…</div>);
  
  if(!currentUser) return (<div>ログインしていません</div>);

  return (
      <>
      <Meta pageTitle={`${content.getArticle.title} comment - newsbyte`} pageDesc={`${content.getArticle.title} comment `} ></Meta>
      <Frame>
        <CommentTitle article={content.getArticle}></CommentTitle>  
        <div className=" bg-white">
          <div  className="p-3  flex " >
              <button onClick={()=>fetchComment()} className="mr-3 text-xl"><FontAwesomeIcon icon={faRotateRight}></FontAwesomeIcon></button>
              <textarea placeholder="Comment" onChange={updateCommentForm} value={commentForm.comment} className="resize-none border border-gray-500 w-full  p-1"></textarea>
              <button onClick={submit} className="p-1 bg-indigo-500 text-white rounded-r-sm">go</button>
          </div>
        </div>



        <div className="flex justify-between bg-gray-600 border-b p-2 px-6 mt-2">
          <div className="font-semibold text-blue-300">
            {indexComment.length} <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
          </div>
            <h1 className="text-blue-300">Hot</h1>
        </div>
        {indexComment.length===0 ? <NotFound>ここには何もありません</NotFound> : <CommentsPage isMypage={false} comments={indexComment} ></CommentsPage>}

               
           
      </Frame>



      </>
  );
}

export default Comment