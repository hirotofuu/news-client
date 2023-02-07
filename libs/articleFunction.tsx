import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';

export async function deleteArticle($id: number){
  const answer=await axios
  .delete(`/api/deleteArticle/${$id}`)
  .then((response: AxiosResponse) => {
    console.log("delete article")
  })
  .catch((err: AxiosError) => console.log(err.response));
  return answer;
}
