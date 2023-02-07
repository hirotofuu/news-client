import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';



async function getGood($id: number){
    const answer=await axios
    .get(`/api/goodSend/${$id}`)
    .then((response: AxiosResponse) => {
      console.log("good!");
    })
    .catch((err: AxiosError) => console.log(err.response));
    return answer;
}




async function deleteGood($id: number){
    const answer=await axios
    .delete(`/api/unGoodSend/${$id}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => console.log(err.response));
    return answer;
}



export async function goodFunc($bool: boolean, $id: number){
  if($bool){
    deleteGood($id);
    return ;
  }else{
    getGood($id);
    return ;
  }
}

// truth
export async function getTruth($id: number){
    const answer=await axios
    .get(`/api/truthSend/${$id}`)
    .then((response: AxiosResponse) => {
      console.log("truth!");
    })
    .catch((err: AxiosError) => console.log(err.response));
    return answer;
}




export async function deleteTruth($id: number){
    const answer=await axios
    .delete(`/api/unTruthSend/${$id}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => console.log(err.response));
    return answer;
}

// fake
export async function getFake($id: number){
    const answer=await axios
    .get(`/api/fakeSend/${$id}`)
    .then((response: AxiosResponse) => {
      console.log("fake!");
    })
    .catch((err: AxiosError) => console.log(err.response));
    return answer;
}




export async function deleteFake($id: number){
    const answer=await axios
    .delete(`/api/unFakeSend/${$id}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => console.log(err.response));
    return answer;
}