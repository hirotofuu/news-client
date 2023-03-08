import {getFollow, deleteFollow} from "../libs/followFunction";
import noImage from "../images/no_image_square.jpg"
import {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import {textToLink} from "../libs/textLink"
import type {User} from "../types/user"
import Link from "next/link";
import { useCurrentUser } from "../hooks/useCurrentUser"
import {logout} from '../libs/account'
import Avatar from "react-avatar";

interface Props {
  info: User | null;
  mypage: boolean | null;
}

const UserProfile:React.FC<Props> =(props: Props)=>{
  const pro=props.info;
  const { isAuthChecking, currentUser, setCurrentUser } = useCurrentUser();
  const router=useRouter();
  const [isFollow, setIsFollow]=useState<boolean>(false);
  const [followed_number, setFollowed_number]=useState<number>(pro.follower_number)

  const Follow=async()=>{
    if(isFollow){
      const b=await deleteFollow(pro.id);
      setFollowed_number(followed_number-1);
      setIsFollow(false);
    }else{
      const a=await getFollow(pro.id);
      setFollowed_number(followed_number+1);
      setIsFollow(true);
    }
  }

  const gologout=()=>{
    setCurrentUser(null)
    logout()
  }

  const goLogin=()=>{
    router.push('/login');
  }

  const goEditPage=()=>{
    router.push('/mypage/editPro');
  }

  useEffect(()=>{
    if(!isAuthChecking && currentUser){
      pro.following.map((foll: string)=>{
        if(currentUser.id===foll){
          setIsFollow(true);
          return;
        }
      })
    }
  }, [currentUser, isAuthChecking, pro.following])

  const followButton=<button onClick={currentUser===null ? goLogin : Follow } className="block bg-blue-500  text-sm text-white h-6 font-semibold px-2 mt-2  rounded-l-full rounded-r-full">{isFollow ? "Following" : " Follow"}</button>

  const editButton=<button onClick={goEditPage} className="block bg-gray-500  text-sm text-white h-6 font-semibold px-2 mt-2  rounded-l-full rounded-r-full">edit profile</button>

  

  
  return(
    <>
      <div  className="p-3 border-b-2  bg-white pt-5 pb-14" key={pro.id}>
      <Avatar
                size="30"
                round
                alt="image"
                className="mb-4 cursor-pointer"
                src={`https://s3.ap-northeast-1.amazonaws.com/newbyte-s3/${pro.avatar_image}`}
              />
          <div className="flex ml-auto mr-auto w-full">
            <div className="ml-5">
                <h1 className="pt-1  text-xl font-medium mr-6">{pro.name}</h1>
                {!props.mypage ? followButton : 
                <div className="flex justify-between gap-6 mt-3 text-sm text-white h-6 font-semibold ">
                  <button onClick={goEditPage} className="block bg-gray-500  px-2  rounded-l-full rounded-r-full">edit profile</button>
                  <button onClick={gologout} className="block bg-gray-500  px-2  rounded-l-full rounded-r-full">logout</button>
                </div>
                }
            <div className="flex gap-3 mt-4">
            <p className="text-sm text-gray-500"><span className="font-bold text-black">{(pro.truth_number/(pro.truth_number+pro.fake_number)).toFixed(2)}</span> Pt</p>
            <Link href={`/user/${pro.id}/followers`} ><a className="text-sm text-gray-500"><span className="font-bold text-black">{followed_number}</span> Followers</a></Link>
              <Link href={`/user/${pro.id}/followings`} ><a className="text-sm text-gray-500"><span className="font-bold text-black">{pro.following_number}</span> Following</a></Link>
            </div>
            <p dangerouslySetInnerHTML={{
              __html: textToLink(pro.profile ? `${pro.profile}` : '')
            }} className="mt-2 text-sm "></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile