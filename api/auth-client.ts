import axios from 'axios';
import { API_BASE_URL } from './base-url';

const authClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  adapter: 'fetch',
});

authClient.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }
    return config;
  },
  (error) => {
    if (__DEV__) {
      console.error('[API] Request Error:', error);
    }
    return Promise.reject(error);
  },
);

authClient.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(
        `[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`,
        response.data,
      );
    }
    return response;
  },
  (error) => {
    if (__DEV__) {
      const method = error.config?.method?.toUpperCase() || 'UNKNOWN';
      const url = error.config?.url || 'UNKNOWN';

      if (error.response) {
        console.error(
          `[API] ${method} ${url} - ${error.response.status}`,
          error.response.data,
        );
      } else {
        console.error(`[API] ${method} ${url} - Network Error`, error.message);
      }
    }

    return Promise.reject(error);
  },
);

export default authClient;
