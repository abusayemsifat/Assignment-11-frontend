// src/hooks/useAxiosPublic.js
import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://backend-11-cyan.vercel.app',
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;