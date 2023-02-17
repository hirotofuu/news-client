import Link from "next/link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import {faImage} from '@fortawesome/free-solid-svg-icons'
import {deleteArticle} from '../../libs/articleFunction'
import {useUserState} from '../../atoms/userAtom'
import type {Article} from "../../types/article"
import ArticleChoice from "../choices/articleChoice"

interface Props {
  article: Article | null;
}

const ArticleUserChoice: React.FC<Props> =(props: Props)=>{
  const kiji=props.article;
  const {user}=useUserState();
  const deleteUserArticle=async()=>{
    const a=await deleteArticle(kiji.id, user.api_token);
  }
  return(
    <>
      <ArticleChoice article={kiji}></ArticleChoice>
      <div className="flex gap-6 bg-white pl-28 pb-2 pt-2 border-b-4">
        <Link href={`/mypage/edit/${kiji.id}`}><a><FontAwesomeIcon icon={faPen} className="text-gray-500 hover:text-blue-500"></FontAwesomeIcon></a></Link>
        <Link href={`/mypage/editPic/${kiji.id}`}><a><FontAwesomeIcon icon={faImage} className="text-gray-500 hover:text-blue-500"></FontAwesomeIcon></a></Link>
        <button onClick={deleteUserArticle}><FontAwesomeIcon icon={faTrashCan} className="text-gray-500 hover:text-blue-500"></FontAwesomeIcon></button>
      </div>
    </>
  )
}

export default ArticleUserChoice