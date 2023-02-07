import CommentChoice from '../components/choices/commentChoice'
import {useState} from "react"

const Comments=(props: any)=>{
  const comments=props.comments;
  const [loadIndex, setLoadIndex] = useState(5);
  const [currentPost, setCurrentPost] = useState(comments);
  const [isEmpty, setIsEmpty] = useState(currentPost.length>5 ? false : true);

  const displayMore = () => {
    if (loadIndex > currentPost.length) {
      setIsEmpty(true);
    }else if(currentPost.length-loadIndex<20){
      setLoadIndex(loadIndex + 20);
      setIsEmpty(true);
    }else {
      setLoadIndex(loadIndex + 20);
    }
  };


  return(
    <>
      
      <div>
          {comments.slice(0, loadIndex).map((comment: any)=>
          <CommentChoice comment={comment}></CommentChoice>
          )}

          {!isEmpty ?<button className="w-full p-2 block  bg-white hover:bg-gray-100  ml-auto  mr-auto  text-blue-500" 
            disabled={isEmpty ? true : false}
          onClick={displayMore}>more comments</button> : ''}
      </div>


    </>
  )
}

export default Comments