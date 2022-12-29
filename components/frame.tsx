import Link from "next/link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowUp} from '@fortawesome/free-solid-svg-icons'
const Frame=({children})=>{

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  
  return(
    <>
      <div className="flex">


        <div id="main" className="ml-auto w-full xl:w-[800px] lg:w-[700px] md:w-[600px] sm:w-full  xl:mr-0 lg:mr-0 mr-auto">{children}</div>
        


        <div id="side" className="mr-auto w-[300px] pl-6 hidden xl:block lg:block ">
            <button className="text-white sticky top-2 mt-3 w-full h-8 bg-indigo-500 rounded text-center" onClick={returnTop}><FontAwesomeIcon icon={faArrowUp}/></button>
        </div>


      </div>
    </>
  )
}

export default Frame