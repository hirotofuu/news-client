import Link from "next/link";
import Image from "next/image";
import noImage from "../../images/no_image_square.jpg"
import Avatar from "react-avatar";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faCalendarDays} from '@fortawesome/free-solid-svg-icons'
import type {Article} from "../../types/article"

interface Props {
  article: Article | null;
}

const ArticleChoice: React.FC<Props> =(props: Props)=>{
  const kiji=props.article;
  return(
    <>
      <Link href={`/article/${kiji.id}`} key={`${kiji.id}`}><a>
        <div className="group hover:bg-gray-100 flex p-3 border-b bg-white"  key={kiji.id}>
          <div className="">
            <Image className="" alt="article image" src={kiji.image_file ? `https://s3.ap-northeast-1.amazonaws.com/newbyte-s3/${kiji.image_file}` : noImage} layout="fixed" objectFit="cover" width={110} height={110} unoptimized/>
          </div>


          <div className="ml-4">
            <h2 className="text-md xl:text-base lg:text-base md:text-base text-sm  text-black line-clamp-4">{kiji.title}</h2>
            <div className="flex gap-4 mt-3 font-thin">
                <h2 className="flex font-normal text-gray-500 text-sm ">
                  <Avatar
                    size="19"
                    round
                    className="mb-4 cursor-pointer mr-1"
                    src={`https://s3.ap-northeast-1.amazonaws.com/newbyte-s3/${kiji.avatar_image}`}
                  />
                  {kiji.user_name}
                  </h2>
                  <div className="font-normal text-gray-500 text-sm"><FontAwesomeIcon icon={faEye} className="mr-1"></FontAwesomeIcon>{kiji.view_number}</div>
                  <div className="font-normal text-gray-500 text-sm"><FontAwesomeIcon icon={faCalendarDays} className="mr-1"></FontAwesomeIcon>{kiji.day_time}</div>

            </div>
          </div>
        </div>   
      </a></Link>
    </>
  )
}

export default ArticleChoice