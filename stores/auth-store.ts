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
    const result = await authAPI.KaKaoSignup({
      nickname,
      providerAccessToken,
      terms,
    });

    if (!result) {
      return null;
    }

    const { accessToken, refreshToken } = result;
    if (accessToken && refreshToken) {
      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);
    }

    return result;
  },
  // 카카오 로그인
  kakaoLogin: async (providerAccessToken: string) => {
    const result = await authAPI.KaKaoLogin({
      providerAccessToken: providerAccessToken,
      fcmToken: '',
    });

    if (!result) {
      return null;
    }

    const { accessToken, refreshToken, isNewUser } = result;
    if (isNewUser) {
      await SecureStore.setItemAsync('providerAccessToken', providerAccessToken);
    } else {
      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);
    }

    return result;
  },

  // nickname 중복체크
  doubleCheckNickname: async (nickname: string) => {
    const data = await authAPI.DoubleCheckNickname({
      nickname,
    });
    return data;
  },

  // 이용약관 리스트 조회
  termsList: async () => {
    const data = await authAPI.TermsList();
    return data;
  },

  // 이용약관 디테일 조회
  termsDetail: async (id: number) => {
    const data = await authAPI.TermsDetail(id);
    return data;
  },
}));
