import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useCurrentUser} from '../../../hooks/useCurrentUser'
import { GetServerSideProps } from 'next'
import {useEffect} from 'react'
import {fetchCurrentUser} from '../../../libs/account'
import {useCurrentPass} from "../../../hooks/useCorrectPass"
import { useRouter } from 'next/router'
import {destroyCookiee, setCookiee} from '../../../libs/cookie/set_cookie'
import nookies from 'nookies'




export const getServerSideProps: GetServerSideProps = async (context) => {
  setCookiee(context, null)

  console.log()
  return{
    props: {

    },
  };
}

const Home: NextPage = ({factor}: any) => {
  const router=useRouter()
  const {setCurrentUser, currentUser}=useCurrentUser();
  setCurrentUser(null)
  router.push('/')
  

  return (
      <>
        <h1>loading..</h1>
      </>

  );
}

export default Home