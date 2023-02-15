import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';




async function getGood($id: number, $api_token: string){

  const answer=await axios
    .get(`/api/goodSend/${$id}?api_token=${$api_token}`)
    .then((response: AxiosResponse) => {
      console.log("good!");
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}




async function deleteGood($id: number, $api_token: string){

  const answer=await axios
    .delete(`/api/unGoodSend/${$id}?api_token=${$api_token}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}



export async function goodFunc($bool: boolean, $id: number, $api_token: string){
  if($bool){
    deleteGood($id, $api_token);
    return ;
  }else{
    getGood($id, $api_token);
    return ;
  }
}

// truth
export async function getTruth($id: number,  $api_token: string){

  const answer=await axios
    .get(`/api/truthSend/${$id}?api_token=${$api_token}`)
    .then((response: AxiosResponse) => {
      console.log("truth!");
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}




export async function deleteTruth($id: number,  $api_token: string){

    const answer=await axios
    .delete(`/api/unTruthSend/${$id}?api_token=${$api_token}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}

// fake
export async function getFake($id: number,  $api_token: string){

    const answer=await axios
    .get(`/api/fakeSend/${$id}?api_token=${$api_token}`)
    .then((response: AxiosResponse) => {
      console.log("fake!");
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}




export async function deleteFake($id: number,  $api_token: string){

    const answer=await axios
    .delete(`/api/unFakeSend/${$id}?api_token=${$api_token}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => console.log(err.response));
    return answer;
}