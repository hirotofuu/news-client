import CommentChoice from '../components/choices/commentChoice'
import {useState} from "react"

const CommentsPage=(props: any)=>{
  const comments=props.comments;
  const here=props.here;
  const [loadIndex, setLoadIndex] = useState(20);
  const [currentPost, setCurrentPost] = useState(comments);
  const [isEmpty, setIsEmpty] = useState(currentPost.length>20 ? false : true);

  const displayMore = () => {
    if (loadIndex > currentPost.length) {
      setIsEmpty(true);
    }else if(currentPost.length-loadIndex<25){
      setLoadIndex(loadIndex + 25);
      setIsEmpty(true);
    }else {
      setLoadIndex(loadIndex + 25);
    }
  };


  return(
    <>
      
      <div>
          {comments.slice(0, loadIndex).map((comment: any, index: any)=>
          <CommentChoice key={index} isMypage={props.isMypage} comment={comment}></CommentChoice>
          )}

          {!isEmpty ?<button className="w-full p-2 block  bg-white hover:bg-gray-100  ml-auto  mr-auto  text-blue-500" 
            disabled={isEmpty ? true : false}
          onClick={displayMore}>more comments</button> : ''}
      </div>


    </>
  )
}

export default CommentsPage