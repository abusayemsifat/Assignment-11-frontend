// src/hooks/useAxiosSecure.js
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const axiosSecure = axios.create({
  baseURL: 'https://backend-11-cyan.vercel.app',
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Attach Firebase ID token to every request
    const reqInterceptor = axiosSecure.interceptors.request.use(async (config) => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle 401 / 403 — redirect to login
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [navigate, auth]);

  return axiosSecure;
};

export default useAxiosSecure;