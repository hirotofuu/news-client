import UserChoice from '../components/choices/userChoice'
import {useState} from 'react';
const Users=(props: any)=>{
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