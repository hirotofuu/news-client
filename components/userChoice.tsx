import Link from "next/link";
const Users=(props: any)=>{
  const player=props.user;
  return(
    <>
      <Link href={`/user/${player.id}`}><a className="p-3 border-b flex justify-between bg-white">
          <div className="flex">
            <div className="bg-black  w-8 h-8 rounded-full">ssae</div>
            <div className="ml-4">
              <h1 className="pt-1 text-sm font-medium">{player.name}</h1>
              <p className="mt-2 w-full text-sm"></p>
            </div>
          </div>
          <button className="border-2 text-blue-500  text-sm h-8 font-semibold px-2  rounded-l-full rounded-r-full">Following</button>
      </a></Link>
    </>
  )
}

export default Users