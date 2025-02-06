import axios from 'axios';
import store from '../store/modules/auth';
import router from '../router';

// Axios instance oluştur
const api = axios.create({
  baseURL: 'https://iapitest.eva.guru',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = store.state.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('refres token ekle');
    }
    return Promise.reject(error);
  }
);

export default api;
