import {useState, useEffect, ChangeEvent} from 'react'
import {goodFunc} from "../../libs/goodFunction"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faThumbsUp, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';
import { useCurrentUser } from "../../hooks/useCurrentUser"
import {getReplyComments, replyComment} from '../../libs/commentFunction'
import {DeleteComment} from '../../libs/commentFunction'
import {Comment} from "../../types/comment"
import CommentsPage from '../../components_pro/commentspage'
import Avatar from 'react-avatar';
import Link from 'next/link';

interface Props {
  comment: Comment | null;
  isMypage: boolean;
}

type InputType={
  comment: string;
  day_time: string;
  parent_id: string ;
  article_id: string;
}

const CommentChoice: React.FC<Props> =(props: Props)=>{
  const comment=props.comment;
  const router=useRouter();
  const { isAuthChecking, currentUser } = useCurrentUser();
  const [isGood, setIsGood]=useState<boolean>(false);
  const [isReply, setIsReply]=useState<boolean>(false);
  const [isTextArea, setIsTextArea]=useState<boolean>(false);
  const [GoodNumber, setGoodNumber]=useState<number>(comment.good_number);
  const [reply, setReply]=useState<Comment[]>([]);
  const [replynumber, setReplynumber]=useState<number>(comment.child_number)
  const [isDelete, setIsDelete]=useState<boolean>(false);
  const [replyForm, setReplyForm]=useState<InputType>({
    comment: '',
    day_time: `${new Date().getFullYear()}/${(new Date().getMonth() + 1)}/${new Date().getDate()}`,
    article_id: comment.article_id,
    parent_id: comment.id,
  })


  const updateCommentForm=(e: ChangeEvent<HTMLTextAreaElement>)=>{
    setReplyForm({ ...replyForm, comment: e.target.value });
  }

  const deposit=async()=>{
    const a=await replyComment(replyForm);
    setReplyForm({ ...replyForm, comment:''});
    return ;
  }

  const submit=async()=>{
    if(!currentUser){
      router.replace("/login");
      return;
    }
    console.log(replyForm)
    const a = await deposit()
    setReplynumber(replynumber+1 )
    setIsReply(false)

  };  



  const clickGood=()=>{
    goodFunc(isGood, comment.id);
    if(isGood){
      setGoodNumber(GoodNumber-1);
      setIsGood(!isGood);
    }else{
      setGoodNumber(GoodNumber+1);
      setIsGood(!isGood);
    }
  }



  const login=()=>{
    router.push('/login');
  }

  useEffect(()=>{
    console.log(comment.article_id)
    if(currentUser && !isAuthChecking){
      comment.is_good.map((good :any)=>{
        if(good===currentUser.id){
          setIsGood(true);
          return;
        }
      })
    }
    setIsReply(false)
    }, [isAuthChecking, currentUser, comment.is_good, comment.article_id])


    const deleteComment=()=>{
      DeleteComment(comment.id);
      setIsDelete(true);
    }


    const pushReply=async()=>{
      const preReply=await getReplyComments(comment.id);
      setReply(preReply)
      setIsReply(true)
    }



  if(isAuthChecking) return (<div>ログイン情報を確認中…</div>);




  if(isDelete)return(<></>);




    
  
  return(
    <>
      <div  className=" bg-white pt-3 pb-3 pl-3" key={comment.id}>
        <h1 className=" pt-2 pb-2 w-full mr-auto ml-auto">
          {comment.article_title!==null ? <Link href={`/article/${comment.article_id}`}><a className="text-md font-semibold text-blue-600 hover:text-red-600">{comment.article_title}</a></Link> : ""}
        </h1>
        <div className="flex">
        <Link href={`/user/${comment.user_id}`}><a>
              <Avatar
                size="30"
                round
                className="mb-4 cursor-pointer"
                src={`https://s3.ap-northeast-1.amazonaws.com/newbyte-s3/${comment.avatar_image}`}
              />
        </a></Link>

        <div className="ml-1 w-full">
          
              <p className="pt-1  text-sm font-medium mr-6"> <Link href={`/user/${comment.user_id}`}><a>{comment.user_name}</a></Link>  <span className="text-1 font-normal text-gray-500">| {comment.day_time}</span></p>
            
            <div className="mt-2 text-sm ">
              <p>{comment.comment}</p>
              <div className="flex gap-4">
                <button onClick={currentUser ? clickGood : login} className="mt-1"><FontAwesomeIcon icon={faThumbsUp} className={!isGood ? "text-gray-300" : "text-red-500"}></FontAwesomeIcon> {GoodNumber}</button>

                {!comment.parent_id  ? <button onClick={()=>setIsTextArea(!isTextArea)} className="mt-1 text-gray-600">reply</button> : ""}
                {currentUser && (currentUser.id===comment.user_id || props.isMypage) ? <button onClick={deleteComment} className="mt-1"><FontAwesomeIcon icon={faTrashCan} className="text-gray-500"></FontAwesomeIcon></button> : ''}
              </div>


            </div>

            <div  className=" w-11/12" >
              { isTextArea ?
                <div className="pt-2 flex">
                  <textarea placeholder="Comment" onChange={updateCommentForm} value={replyForm.comment}  className="resize-none border border-gray-500 w-full  p-1"></textarea>
                  <button onClick={submit} className="p-1 bg-indigo-500 text-white rounded-r-sm">go</button>
                </div>
              : ''}
              {isReply ?



                <CommentsPage comments={reply}></CommentsPage>
                
               : replynumber>0 ? <button onClick={pushReply} className="text-sm text-blue-500  mt-3 rounded-full">view {replynumber} replies</button> : ''}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default CommentChoice