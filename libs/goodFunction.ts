import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';



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
      console.log("delete");
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
