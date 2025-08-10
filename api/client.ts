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
    if (__DEV__) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }
    
    const accessToken = await SecureStore.getItemAsync('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    if (__DEV__) {
      console.error('[API] Request Error:', error);
    }
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`, response.data);
    }
    return response;
  },
  async (error) => {
    const method = error.config?.method?.toUpperCase() || 'UNKNOWN';
    const url = error.config?.url || 'UNKNOWN';
    
    // 개발 환경에서만 로깅
    if (__DEV__) {
      if (error.response) {
        console.error(`[API] ${method} ${url} - ${error.response.status}`, error.response.data);
      } else {
        console.error(`[API] ${method} ${url} - Network Error`, error.message);
      }
    }

    const { logout } = useAuthStore.getState();
    const statusCode = error.response?.status;
    const accessToken = await SecureStore.getItemAsync('accessToken');
    const refreshToken = await SecureStore.getItemAsync('refreshToken');

    // refreshToken이 유효하지 않거나(400) 없을때 혹은 accessToken이 없을때 다시 로그인 페이지로 이동하기
    if (statusCode === 400 || !refreshToken || !accessToken) {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');

      if (__DEV__) {
        console.warn(`[AUTH] 토큰 만료 - 로그인 페이지로 이동`, { statusCode, hasRefreshToken: !!refreshToken, hasAccessToken: !!accessToken });
      }

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
    // accessToken만료 에러
    else if (statusCode === 401) {
      try {
        if (__DEV__) {
          console.log('[AUTH] AccessToken 만료 - RefreshToken으로 갱신 시도');
        }
        
        const response = await client.post(getAccessTokenUrl(), {
          refreshToken,
        });

        const newAccessToken = response?.data?.accessToken;
        if (newAccessToken) {
          await SecureStore.setItemAsync('accessToken', newAccessToken);
          
          if (__DEV__) {
            console.log('[AUTH] AccessToken 갱신 성공');
          }

          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return client(originalRequest);
        } else {
          throw new Error('새로운 액세스 토큰이 응답에 포함되지 않았습니다.');
        }
      } catch (refreshError) {
        if (__DEV__) {
          console.error('[AUTH] 토큰 갱신 실패:', refreshError);
        }
        
        // 토큰 갱신 실패 시 로그아웃 처리
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        
        Alert.alert('세션 만료', '다시 로그인해주세요', [
          {
            text: '확인',
            onPress: async () => {
              await logout();
              navigateReplaceTo('/login');
            },
          },
        ]);
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  },
);

export default client;
