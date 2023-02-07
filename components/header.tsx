import Link from "next/link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faMagnifyingGlass, faCircleUser} from '@fortawesome/free-solid-svg-icons'
import {useState, ChangeEvent, useEffect} from 'react';
import { useRouter } from 'next/router';
import {useAuth} from "../hooks/useAuth";
import { useUserState } from "atoms/userAtom";

const Header=()=>{
  const  [searchForm, setSearchForm]=useState({q: null});
  const [login, setLogin]=useState<boolean>(false)
  const updateLoginForm=(e: ChangeEvent<HTMLInputElement>)=>{
    setSearchForm( {q: e.target.value});
  }
  const {user}=useUserState();
  const { checkLoggedIn } = useAuth();

  useEffect(() => {
    const init = async () => {

      const res: boolean = await checkLoggedIn();
      setLogin(true);
    };
    init();
  }, []);

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
            <Link href={user.id ? "/create" : "/login"}><a><FontAwesomeIcon icon={faPlus} className="text-xl mr-2"/></a></Link>
            <Link href={!user.id ? "/login" : `/mypage/${user.id}/${user.secret_id}`}><a className="flex items-center mr-10">
              <FontAwesomeIcon icon={faCircleUser} className="text-2xl"/>
              <h1 className="text-2xl mb-2 ml-1">{login ? user.name : ''}</h1>
              </a></Link>
          </div>

        </div>

      <div className="h-14 items-center bg-slate-400 flex gap-12 text-lg xl:hidden lg:hidden md:hidden sm:hidden">
          <a href="../pages/create" className="ml-auto">投稿</a>
          <h1>login</h1>
          <h1 className="mr-auto mb-s">register</h1>
      </div>
    </>
  )
}

export default Header