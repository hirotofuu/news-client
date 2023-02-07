
import { useRouter } from 'next/router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'


const Back=()=>{
  const router=useRouter();

  const goBack=()=>{
    router.back()
  }
  return (
      <>

          <h1 className="w-full p-2 text-blue-300 bg-gray-600"><button onClick={goBack} ><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> back</button></h1>

      </>
  );
}


export default Back