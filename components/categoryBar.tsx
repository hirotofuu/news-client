import Link from "next/link";
const CategoryBar=()=>{
  const categories:string[]=["US","ネット","アニメ","漫画","ラノベ","ゲーム","サッカー","野球","スポーツ","政治","国際","音楽","グルメ","生活","地域","エンタメ","コラム", "まとめ", "その他"] 
  return(
    <>
      <div className="flex gap-1 mb-2 overflow-x-auto block lg:hidden xl:hidden md:hidden">
          {categories.map((category)=>
            
            <Link href={'/category/'+`${category}`} key={`${category}`}><a className={`inline h-8 text-center bg-indigo-600  rounded-md p-2 shrink-0 ml-1 text-sm text-white`}>{category}</a></Link>
          )}
      </div>
    </>
  )
}

export default CategoryBar