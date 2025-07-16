import {
  AgreementsSchema,
  AgreementsSchemaParams,
  KaKaoLoginResponse,
  KaKaoSignUpResponse,
  NicknameCheckResponse
} from '@/types/auth';
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
    terms: AgreementsSchemaParams[]
  ) => Promise<KaKaoSignUpResponse>;
  kakaoLogin: (providerAccessToken: string) => Promise<KaKaoLoginResponse>;
  doubleCheckNickname: (nickName: string) => Promise<NicknameCheckResponse>;
  termsList:() => Promise<AgreementsSchema[]>
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
  kakaoSignUp: async (nickName: string, providerAccessToken: string, terms: AgreementsSchemaParams[]) => {
    const { accessToken, refreshToken } = await authAPI.KaKaoSignup({
      nickName,
      providerAccessToken,
      terms
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
      //  new User면은 providerAccess만 저장 어차피 accessToken과 refreshToken signup api에서 받을것이기 때문에
      await SecureStore.setItemAsync('providerAccessToken', providerAccessToken);
    } else {
      // newUser가 아닐때는 accessToken관 refreshToken 업데이뚜
      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);
    }
    return {
      accessToken,
      refreshToken,
      isNewUser,
    };
  },

  // nickname 중복체크
  doubleCheckNickname: async (nickname: string) => {
    const { isDuplicated } = await authAPI.DoubleCheckNickname({
      nickname,
    });
    return { isDuplicated };
  },


  // 이용약관 리스트 조회
  termsList: async () => {
    const data = await authAPI.TermsList();
    return data
  },

  // 이용약관 디테일 조회
  termsDetail: async (id: number) => {
    const data = await authAPI.TermsDetail(id)
    return data
  }

}));
