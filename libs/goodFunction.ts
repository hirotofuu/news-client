import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';
import {EvaluateType} from '../types/evaluate'



async function getGood(api_token: string, goodInfo: any){

  const answer=await axios
    .post(`/api/goodSend/${goodInfo.id}/${goodInfo.user_id}?api_token=${api_token}`)
    .then((response: AxiosResponse) => {
      return;
    })
    .catch((err: AxiosError) => {
      console.log(err)
    });
    return answer
}




async function deleteGood(api_token: string, goodInfo: any){

  const answer=await axios
    .delete(`/api/unGoodSend/${goodInfo.id}/${goodInfo.user_id}?api_token=${api_token}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => {
      console.log(err)
    });
    return answer
}



export async function goodFunc(bool: boolean, goodInfo: EvaluateType, api_token: string){
  if(bool){
    deleteGood(api_token, goodInfo);
    return ;
  }else{
    getGood(api_token, goodInfo);
    return ;
  }
}

// truth
export async function getTruth($id: string, goodInfo: EvaluateType, api_token: string){

  const answer=await axios
    .get(`/api/truthSend/${goodInfo.id}/${goodInfo.user_id}?api_token=${api_token}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}




export async function deleteTruth($id: string,  goodInfo: EvaluateType,api_token: string){

    const answer=await axios
    .delete(`/api/unTruthSend/${goodInfo.id}/${goodInfo.user_id}?api_token=${api_token}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}

// fake
export async function getFake($id: string,  goodInfo: EvaluateType,api_token: string){

    const answer=await axios
    .get(`/api/fakeSend/${goodInfo.id}/${goodInfo.user_id}?api_token=${api_token}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => {

    });
    return answer;
}




export async function deleteFake($id: string,  goodInfo: EvaluateType,api_token: string){

    const answer=await axios
    .delete(`/api/unFakeSend/${goodInfo.id}/${goodInfo.user_id}?api_token=${api_token}`)
    .then((response: AxiosResponse) => {
    })
    .catch((err: AxiosError) => console.log(err.response));
    return answer;
}