import { getAccessTokenUrl } from '@/api/auth/urls';
import { navigateReplaceTo } from '@/components/router';
import { useAuthStore } from '@/stores/auth-store';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { API_BASE_URL } from './base-url';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

client.interceptors.request.use(
  async (config) => {
    const accessToken = await SecureStore.getItemAsync('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    console.log('error ===>>>', error);
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    console.log('interceptorError', error);
    const { logout } = useAuthStore.getState();

    const statusCode = error.response?.status;
    const accessToken = await SecureStore.getItemAsync('accessToken');

    const refreshToken = await SecureStore.getItemAsync('refreshToken');

    // refreshToken이 유효하지 않거나(400) 없을때 혹은 accessToken이 없을때 다시 로그인 페이지로 이동하기
    if (statusCode === 400 || !refreshToken || !accessToken) {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');

      Alert.alert('유효하지 않은 로그인', '로그인을 다시 해주세요', [
        {
          text: '확인',
          onPress: async () => {
            await logout();
            navigateReplaceTo('/login');
          },
        },
      ]);
    }

    // acessToken만료 에러
    else if (statusCode === 401) {
      const response = await client.post(getAccessTokenUrl(), {
        refreshToken,
      });

      const newAccessToken = response?.data?.accessToken;
      if (newAccessToken) {
        await SecureStore.setItemAsync('accessToken', newAccessToken);

        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return client(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

export default client;
