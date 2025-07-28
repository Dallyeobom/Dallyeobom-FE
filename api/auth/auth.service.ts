// api/auth/auth.service.ts - 수정된 버전
import type {
  AgreementDetailResponse,
  AgreementsSchema,
  KaKaoLoginParams,
  KaKaoLoginResponse,
  KaKaoSignUpParams,
  KaKaoSignUpResponse,
  NicknameCheckResponse,
  NicknameCheckSchemaParams,
} from '@/types/auth';
import axios from 'axios';
import { API_BASE_URL } from '../client';
import {
  getCheckNameUrl,
  getKaKaoLoginUrl,
  getKaKaoSignUpUrl,
  getMyInfo,
  getTermsDetailUrl,
  getTermsUrl,
} from './urls';

// 인증 전용 클라이언트
const authClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  adapter: 'fetch',
});

export const KaKaoSignup = async (
  params: KaKaoSignUpParams,
): Promise<KaKaoSignUpResponse> => {
  const { data } = await authClient.post(getKaKaoSignUpUrl(), params);
  return data;
};

export const KaKaoLogin = async (
  params: KaKaoLoginParams,
): Promise<KaKaoLoginResponse> => {
  const { data } = await authClient.post(getKaKaoLoginUrl(), params, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

// 이용약관 리스트
export const TermsList = async (): Promise<AgreementsSchema[]> => {
  const { data } = await authClient.get(getTermsUrl());
  return data;
};

// 이용약관 상세 조회
export const TermsDetail = async (id: number): Promise<AgreementDetailResponse> => {
  const { data } = await authClient.get(getTermsDetailUrl(id));
  return data;
};

// 닉네임 중복 체크
export const DoubleCheckNickname = async (
  params: NicknameCheckSchemaParams,
): Promise<NicknameCheckResponse> => {
  const { data } = await authClient.get(getCheckNameUrl(), {
    params: { nickname: params.nickname },
  });
  return {
    isDuplicated: data.isDuplicated,
  };
};
// user정보 가져오기
export const GetUserInfo = async () => {
  const { data } = await authClient.get(getMyInfo());
  console.log('data', data);
};
