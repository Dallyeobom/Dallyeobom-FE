import type {
  KaKaoLoginParams,
  KaKaoSignUpParams,
  NicknameCheckSchemaParams,
} from '@/types/auth';
import client from './client';
import { getCheckNameUrl, getKaKaoLoginUrl, getKaKaoSignUpUrl, getTermsDetailUrl, getTermsUrl } from './urls';

export const KaKaoSignup = async (params: KaKaoSignUpParams): Promise<any> => {
  const {data} = await client.post(getKaKaoSignUpUrl(), params);
  return data;
};

export const KaKaoLogin = async (params: KaKaoLoginParams): Promise<any> => {
  const { data } = await client.post(getKaKaoLoginUrl(), params);
  return data;
};

// 이용약관 리스트
export const TermsList = async (): Promise<any> => {
  const { data } = await client.get(getTermsUrl());
  return data;
};

// 이용약관 상세 조회
export const TermsDetail = async (id:number): Promise<any> => {
  const { data } = await client.get(getTermsDetailUrl(id));
  return data;
};


export const DoubleCheckNickname = async (
  params: NicknameCheckSchemaParams,
): Promise<any> => {
  const { data, status } = await client.get(getCheckNameUrl(), {
    params: { nickname: params.nickname },
  });
  return {
    isDuplicated: data.isDuplicated,
    status,
  };
};
