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
import client from './client';
import {
  getCheckNameUrl,
  getKaKaoLoginUrl,
  getKaKaoSignUpUrl,
  getTermsDetailUrl,
  getTermsUrl,
} from './urls';

export const KaKaoSignup = async (
  params: KaKaoSignUpParams,
): Promise<KaKaoSignUpResponse> => {
  const { data } = await client.post(getKaKaoSignUpUrl(), params);
  return data;
};

export const KaKaoLogin = async (
  params: KaKaoLoginParams,
): Promise<KaKaoLoginResponse> => {
  const { data } = await client.post(getKaKaoLoginUrl(), params);
  return data;
};

// 이용약관 리스트
export const TermsList = async (): Promise<AgreementsSchema[]> => {
  const { data } = await client.get(getTermsUrl());
  return data;
};

// 이용약관 상세 조회

export const TermsDetail = async (id: number): Promise<AgreementDetailResponse> => {
  const { data } = await client.get(getTermsDetailUrl(id));
  return data;
};

// 닉네임 중복 체크
export const DoubleCheckNickname = async (
  params: NicknameCheckSchemaParams,
): Promise<NicknameCheckResponse> => {
  const { data } = await client.get(getCheckNameUrl(), {
    params: { nickname: params.nickname },
  });
  return {
    isDuplicated: data.isDuplicated,
  };
};
