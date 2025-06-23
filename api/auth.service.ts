import type { KaKaoLoginParams, KaKaoSignUpParams } from '@/types/auth';
import client from './client';
import { getKaKaoLoginUrl, getKaKaoSignUpUrl } from './urls';

export const KaKaoSignup = async (params: KaKaoSignUpParams): Promise<any> => {
  const { data } = await client.post(getKaKaoSignUpUrl(), params);
  return data;
};

export const KaKaoLogin = async (params: KaKaoLoginParams): Promise<any> => {
  const { data } = await client.post(getKaKaoLoginUrl(), params);
  return data;
};
