import Link from "next/link";
const ArticleChoice=(props: any)=>{
  const kiji=props.article;
  return(
    <>
      <Link href={`/article/${kiji.id}`} key={`${kiji.id}`}><a>
        <div className="group hover:bg-gray-100 flex p-3 border-b bg-white"  key={kiji.id}>
          <div className="bg-black  w-20 h-20">nianianainis</div>
          <div className="ml-4">
            <h2 className="text-md font-medium text-black line-clamp-4">{kiji.title}</h2>
            <div className="flex gap-4 mt-1 font-thin">
              <h2 className="font-normal text-gray-500 text-sm hover:underline">{kiji.user_name}</h2>
              <h2><span className="font-normal text-gray-500 text-sm">{kiji.view_number}回</span></h2>
              <h2><span className="font-normal text-gray-500 text-sm hidden sm:inline">{kiji.day_time}</span></h2>

            </div>
          </div>
        </div>   
      </a></Link>
    </>
  )
}

export default ArticleChoice