import type { LoginParams, LoginResponse } from '@/types/auth';
import client from './client';
import { getLoginUrl } from './urls';

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  const { data } = await client.post(getLoginUrl(), params);
  return data;
};
