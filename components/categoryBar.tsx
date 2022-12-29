import Link from "next/link";
const CategoryBar=()=>{
  const categories:string[]=["US","ネット","アニメ","漫画","ラノベ","ゲーム","サッカー","野球","スポーツ","政治","国際","音楽","グルメ","生活","地域","エンタメ","コラム", "まとめ", "その他"] 
  return(
    <>
      <div className="flex gap-1 mt-4 mb-4 mb-2 overflow-x-auto">
      <Link href={"/"} key="top"><a className={`inline h-8 text-center bg-indigo-600 text-sm rounded-md p-2 shrink-0 ml-1 text-white`}>トップ</a></Link>
        {categories.map((category)=>
          
          <Link href={'/category/'+`${category}`} key={`${category}`}><a className={`inline h-8 text-center bg-indigo-600 text-sm rounded-md p-2 shrink-0 ml-1 text-white`}>{category}</a></Link>
        )}
      </div>
    </>
  )
}

export default CategoryBar