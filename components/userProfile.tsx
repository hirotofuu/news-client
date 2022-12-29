import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye} from '@fortawesome/free-solid-svg-icons'

const UserProfile=(props: any)=>{
  const pro=props.info
  return(
    <>
<div  className="p-3 border-b-2  bg-white pt-10 pb-14" key={pro.id}>
          <div className="flex ml-auto mr-auto w-11/12">
            <div className="bg-black  w-16 h-16 rounded-full">ssaeadsad</div>
            <div className="ml-5">
              <div className="flex">
                <h1 className="pt-1  text-xl font-medium mr-6">{pro.name}</h1>
                <button className="border-2 text-blue-500  text-sm h-6 font-semibold px-2 mt-2  rounded-l-full rounded-r-full">Following</button>
              </div>
              <p className="mt-2 text-sm ">I know they aren’t the best movies but I’ve always loved them. Excited to have completed my live action RE collection today! Are the animated ones worth checking out?</p>
            </div>
          </div>
</div>
    </>
  )
}

export default UserProfile