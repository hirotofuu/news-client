import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';



export async function getIndexArticle(){
    const answer=axios
    .get('/api/indexFetch')
    .then((response: AxiosResponse) => {
      return response.data.data;
    })
    .catch((err: AxiosError) => console.log(err.response));
    return answer;
}

export async function getTimelineArticle(user_id: any){
    const answer=axios
    .get(`/api/fetchTimeline/${user_id}`)
    .then((response: AxiosResponse) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((err: AxiosError) => console.log(err.response));
    return answer;
}
  

export async function getShowArticle(id: any){
    const answer=await axios
    .get(`/api/showFetch/${id}`)
    .then((response: AxiosResponse) =>{
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((err: AxiosError) => console.log(err.response));
    return answer;
}


export async function getCategoryArticle(category: any){
    const answer=await axios
    .get(`/api/categoryFetch/${category}`)
    .then((response: AxiosResponse) => {
      return response.data.data;
    })
    .catch((err: AxiosError) => console.log(err.response));
    return answer;
}


export async function getSearchArticle(search: any){
    const searchResult=await axios
    .get(`/api/searchFetch/${search}`)
    .then((response: AxiosResponse) => {
      return response.data.data;
    })
    .catch((err: AxiosError) => console.log(err.response));
    return searchResult;
}


export async function getUserArticle(user_id: any){
    const searchResult=await axios
    .get(`/api/fetchUserArticle/${user_id}`)
    .then((response: AxiosResponse) => {
      return response.data.data;
    })
    .catch((err: AxiosError) => console.log(err.response));
    return searchResult;
}

export async function getMyArticle(id: string | string[]){
    const searchResult=await axios
    .get(`/api/fetchMyArticle/${id}`)
    .then((response: AxiosResponse) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((err: AxiosError) => console.log(err.response));
    return searchResult;
}


export async function getUser(){
    const searchResult=await axios
    .get('/api/user')
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((err: AxiosError) => console.log(err.response));
    return searchResult;
}

export async function getUserSearch(user_name: any){
    const searchResult=await axios
    .get(`/api/fetchUserSearch/${user_name}`)
    .then((response: AxiosResponse) => {
      return response.data.data;
    })
    .catch((err: AxiosError) => console.log(err.response));
    return searchResult;
}

export async function getUserInfo(user_id: any){
    const searchResult=await axios
    .get(`/api/fetchUserInfo/${user_id}`)
    .then((response: AxiosResponse) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((err: AxiosError) => console.log(err.response));
    return searchResult;
}

export async function getMypageInfo(id : any){
    const searchResult=await axios
    .get(`/api/fetchMypageInfo/${id}`)
    .then((response: AxiosResponse) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((err: AxiosError) => console.log(err.response));
    return searchResult;
}
