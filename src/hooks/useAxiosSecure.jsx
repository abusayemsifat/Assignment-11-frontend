import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://backend-11-cyan.vercel.app/'
})

const useAxiosSecure = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                if (user) {
                    const token = await user.getIdToken();
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                console.log(error);
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user]);

    return axiosSecure;
}

export default useAxiosSecure;