import axios from 'axios';

 const axiosInstance = axios.create({
    baseURL: "https://backendchatapp-latest.onrender.com/api",
    withCredentials: true,
})                         

export default axiosInstance;