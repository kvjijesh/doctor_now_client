import axios from '../Servies/axiosInterceptor'

export const loginApiCall=async(FormData)=>{
    try {
        return await axios.post("auth/login", FormData)

    } catch (error) {
        console.log(error);
    }

}