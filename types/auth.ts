import { z } from 'zod';

// 카카오 로그인 요청 파라미터

export const kakaoLoginParamsSchema = z.object({
  providerAccessToken: z.string(),
  fcmToken: z.string().optional(),
});

export type KaKaoLoginParams = z.infer<typeof kakaoLoginParamsSchema>;

// 카카오 회원가입 요청 파라미터

const agreementSchemaParms = z.object({
  id: z.number(),
  termsType: z.string(),
  agreed: z.boolean(),
});

export type AgreementsSchemaParams = z.infer<typeof agreementSchemaParms>;

export const kakaoSignUpParamsSchema = z.object({
  nickname: z.string(),
  providerAccessToken: z.string(),
  terms: z.array(agreementSchemaParms),
});

export type KaKaoSignUpParams = z.infer<typeof kakaoSignUpParamsSchema>;

//  카카오 로그인 응답

export const kakaoLoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  isNewUser: z.boolean(),
});

export type KaKaoLoginResponse = z.infer<typeof kakaoLoginResponseSchema>;

//  카카오 회원가입 응답

export const kakaoSignUpResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type KaKaoSignUpResponse = z.infer<typeof kakaoSignUpResponseSchema>;

// 닉네임 중복 확인 요청
export const nicknameCheckSchema = z.object({
  nickname: z.string(),
});

export type NicknameCheckSchemaParams = z.infer<typeof nicknameCheckSchema>;

// 닉네임 중복 확인 응답
export const nicknameCheckResponseSchema = z.object({
  isDuplicated: z.boolean(), // 중복 여부
});

export type NicknameCheckResponse = z.infer<typeof nicknameCheckResponseSchema>;

//  서버에서 제공하는 약관 정보 스키마
const AgreementSchema = z.object({
  id: z.number(),
  name: z.string(),
  required: z.boolean(),
  seq: z.number(),
  type: z.string(),
});

export type AgreementsSchema = z.infer<typeof AgreementSchema>;

//  확장된 약관 스키마

const extendedAgreementSchema = AgreementSchema.extend({
  isCheck: z.boolean(),
});

export type ExtendedAgreementSchema = z.infer<typeof extendedAgreementSchema>;

export const AgreementDetailResponseSchema = z.object({
  id: z.number(),
  type: z.string(),
  name: z.string(),
  conditions: z.string(),
  revisionDate: z.string(),
  required: z.boolean(),
});

export type AgreementDetailResponse = z.infer<typeof AgreementDetailResponseSchema>;

// accessToken 재발급 응답 스키마
const accessTokenReissueResponseSchema = z.object({
  accessToken: z.number(),
  refreshToken: z.number(),
});

export type AccessTokenReissueResponse = z.infer<typeof accessTokenReissueResponseSchema>;
