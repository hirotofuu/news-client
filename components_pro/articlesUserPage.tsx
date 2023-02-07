import ArticleUserChoice from '../components/choices/articleUserChoice'
import {useState} from "react"

const ArticlesUserPage=(props: any)=>{
  const articles=props.articles; 
  const [loadIndex, setLoadIndex] = useState(20);
  const [currentPost, setCurrentPost] = useState(articles);
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
          {articles.slice(0, loadIndex).map((article: any)=>
          <ArticleUserChoice article={article}></ArticleUserChoice>
          )}

          {!isEmpty ?<button className="w-full p-2 block  bg-white hover:bg-gray-100  ml-auto  mr-auto  text-blue-500" 
            disabled={isEmpty ? true : false}
          onClick={displayMore}>more comments</button> : ''}
      </div>


    </>
  )
}

export default ArticlesUserPage