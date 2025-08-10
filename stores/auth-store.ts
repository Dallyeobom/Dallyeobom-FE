import * as authAPI from '@/api/auth/auth.service';
import {
  AgreementsSchema,
  AgreementsSchemaParams,
  KaKaoLoginResponse,
  KaKaoSignUpResponse,
  NicknameCheckResponse,
} from '@/types/auth';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  handleloggedIn: () => void;
  logout: () => Promise<void>;
  kakaoSignUp: (
    nickname: string,
    providerAccessToken: string,
    terms: AgreementsSchemaParams[],
  ) => Promise<KaKaoSignUpResponse | null>;
  kakaoLogin: (providerAccessToken: string) => Promise<KaKaoLoginResponse | null>;
  doubleCheckNickname: (nickname: string) => Promise<NicknameCheckResponse | null>;
  termsList: () => Promise<AgreementsSchema[]>;
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
  kakaoSignUp: async (
    nickname: string,
    providerAccessToken: string,
    terms: AgreementsSchemaParams[],
  ) => {
    try {
      const result = await authAPI.KaKaoSignup({
        nickname,
        providerAccessToken,
        terms,
      });

      if (result?.accessToken && result?.refreshToken) {
        await SecureStore.setItemAsync('accessToken', result.accessToken);
        await SecureStore.setItemAsync('refreshToken', result.refreshToken);
      }

      return result;
    } catch {
      return null;
    }
  },
  // 카카오 로그인
  kakaoLogin: async (providerAccessToken: string) => {
    try {
      const result = await authAPI.KaKaoLogin({
        providerAccessToken: providerAccessToken,
        fcmToken: '',
      });

      if (result?.isNewUser) {
        await SecureStore.setItemAsync('providerAccessToken', providerAccessToken);
      } else if (result?.accessToken && result?.refreshToken) {
        await SecureStore.setItemAsync('accessToken', result.accessToken);
        await SecureStore.setItemAsync('refreshToken', result.refreshToken);
      }

      return result;
    } catch {
      return null;
    }
  },

  // nickname 중복체크
  doubleCheckNickname: async (nickname: string) => {
    try {
      const data = await authAPI.DoubleCheckNickname({
        nickname,
      });
      return data;
    } catch {
      return null;
    }
  },

  // 이용약관 리스트 조회
  termsList: async () => {
    try {
      const data = await authAPI.TermsList();
      return data;
    } catch {
      return [];
    }
  },

  // 이용약관 디테일 조회
  termsDetail: async (id: number) => {
    try {
      const data = await authAPI.TermsDetail(id);
      return data;
    } catch {
      return null;
    }
  },
}));
