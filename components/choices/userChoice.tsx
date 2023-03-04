import Link from "next/link";
import {useState, useEffect} from "react"
import { useRouter } from "next/router";
import {getFollow, deleteFollow} from "../../libs/followFunction"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import type {User} from "../../types/user"

interface Props {
  user: User | null;
}

const Users:React.FC<Props> =(props: Props)=>{
  const player=props.user;
  const router=useRouter();
  const { isAuthChecking, currentUser } = useCurrentUser();
  const [isFollow, setIsFollow]=useState<boolean>(false);


  const Follow=async()=>{
    if(isFollow){
      const b=await deleteFollow(player.id);
      setIsFollow(false);
    }else{
      const a=await getFollow(player.id);
      setIsFollow(true);
    }
  }

  useEffect(()=>{
    if(currentUser && !isAuthChecking){
    player.following.map((foll: string)=>{
      if(currentUser.id===foll){
        setIsFollow(true);
        return;
      }
    })
  }
  }, [currentUser, isAuthChecking])


  return(
    <>
        <div className="flex border-b w-full bg-white">
        <Link href={`/user/${player.id}`}><a className="p-3 flex justify-between bg-white w-full ">
            <div className="flex">
              <img
                className="rounded-full h-12 w-12 object-cover"
                src={`https://s3.ap-northeast-1.amazonaws.com/newbyte-s3/${player.avatar_image}` }
              />
              <div className="ml-4">
                <h1 className="pt-1 text-sm font-medium">{player.name}</h1>
                <p className="mt-1 w-full text-sm line-clamp-3 text-gray-500">{player.profile}</p>
              </div>
            </div>
        </a></Link>
        {currentUser && currentUser.id===player.id ? '' : <button onClick={currentUser ? Follow : ()=>{router.push("/login")}} className="block border-2 m-3 text-blue-500  text-sm h-8 font-semibold px-2  rounded-l-full rounded-r-full ">{isFollow ? "Following" : " Follow"}</button>}
        </div>


    </>
  )
}

export default Users