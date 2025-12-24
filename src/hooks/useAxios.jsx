import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://backend-11-cyan.vercel.app/'
})

const useAxios = () => {
    return axiosInstance
}

export default useAxios;