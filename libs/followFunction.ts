import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';




// follow
export async function getFollow($id: number, $api_token : string){
  const router=useRouter()
  const answer=await axios
  .get(`/api/followSend/${$id}?api_token=${$api_token}`)
  .then((response: AxiosResponse) => {
    console.log("follow!");
  })
  .catch((err: AxiosError) => {
    if(err.response.status===401){
      router.push('/login')
    }
  });
  return answer;
}

// unfollow
export async function deleteFollow($id: number, $api_token: string){
  const router=useRouter()
  const answer=await axios
  .delete(`/api/unFollowSend/${$id}?api_token=${$api_token}`)
  .then((response: AxiosResponse) => {
  })
  .catch((err: AxiosError) => {
    if(err.response.status===401){
      router.push('/login')
    }
  });
  return answer;
}

// get following
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


// get followers
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
