import Link from "next/link";
import Image from "next/image";
import noImage from "../../images/no_image_square.jpg"
import type {Article} from "../../types/article"

interface Props {
  article: Article | null;
}

const ArticleChoice: React.FC<Props> =(props: Props)=>{
  const kiji=props.article;
  return(
    <>
      <Link href={`/article/${kiji.id}`} key={`${kiji.id}`}><a>
        <div className="block xl:hidden xl:hidden md:hidden sm:hidden w-full">
            <Image className="" src={kiji.image_file ? `https://s3.ap-northeast-1.amazonaws.com/newbyte-s3/${kiji.image_file}` : noImage}  objectFit="cover" width={650} height={300} unoptimized/>
        </div>
        <div className="group hover:bg-gray-100 flex p-3 border-b bg-white"  key={kiji.id}>
          <div className="hidden xl:block xl:block md:block sm:block">
            <Image className="" src={kiji.image_file ? `https://s3.ap-northeast-1.amazonaws.com/newbyte-s3/${kiji.image_file}` : noImage} layout="fixed" objectFit="cover" width={110} height={110} unoptimized/>
          </div>


          <div className="ml-4">
            <h2 className="text-md xl:text-base lg:text-base md:text-base text-sm  text-black line-clamp-4">{kiji.title}</h2>
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