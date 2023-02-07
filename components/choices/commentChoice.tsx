import {useState, useEffect} from 'react'
import {goodFunc} from "../../libs/goodFunction"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';
import { useUserState } from 'atoms/userAtom';
import {DeleteComment} from '../../libs/commentFunction'
import Link from 'next/link';


const CommentChoice=(props: any)=>{
  const router=useRouter();
  const {user}=useUserState();
  const comment=props.comment;
  const here=props.here;
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



  const login=()=>{
    router.push('/login');
  }

  useEffect(()=>{
    if(user.id){
      comment.is_good.map((good :any)=>{
        if(good["user_id"]===user.id){
          setIsGood(true);
          return;
        }
      })
    }
    }, [user])



  
  return(
    <>
      <div  className=" border-b  bg-white pt-3 pb-3" key={comment.id}>
        <div className="flex ml-auto mr-auto w-11/12">
          <Link href={`/user/${comment.user_id}`}><a>
            <div className="bg-black  w-8 h-8 rounded-full">asdas</div>
          </a></Link>

          <div className="ml-5">
            <div className="flex">
              <p className="pt-1  text-sm font-medium mr-6"> <Link href={`/user/${comment.user_id}`}><a>{comment.user_name}</a></Link>  <span className="text-1 font-normal text-gray-500">| {comment.day_time}</span> {here ? <span><span className="text-1 font-normal text-gray-500">at</span> <Link href={`/article/${comment.article_id}`}><a className="text-1 font-normal text-blue-500">here</a></Link></span> : ""}</p>
            </div>
            <div className="mt-2 text-sm ">
              <p>{comment.comment}</p>
              <button onClick={user.id!==null ? clickGood : login} className="mt-1"><FontAwesomeIcon icon={faThumbsUp} className={!isGood ? "text-gray-300" : "text-red-500"}></FontAwesomeIcon> {GoodNumber}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentChoice