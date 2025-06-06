import type { LoginParams, LoginResponse, SignUpParams } from '@/types/auth';
import client from './client';
import { getLoginUrl, getSignUpUrl } from './urls';

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  const { data } = await client.post(getLoginUrl(), params);
  return data;
};

export const signup = async (params: SignUpParams): Promise<number> => {
  const { status } = await client.post(getSignUpUrl(), params);
  return status;
};
