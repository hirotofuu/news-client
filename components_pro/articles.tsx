import ArticleChoice from '../components/articleChoice'
import {useState} from 'react';
import InfiniteScroll from "react-infinite-scroller";
const Articles=(props: any)=>{
  const articles=props.articles;

  const [list, setList]=useState({});
  const [num, setNum]=useState<number>(10);
  const [hasMore, setHasMore]=useState<boolean>(true);
  const loadMore=()=>{
    if(num > articles.length){
      setHasMore(false);
      return;
    }
    const data= articles.slice(num, 30);
    setList({...list, ...data});
    setNum(num+30);
  };

  const loading=(
    <div className="flex justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  );

  return(
    <>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loading}>      

        {articles.map((factor: any)=> 
          <ArticleChoice article={factor}></ArticleChoice> 
        )}

      </InfiniteScroll>
    </>
  )
}

export default Articles