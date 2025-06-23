import { z } from 'zod';

export interface LoginParams {
  userId: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignUpParams {
  nickname: string;
}
export interface SignUpResponse {
  status: number;
}

export const kakaoSignUpParamsSchema = z.object({
  nickName: z.string(),
  providerAccessToken: z.string(),
});

export type KaKaoSignUpParams = z.infer<typeof kakaoSignUpParamsSchema>;

export const kakaoLoginParamsSchema = z.object({
  providerAccessToken: z.string(),
});

export type KaKaoLoginParams = z.infer<typeof kakaoLoginParamsSchema>;

export const kakaoSignUpResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type KaKaoSignUpResponse = z.infer<typeof kakaoSignUpResponseSchema>;

export const kakaoLoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  isNewUser: z.boolean(),
});

export type KaKaoLoginResponse = z.infer<typeof kakaoLoginResponseSchema>;
