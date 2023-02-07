import {getFollow, deleteFollow} from "../libs/followFunction";
import {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import { useUserState } from 'atoms/userAtom';
import Link from "next/link";

const UserProfile=(props: any)=>{
  const pro=props.info;
  const {user}=useUserState();
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


  const goLogin=()=>{
    router.push('/login');
  }

  useEffect(()=>{
    pro.following.map((foll: any)=>{
      if(user.id===foll.id){
        setIsFollow(true);
        return;
      }
    })
  }, [user.id])

  
  return(
    <>
<div  className="p-3 border-b-2  bg-white pt-10 pb-14" key={pro.id}>
          <div className="flex ml-auto mr-auto w-11/12">
            <div className="bg-black  w-16 h-16 rounded-full">ssaeadsad</div>
            <div className="ml-5">
              <div className="flex">
                <h1 className="pt-1  text-xl font-medium mr-6">{pro.name}</h1>
                <button onClick={user.id===null ? goLogin : Follow } className=" bg-blue-500  text-sm text-white h-6 font-semibold px-2 mt-2  rounded-l-full rounded-r-full">{isFollow ? "Following" : " Follow"}</button>
              </div>
              <div className="flex gap-3 mt-4">
              <p className="text-sm text-gray-500"><span className="font-bold text-black">{(pro.truth_number/(pro.truth_number+pro.fake_number)).toFixed(2)}</span> Pt</p>
              <Link href={`/user/${pro.id}/followers`} ><a className="text-sm text-gray-500"><span className="font-bold text-black">{followed_number}</span> Followers</a></Link>
                <Link href={`/user/${pro.id}/followings`} ><a className="text-sm text-gray-500"><span className="font-bold text-black">{pro.following_number}</span> Following</a></Link>
              </div>
              <p className="mt-2 text-sm ">I know they aren’t the best movies but I’ve always loved them. Excited to have completed my live action RE collection today! Are the animated ones worth checking out?</p>
            </div>
          </div>
</div>
    </>
  )
}

export default UserProfile