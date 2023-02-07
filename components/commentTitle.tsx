import { useRouter } from 'next/router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faCalendarDays} from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
const CommentTitle=(props: any)=>{
  const factors=props.article;
  const user_id=factors.user_id;

  const router=useRouter();

  const goBack=()=>{
    router.back()
  }

  return(
    <>
      <div className="w-full p-3 border-b-2 bg-white sticky top-0">
        <Link href={`/article/${factors.id}`}><a className="text-xl mb-4 font-bold hover:text-blue-600 hover:border-b-blue-600 hover:border-b-2">{factors.title}</a></Link>
        <div className="flex gap-5 pt-3 text-gray-500">
          <button onClick={goBack} className="text-sm hover:underline">{factors.user_name}</button>
          <h3 className="text-sm">
          <FontAwesomeIcon icon={faEye}></FontAwesomeIcon> {factors.view_number}</h3>
          <h3 className="text-sm"><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon> {factors.day_time}</h3>
        </div>
      </div>

    </>
  )
}

export default CommentTitle