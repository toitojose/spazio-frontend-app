import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

const CONFIG: AxiosRequestConfig = {
  timeout: 30000,
  baseURL: import.meta.env.VITE_SPAZIO_REAL_ESTATE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const realEstateClient: AxiosInstance = axios.create(CONFIG);
