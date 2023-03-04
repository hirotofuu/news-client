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

export async function createComment(content: InputType){
  const a=await axios
        .post(`/api/createComment`, content)
        .then((response: AxiosResponse) => {
          console.log(response.data);
      })
        .catch((err: AxiosError) => {
          console.log(err);
        });

}

export async function replyComment(content: InputReplyType){
  const a=await axios
        .post(`/api/replyComment`, content)
        .then((response: AxiosResponse) => {
          console.log(1111)
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
    console.log(response.data.data)
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
    console.log(parent_id)
    return response.data.data;
  })
  .catch((err: AxiosError) => console.log(err.response));
  return searchResult;
}

export async function getUserComments(id: any){
  const searchResult=await axios
  .get(`/api/fetchUserComments/${id}`)
  .then((response: AxiosResponse) => {
    console.log(response.data.data);
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