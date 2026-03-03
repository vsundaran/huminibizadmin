import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/admin', // Assumes server runs on 3000
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminAccessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // We do not want to toast 404 or expected errors in all cases, but for generic API errors it's fine.
    // Specially handle 401s and 403s
    const message = error.response?.data?.message || 'An unexpected error occurred';
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Redirect to login if unauthenticated or unauthorized
      if (window.location.pathname !== '/login') {
         toast.error('Session expired please login again.');
         localStorage.removeItem('adminAccessToken');
         localStorage.removeItem('adminRefreshToken');
         window.location.href = '/login';
      } else {
         toast.error(message);
      }
    } else {
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export default api;
