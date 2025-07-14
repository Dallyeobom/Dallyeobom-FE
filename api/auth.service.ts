import type {
  KaKaoLoginParams,
  KaKaoSignUpParams,
  NicknameCheckSchemaParams,
} from '@/types/auth';
import client from './client';
import { getCheckNameUrl, getKaKaoLoginUrl, getKaKaoSignUpUrl, getTermsUrl } from './urls';

export const KaKaoSignup = async (params: KaKaoSignUpParams): Promise<any> => {
  const { data } = await client.post(getKaKaoSignUpUrl(), params);
  return data;
};

export const KaKaoLogin = async (params: KaKaoLoginParams): Promise<any> => {
  const { data } = await client.post(getKaKaoLoginUrl(), params);
  return data;
};

export const TermsList = async (): Promise<any> => {
  const { data } = await client.get(getTermsUrl());
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
