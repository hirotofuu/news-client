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

export const fetchCurrentUser = (pass: string) => {

  const currentUser=axios
        .get(`/api/userdayo/${pass}`)
        .then((response: AxiosResponse) => {
          return response.data.data
      })
        .catch((err: AxiosError) => {
          console.log(err)
        });

        return currentUser
};