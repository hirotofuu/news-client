import {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHourglass1, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import {goodFunc} from "../../libs/goodFunction"
import { useRouter } from 'next/router';
import {DeleteComment} from '../../libs/commentFunction'
import { useCurrentUser } from "../../hooks/useCurrentUser"
import {Comment} from "../../types/comment"
import Avatar from 'react-avatar';
import Link from 'next/link';

interface Props {
  comment: Comment | null;
}


const CommentUserChoice: React.FC<Props> =(props: Props)=>{
  const router=useRouter();
  const comment=props.comment;
  const { isAuthChecking, currentUser } = useCurrentUser();
  const [isDelete, setIsDelete]=useState<boolean>(false);
  const [isGood, setIsGood]=useState<boolean>(false);
  const [GoodNumber, setGoodNumber]=useState<number>(comment.good_number);
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

  useEffect(()=>{
    if(!currentUser && !isAuthChecking){
      comment.is_good.map((good :any)=>{
        if(good===currentUser.id){  
          setIsGood(true);
          return;
        }
      })
    }
    }, [isAuthChecking, currentUser])


  const deleteComment=()=>{
    DeleteComment(comment.id);
    setIsDelete(true);
  }

  const login=()=>{
    router.push('/login');
  }

  if(isDelete)return(<></>);

  
  return(
    <>
      <div key={comment.id} className="bg-white border-b">
      <h1 className=" p-2 w-11/12 mr-auto ml-auto">
        <Link href={`/article/${comment.article_id}`}><a className="text-md font-semibold text-blue-600
        hover:text-red-600">{comment.article_title}</a></Link>
      </h1>
      <div className="flex ml-auto mr-auto mb-3 w-11/12 pt-1 pb-2">
      <Link href={`/user/${comment.user_id}`}><a>
      <Avatar
                size="30"
                round
                className="mb-4 cursor-pointer"
                src={`https://s3.ap-northeast-1.amazonaws.com/newbyte-s3/${comment.avatar_image}`}
              />
        </a></Link>
        <div className="ml-5">
          <div className="flex">
            <p className="pt-1  text-sm font-medium mr-6"> <Link href={`/user/${comment.user_id}`}><a>{comment.user_name}</a></Link>  <span className="text-1 font-normal text-gray-500">| {comment.day_time}</span></p>
          </div>
          <div className="mt-2 text-sm ">
            <p>{comment.comment}</p>
            <div className="flex gap-4">
              <button onClick={currentUser ? clickGood : login} className="mt-1"><FontAwesomeIcon icon={faThumbsUp} className={!isGood ? "text-gray-300" : "text-red-500"}></FontAwesomeIcon> {GoodNumber}</button>

              <button onClick={deleteComment} className="mt-1"><FontAwesomeIcon icon={faTrashCan} className="text-gray-500"></FontAwesomeIcon></button>
            </div>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default CommentUserChoice