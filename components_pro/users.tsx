import UserChoice from '../components/userChoice'
import {useState} from 'react';
import InfiniteScroll from "react-infinite-scroller";
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