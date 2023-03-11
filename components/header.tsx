import Link from "next/link";
import Image from "next/image";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faMagnifyingGlass, faUser} from '@fortawesome/free-solid-svg-icons'
import {useState, ChangeEvent, useEffect} from 'react';
import { useRouter } from 'next/router';
import { useCurrentUser } from "../hooks/useCurrentUser"


const Header=()=>{
  const  [searchForm, setSearchForm]=useState({q: null});
  const updateLoginForm=(e: ChangeEvent<HTMLInputElement>)=>{
    setSearchForm( {q: e.target.value});
  }
  const { isAuthChecking, currentUser } = useCurrentUser();

  const router = useRouter();

  const goSearch=()=>{
    const key=searchForm.q;
    if(key){
      router.push({
        pathname:'/search/key',
        query: {q: key},
      });
    }
  }  

  const escFunction = (event: any) => {
    if (event.keyCode === 13) {
      goSearch();
    }
  }


  
    

  return(
    <>
      <div className="flex justify-between bg-white h-12 items-center border-b-2">
        <Link href="/"><a className="xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl text-3xl lg:ml-6 xl:ml-6 md:ml-6 sm:ml-6 ml-1">NewsByte</a></Link>
            <div className="flex mr-3">
              <input type="text" onKeyDown={escFunction} placeholder="Search" className="xl:w-96 lg:w-96 md:w-96 w-44 pl-2 h-8 rounded-l-lg bg-gray-200 " onChange={updateLoginForm}/>
              <button onClick={goSearch} className="h-8 bg-slate-200 rounded-r-3xl"><FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg p-2 "/></button>
            </div>

          <div className="gap-5 hidden xl:flex lg:flex md:flex sm:flex items-center">
            <Link href={"/create"}><a><FontAwesomeIcon icon={faPlus} className="text-xl mr-2"/></a></Link>
            {!currentUser ? <Link href={"/login"}><a><FontAwesomeIcon icon={faUser} className="text-xl mr-10"/></a></Link> : 
            <Link href={`/mypage/articles`}><a className="flex items-center mr-10">
              <Image
                className="rounded-full"
                width="32"
                height="32"
                alt="user image"
                src={`https://s3.us-east-1.amazonaws.com/newsbyte/${currentUser.avatar_image}` }
              />
            </a></Link>}
          </div>

        </div>

      <div className="h-14 items-center bg-slate-400 flex gap-12 text-lg xl:hidden lg:hidden md:hidden sm:hidden">
        <Link href="/create"><a className="ml-auto">create</a></Link>
        <Link href="/login"><a className="mr-auto">login</a></Link>
      </div>
    </>
  )
}

export default Header