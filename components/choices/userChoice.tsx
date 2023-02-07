import Link from "next/link";
import {useState, useEffect} from "react"
import { useUserState } from 'atoms/userAtom';
import {getFollow, deleteFollow} from "../../libs/followFunction"

const Users=(props: any)=>{
  const player=props.user;
  const {user}=useUserState();
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
    player.following.map((foll: any)=>{
      if(user.id===foll.id){
        setIsFollow(true);
        return;
      }
    })
  }, [user])

  return(
    <>
        <div className="flex border-b w-full bg-white">
        <Link href={`/user/${player.id}`}><a className="p-3 flex justify-between bg-white w-11/12 ">
            <div className="flex">
              <div className="bg-black  w-8 h-8 rounded-full">ssae</div>
              <div className="ml-4">
                <h1 className="pt-1 text-sm font-medium">{player.name}</h1>
                <p className="mt-2 w-full text-sm"></p>
              </div>
            </div>
        </a></Link>
        <button onClick={Follow} className="border-2 m-3 text-blue-500  text-sm h-8 font-semibold px-2  rounded-l-full rounded-r-full ">{isFollow ? "Following" : " Follow"}</button>
        </div>


    </>
  )
}

export default Users