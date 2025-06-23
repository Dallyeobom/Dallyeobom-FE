import { KaKaoLoginResponse, KaKaoSignUpResponse } from '@/types/auth';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import * as authAPI from '../api/auth.service';

interface AuthState {
  isLoggedIn: boolean;
  handleloggedIn: () => void;
  logout: () => Promise<void>;
  kakaoSignUp: (
    nickName: string,
    providerAccessToken: string,
  ) => Promise<KaKaoSignUpResponse>;
  kakaoLogin: (providerAccessToken: string) => Promise<KaKaoLoginResponse>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  handleloggedIn: () => {
    set({ isLoggedIn: true });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    set({ isLoggedIn: false });
  },

  // 카카오 회원가입
  kakaoSignUp: async (nickName: string, providerAccessToken: string) => {
    const { accessToken, refreshToken } = await authAPI.KaKaoSignup({
      nickName,
      providerAccessToken,
    });
    if (!accessToken || !refreshToken) {
      throw new Error('카카오 회원가입에 실패했습니다. 다시 시도해주세요.');
    }
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  },
  // 카카오 로그인
  kakaoLogin: async (providerAccessToken: string) => {
    const { accessToken, refreshToken, isNewUser } = await authAPI.KaKaoLogin({
      providerAccessToken,
    });
    if (isNewUser) {
      await SecureStore.setItemAsync('providerAccessToken', providerAccessToken);
    } else {
      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);
    }
    return {
      accessToken,
      refreshToken,
      isNewUser,
    };
  },
}));
