import Axios from 'axios'
 
const axios = Axios.create({
    baseURL: 'https://newsbyteapi.info',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'content-type': 'application/json'
    },
    withCredentials: true,
})
 
export default axios