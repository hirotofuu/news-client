import Axios from 'axios'
 
const axios = Axios.create({
    baseURL: 'http://newsbyteapi.info',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})
 
export default axios