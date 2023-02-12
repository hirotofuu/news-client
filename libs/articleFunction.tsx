import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';

export async function deleteArticle($id: number, $api_token: string){
  const answer=await axios
  .delete(`/api/deleteArticle/${$id}?api_token=${$api_token}`)
  .then((response: AxiosResponse) => {
    console.log("delete article")
  })
  .catch((err: AxiosError) => console.log(err.response));
  return answer;
}
