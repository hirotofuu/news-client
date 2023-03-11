import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';

type InputType={
  comment: string;
  day_time: string;
  article_id: string;
}

type InputReplyType={
  comment: string;
  day_time: string;
  parent_id: string | null;

}

export async function createComment(content: InputType, api_token: string){
  const a=await axios
        .post(`/api/createComment?api_token=${api_token}`, content)
        .then((response: AxiosResponse) => {
      })
        .catch((err: AxiosError) => {
          console.log(err);
        });

}

export async function replyComment(content: InputReplyType, api_token: string){
  const a=await axios
        .post(`/api/replyComment?api_token=${api_token}`, content)
        .then((response: AxiosResponse) => {
          return response.data;
      })
        .catch((err: AxiosError) => {
          console.log(err);
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


export async function getMyComments(user_id: any){
  const searchResult=await axios
  .get(`/api/fetchMyComments/${user_id}`)
  .then((response: AxiosResponse) => {

    return response.data.data;
  })
  .catch((err: AxiosError) => console.log(err.response));
  return searchResult;
}

export async function getReplyComments(parent_id: any){
  const searchResult=await axios
  .get(`/api/fetchReplyCommens/${parent_id}`)
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

export async function DeleteComment(id: any, api_token: string){
  const searchResult=await axios
  .delete(`/api/deleteComment/${id}?api_token=${api_token}`)
  .then((response: AxiosResponse) => {
  })
  .catch((err: AxiosError) => console.log(err.response));
  return searchResult;
}