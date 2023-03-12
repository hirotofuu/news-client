import Axios from 'axios'
 
const axios = Axios.create({
    baseURL: 'https://newsapi.info',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },
    withCredentials: true,
})
 
export default axios