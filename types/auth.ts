import { z } from 'zod';

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

export const nicknameCheckSchema = z.object({
  nickname: z.string(),
});

// 닉네임 타입
export type NicknameCheckSchemaParams = z.infer<typeof nicknameCheckSchema>;

export const nicknameCheckResponseSchema = z.object({
  isDuplicated: z.boolean(),
});

export type NicknameCheckResponse = z.infer<typeof nicknameCheckResponseSchema>;





// 약관동의 타입
const AgreementSchema = z.object({
  id: z.number(),
  name: z.string(),
  required: z.boolean(),
  seq: z.number(),
  type: z.string()
})




export type AgreementsSchema = z.infer<typeof AgreementSchema>;


// 약관동의 params
const agreementSchemaParms = z.object({
  id: z.number(),
  termsType: z.string(),
  agreed: z.boolean()

})

export type AgreementsSchemaParams = z.infer<typeof agreementSchemaParms>;


const extendedAgreementSchema  = AgreementSchema.extend({
  isCheck: z.boolean()
})
export type ExtendedAgreementSchema= z.infer<typeof extendedAgreementSchema  >;
