import Axios from 'axios'
 
const axios = Axios.create({
    baseURL: 'https://newsbyteapi.info',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },
    withCredentials: true,
})
 
export default axios