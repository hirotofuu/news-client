import Link from "next/link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import {faImage} from '@fortawesome/free-solid-svg-icons'
import {deleteArticle} from '../../libs/articleFunction'
import {useUserState} from '../../atoms/userAtom'

const ArticleUserChoice=(props: any)=>{
  const kiji=props.article;
  const {user}=useUserState();
  const deleteUserArticle=async()=>{
    const a=await deleteArticle(kiji.id, user.api_token);
  }
  return(
    <>
      <Link href={`/article/${kiji.id}`} key={`${kiji.id}`}><a>
        <div className="group hover:bg-gray-100 flex p-3 bg-white"  key={kiji.id}>
          <div className="bg-black  w-20 h-20">nianianainis</div>
          <div className="ml-4">
            <h2 className="text-md font-medium text-black line-clamp-4">{kiji.title}</h2>
            <div className="flex gap-4 mt-1 font-thin">
              <h2><span className="font-normal text-gray-500 text-sm">{kiji.view_number}回</span></h2>
              <h2><span className="font-normal text-gray-500 text-sm hidden sm:inline">{kiji.day_time}</span></h2>

            </div>
          </div>
        </div>   
      </a></Link>
      <div className="flex gap-6 bg-white pl-28 pb-2 pt-2 border-b">
        <Link href={`/mypage/edit/${kiji.id}`}><a><FontAwesomeIcon icon={faPen} className="text-gray-500 hover:text-blue-500"></FontAwesomeIcon></a></Link>
        <Link href={`/mypage/editPic/${kiji.id}`}><a><FontAwesomeIcon icon={faImage} className="text-gray-500 hover:text-blue-500"></FontAwesomeIcon></a></Link>
        <button onClick={deleteUserArticle}><FontAwesomeIcon icon={faTrashCan} className="text-gray-500 hover:text-blue-500"></FontAwesomeIcon></button>
      </div>
    </>
  )
}

export default ArticleUserChoice