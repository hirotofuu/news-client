import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';




async function getGood($id: string, api_token: string){

  const answer=await axios
    .get(`/api/goodSend/${$id}?api_token=${api_token}`)
    .then((response: AxiosResponse) => {
      return;
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}




async function deleteGood($id: string, api_token: string){

  const answer=await axios
    .delete(`/api/unGoodSend/${$id}?api_token=${api_token}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}



export async function goodFunc($bool: boolean, $id: string, api_token: string){
  if($bool){
    deleteGood($id, api_token);
    return ;
  }else{
    getGood($id, api_token);
    return ;
  }
}

// truth
export async function getTruth($id: string, api_token: string){

  const answer=await axios
    .get(`/api/truthSend/${$id}?api_token=${api_token}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}




export async function deleteTruth($id: string, api_token: string){

    const answer=await axios
    .delete(`/api/unTruthSend/${$id}?api_token=${api_token}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}

// fake
export async function getFake($id: string, api_token: string){

    const answer=await axios
    .get(`/api/fakeSend/${$id}?api_token=${api_token}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}




export async function deleteFake($id: string, api_token: string){

    const answer=await axios
    .delete(`/api/unFakeSend/${$id}?api_token=${api_token}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => console.log(err.response));
    return answer;
}