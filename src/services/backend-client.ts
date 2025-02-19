import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

const CONFIG: AxiosRequestConfig = {
  timeout: 30000,
  baseURL: import.meta.env.VITE_SPAZIO_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const backendClient: AxiosInstance = axios.create(CONFIG);
