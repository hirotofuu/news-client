import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';

export async function createComment(content: any){
  const a=await axios
    .get('/sanctum/csrf-cookie')
    .then((res: AxiosResponse) => {
      axios
        .post('/api/createComment', content)
        .then((response: AxiosResponse) => {
          return response.data;
      })
        .catch((err: AxiosError) => {
          console.log(err);
        });
    });
}


export async function getComments(id: any){
  const searchResult=await axios
  .get(`/api/fetchComments/${id}`)
  .then((response: AxiosResponse) => {

    return response.data.data;
  })
  .catch((err: AxiosError) => console.log(err.response));
  return searchResult;
}

export async function getMyComments(){
  const searchResult=await axios
  .get(`/api/fetchMyComments`)
  .then((response: AxiosResponse) => {

    return response.data.data;
  })
  .catch((err: AxiosError) => console.log(err.response));
  return searchResult;
}

export async function getUserComments(id: any){
  const searchResult=await axios
  .get(`/api/fetchUserComments/${id}`)
  .then((response: AxiosResponse) => {
    return response.data.data;
  })
  .catch((err: AxiosError) => console.log(err.response));
  return searchResult;
}

export async function DeleteComment(id: any){
  const searchResult=await axios
  .delete(`/api/deleteComment/${id}`)
  .then((response: AxiosResponse) => {
    console.log("success");
  })
  .catch((err: AxiosError) => console.log(err.response));
  return searchResult;
}