import axios from './axios';
import { AxiosError, AxiosResponse } from 'axios';

export const logout = () => {

      axios
        .post('/api/logout' )
        .then((response: AxiosResponse) => {
      })
        .catch((err: AxiosError) => {
          console.log(err)
        });
};

export const fetchCurrentUser = () => {

  const currentUser=axios
        .get('/api/user')
        .then((response: AxiosResponse) => {
          console.log(response.data)
          return response.data
      })
        .catch((err: AxiosError) => {
          console.log(err)
        });

        return currentUser
};