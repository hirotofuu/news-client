import { useRouter } from 'next/router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faCalendarDays} from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import Avatar from 'react-avatar';
const CommentTitle=(props: any)=>{
  const factors=props.article;

  const router=useRouter();


  return(
    <>
      <div className="w-full p-3 border-b-2 bg-white sticky top-0">
        <Link href={`/article/${factors.id}`}><a className="text-xl mb-4 font-bold hover:text-blue-600 hover:border-b-blue-600 hover:border-b-2">{factors.title}</a></Link>
        <div className="flex gap-5 pt-3 text-gray-500 items-center">
          <Link href={`/user/${factors.user_id}`}><a className="text-sm">
            <Avatar className="inline object-cover"
            size="20"
            round
            alt="image"
            src={`https://s3.us-east-1.amazonaws.com/newsbyte/${factors.avatar_image}`}/> 
            {factors.user_name}
          </a></Link>
          <h3 className="text-sm">
          <FontAwesomeIcon icon={faEye}></FontAwesomeIcon> {factors.view_number}</h3>
          <h3 className="text-sm"><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon> {factors.day_time}</h3>
        </div>
      </div>

    </>
  )
}

export default CommentTitle