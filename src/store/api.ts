import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import { URL } from '../const';

const REQUEST_TIMEOUT = 5000;

const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => config
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      throw error;
    }
  );

  return api;
};

export { createApi };
