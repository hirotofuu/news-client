import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';

export const logout = () => {
  axios
    .get('/sanctum/csrf-cookie')
    .then((res: AxiosResponse) => {
      axios
        .post('/api/logout' )
        .then((response: AxiosResponse) => {
          console.log('seccess logout')
      })
        .catch((err: AxiosError) => {
          console.log(err)
        });
    });
};

export const fetchCurrentUser = () => {

  const answer=axios
        .get('/api/user/' )
        .then((response: AxiosResponse) => {
          console.log(response.data.data)
          return response.data.data
      })
        .catch((err: AxiosError) => {
          return err.response.status
        });

        return answer
};