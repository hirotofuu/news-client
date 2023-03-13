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




export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: string | string[]=context.query.password ? context.query.password : '';
  return{
    props: {
      factor:{
        id,
      }
      
    },
  };
}

const Home: NextPage = ({factor}: any) => {
  const router=useRouter()
  const {setCurrentUser, currentUser}=useCurrentUser();
  const {setCurrentPass, currentPass}=useCurrentPass();
  const number=factor.id

  useEffect(()=>{
    setCurrentPass(`${factor.id}`)
    const getAccount=async()=>{
      const userinfo=await fetchCurrentUser(factor.id)
      setCurrentUser(userinfo)
      console.log(currentUser)
    }
    getAccount()
    router.push('/')

  },[number])
  

  return (
      <>
        <h1>loading..</h1>
      </>

  );
}

export default Home