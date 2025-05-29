import axios from 'axios';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

client.interceptors.request.use((config) => {
  // const token = await SecureStore.getItemAsync('accessToken');
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  },
);

export default client;
