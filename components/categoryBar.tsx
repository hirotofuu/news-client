import Link from "next/link";
import {category_contents} from '../libs/category_contents'
const CategoryBar=()=>{
  return(
    <>
      <div className="flex gap-1 mb-2 overflow-x-auto block lg:hidden xl:hidden md:hidden">
          {category_contents.map((category)=>
            
            <Link href={'/category/'+`${category}`} key={`${category}`}><a className={`inline p-1 text-center bg-indigo-600  rounded-md  shrink-0 ml-1 text-sm text-white`}>{category}</a></Link>
          )}
      </div>
    </>
  )
}

export default CategoryBar