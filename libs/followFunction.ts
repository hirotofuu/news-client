import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';




// follow
export async function getFollow($id: string){
  const answer=await axios
  .get(`/api/followSend/${$id}`)
  .then((response: AxiosResponse) => {
    console.log("follow!");
  })
  .catch((err: AxiosError) => {

  });
  return answer;
}

// unfollow
export async function deleteFollow($id: string){
  const answer=await axios
  .delete(`/api/unFollowSend/${$id}`)
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
    console.log(response.data.data.following);
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
    console.log(response.data.data.follower);
    return response.data.data.follower;
  })
  .catch((err: AxiosError) => console.log(err.response));
  return answer;
}
