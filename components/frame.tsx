import Link from "next/link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowUp} from '@fortawesome/free-solid-svg-icons'
import {category_contents} from '../libs/category_contents'


const Frame=({children})=>{

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  
  return(
    <>
      <div className="flex mb-4 mt-2">


        <div id="main" className="ml-auto w-full xl:w-1/2 lg:w-1/2 md:w-[600px] sm:w-full  xl:mr-0 lg:mr-0 mr-auto">
          {children}
        </div>
        


        <div id="side" className="sticky top-2px mr-auto w-[300px] pl-6 hidden xl:block lg:block ">



          <div className="grid   border border-gray-200 bg-white rounded-sm">
            <h1 className="bg-white font-bold p-2">Category</h1>
            {category_contents.map((category: string, index: any)=>
            
            <Link key={index} href={'/category/'+`${category}`}><a className="black w-full p-1 pl-2 pt-2 text-sm text-blue-600 hover:bg-gray-300">{category}</a></Link>
            )}
          </div>

          <div className="sticky top-2 mt-3">
            <Link href={"/create"}><a className="block w-full p-2 text-center text-white bg-orange-600 rounded-full hover:opacity-90">create an article</a></Link>
           <button className="text-white w-full p-2 mt-2 bg-indigo-500 rounded-full text-center" onClick={returnTop}><FontAwesomeIcon icon={faArrowUp}/></button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Frame