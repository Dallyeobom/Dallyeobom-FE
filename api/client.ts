import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://jayden-bin.cc';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  adapter: 'fetch',
});

client.interceptors.request.use(async (config) => {
  const accessToken = await SecureStore.getItemAsync('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

client.interceptors.response.use(
  (res) => res,
  async (err) => {
    const request = err.conifg;
    // 401 은 에러가 엑세스 토큰의 유효성이 지난것..
    if (err.response?.status === 401) {
    }
    return Promise.reject(err);
  },
);

export default client;
