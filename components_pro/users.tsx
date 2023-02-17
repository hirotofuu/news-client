import UserChoice from '../components/choices/userChoice'
import {useState} from 'react'
import type {User} from '../types/user'

interface Props {
  users: User[] | null;
}

const Users:React.FC<Props> =(props: Props)=>{
  const users=props.users;


  return(
    <>
      

        {users.map((user: any)=>
        <UserChoice user={user}></UserChoice>
        )}


    </>
  )
}

export default Users