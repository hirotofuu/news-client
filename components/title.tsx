import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faCalendarDays} from '@fortawesome/free-solid-svg-icons'
import {Article} from "../types/article"
import Link from "next/link";

interface Props {
  article: Article | null;
}

const Title: React.FC<Props> =(props: Props)=>{
  const factors=props.article;
  const user_id=factors.user_id;
  return(
    <>
      <div className="w-full p-3 border-b-2 bg-white">
        <h1 className="text-xl mb-4 font-bold">{factors.title}</h1>
        <div className="flex gap-5 text-gray-500">
          <Link href={`/user/${user_id}`}><a className="text-sm hover:underline">{factors.user_name}</a></Link>
          <h3 className="text-sm">
          <FontAwesomeIcon icon={faEye}></FontAwesomeIcon> {factors.view_number}</h3>
          <h3 className="text-sm"><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon> {factors.day_time}</h3>
        </div>
      </div>

    </>
  )
}

export default Title