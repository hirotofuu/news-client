import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next'
import {getFollowing} from "../../../libs/followFunction"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import type {Article} from "../../../types/article"
import Frame from "../../../components/frame"
import Users from "../../../components_pro/users"
import NotFound from "../../../components/notFound"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user_id: number=Number(context.params.user_id);
  const user_following : Article[] | null=await getFollowing(user_id);
  return{
    props: {
      factor: {
        user_id,
        user_following,
      }
    },
  };
}


const Following: NextPage = ({factor}: any) => {
 const router=useRouter();

  const goBack=()=>{
    router.back()
  }
  return (
      <>
        <Frame>
          <h1 className="p-2 text-blue-300 bg-gray-600"><button onClick={goBack} ><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> back</button></h1>
          {factor.user_following.length?<Users users={factor.user_following}></Users>: <NotFound>ここにユーザーはいません</NotFound>}


        </Frame>


      </>
  );
}

export default Following