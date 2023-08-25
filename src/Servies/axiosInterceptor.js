import axios from "axios";
import { toast } from "react-toastify";


const instance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 2000,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      console.log('Hi i am sending tokens')
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {

      localStorage.removeItem('token')
      window.location.href = '/login';
    }
    else{
      toast.error(`${error.response.data.message}`,{position:toast.POSITION.TOP_CENTER})
    }
    return Promise.reject(error);
  }
);
export default instance;