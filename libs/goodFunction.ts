import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';




async function getGood($id: string){

  const answer=await axios
    .get(`/api/goodSend/${$id}`)
    .then((response: AxiosResponse) => {
      console.log("good!");
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}




async function deleteGood($id: string){

  const answer=await axios
    .delete(`/api/unGoodSend/${$id}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}



export async function goodFunc($bool: boolean, $id: string){
  if($bool){
    deleteGood($id, );
    return ;
  }else{
    getGood($id);
    return ;
  }
}

// truth
export async function getTruth($id: string){

  const answer=await axios
    .get(`/api/truthSend/${$id}`)
    .then((response: AxiosResponse) => {
      console.log("truth!");
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}




export async function deleteTruth($id: string){

    const answer=await axios
    .delete(`/api/unTruthSend/${$id}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}

// fake
export async function getFake($id: string){

    const answer=await axios
    .get(`/api/fakeSend/${$id}`)
    .then((response: AxiosResponse) => {
      console.log("fake!");
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}




export async function deleteFake($id: string){

    const answer=await axios
    .delete(`/api/unFakeSend/${$id}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => console.log(err.response));
    return answer;
}