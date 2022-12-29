import CommentChoice from '../components/commentChoice'

const CommentsPage=(props: any)=>{
  const comments=props.comments;


  return(
    <>
      

        {comments.map((comment: any)=>
        <CommentChoice comment={comment}></CommentChoice>
        )}


    </>
  )
}

export default CommentsPage