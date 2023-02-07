import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';



// fake
export async function getFollow($id: number){
  const answer=await axios
  .get(`/api/followSend/${$id}`)
  .then((response: AxiosResponse) => {
    console.log("follow!");
  })
  .catch((err: AxiosError) => console.log(err.response));
  return answer;
}

export async function deleteFollow($id: number){
  const answer=await axios
  .delete(`/api/unFollowSend/${$id}`)
  .then((response: AxiosResponse) => {
  })
  .catch((err: AxiosError) => console.log(err.response));
  return answer;
}

export async function getFollowing($id: any){
  const answer=await axios
  .get(`/api/following/${$id}`)
  .then((response: AxiosResponse) => {
    console.log(response.data.data.following);
    return response.data.data.following;
  })
  .catch((err: AxiosError) => console.log(err.response));
  return answer;
}

export async function getFollower($id: any){
  const answer=await axios
  .get(`/api/follower/${$id}`)
  .then((response: AxiosResponse) => {
    console.log(response.data.data.follower);
    return response.data.data.follower;
  })
  .catch((err: AxiosError) => console.log(err.response));
  return answer;
}
