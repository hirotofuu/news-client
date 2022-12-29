import {useState} from 'react'
import {goodFunc} from "../libs/goodFunction"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'

const CommentChoice=(props: any)=>{

  const comment=props.comment;
  const [isGood, setIsGood]=useState<boolean>(comment.is_good ? true : false);
  const [GoodNumber, setGoodNumber]=useState<number>(comment.good_number);
  const clickGood=()=>{
    goodFunc(isGood, comment.id);
    if(GoodNumber){
      setGoodNumber(GoodNumber-1);
      setIsGood(false);
    }else{
      setGoodNumber(GoodNumber+1);
      setIsGood(true);
    }
  }
  return(
    <>
        <div  className=" border-b  bg-white pt-3 pb-3" key={comment.id}>
          <div className="flex ml-auto mr-auto w-11/12">
            <div className="bg-black  w-8 h-8 rounded-full">asdas</div>
            <div className="ml-5">
              <div className="flex">
              <p className="pt-1  text-sm font-medium mr-6">{comment.user_name} <span className="text-1 font-normal text-gray-500">| {comment.day_time}</span></p>
              </div>
              <h1></h1>
              <div className="mt-2 text-sm ">
                <p>{comment.comment}</p>
                <button onClick={clickGood} className="mt-1"><FontAwesomeIcon icon={faHeart} className={isGood ? "text-pink-500" : "text-gray-300"}></FontAwesomeIcon> {GoodNumber}</button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default CommentChoice