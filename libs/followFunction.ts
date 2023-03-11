import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';




// follow
export async function getFollow($id: string, api_token: string){
  const answer=await axios
  .get(`/api/followSend/${$id}?api_token=${api_token}`)
  .then((response: AxiosResponse) => {
  })
  .catch((err: AxiosError) => {

  });
  return answer;
}

// unfollow
export async function deleteFollow($id: string, api_token: string){
  const answer=await axios
  .delete(`/api/unFollowSend/${$id}?api_token=${api_token}`)
  .then((response: AxiosResponse) => {
    return;
  })
  .catch((err: AxiosError) => {

  });
  return answer;
}

// get following
export async function getFollowing($id: string){
  const answer=await axios
  .get(`/api/following/${$id}`)
  .then((response: AxiosResponse) => {
    return response.data.data.following;
  })
  .catch((err: AxiosError) => console.log(err.response));
  return answer;
}


// get followers
export async function getFollower($id:string){
  const answer=await axios
  .get(`/api/follower/${$id}`)
  .then((response: AxiosResponse) => {
    return response.data.data.follower;
  })
  .catch((err: AxiosError) => console.log(err.response));
  return answer;
}
