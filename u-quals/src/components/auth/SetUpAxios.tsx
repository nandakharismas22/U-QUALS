// setupAxios.js
import axios from 'axios';
import { useAuth } from './AuthContext';

const setupAxios = () => {
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // Atau dari context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    response => response,
    async error => {
      if (error.config.url.includes('refresh-token')) {
        // Jika refresh token sendiri gagal
        localStorage.removeItem('token');
        window.location.href = '/signin';
        return Promise.reject(error);
      }
  
      if (error.response?.status === 401 && !error.config._retry) {
        error.config._retry = true;
        const refresh = await axios.get('http://localhost:5000/refresh-token', {
          withCredentials: true
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${refresh.data.accessToken}`;
        return axios(error.config);
      }
      return Promise.reject(error);
    }
  
  );
};

export default setupAxios;