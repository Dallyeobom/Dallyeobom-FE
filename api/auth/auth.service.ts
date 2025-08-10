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
import { handleError, showErrorAlert } from '@/utils/error-handler';
import authClient from '../auth-client';
import {
  getCheckNameUrl,
  getKaKaoLoginUrl,
  getKaKaoSignUpUrl,
  getTermsDetailUrl,
  getTermsUrl,
} from './urls';

// 인증 전용 클라이언트
export const KaKaoSignup = async (
  params: KaKaoSignUpParams,
): Promise<KaKaoSignUpResponse | null> => {
  try {
    const { data } = await authClient.post(getKaKaoSignUpUrl(), params);
    return data;
  } catch (error) {
    const appError = handleError(error, 'KaKaoSignup');
    showErrorAlert(appError, 'SIGNUP', '회원가입 실패');
    return null;
  }
};

export const KaKaoLogin = async (
  params: KaKaoLoginParams,
): Promise<KaKaoLoginResponse | null> => {
  try {
    const { data } = await authClient.post(getKaKaoLoginUrl(), params);
    return data;
  } catch (error) {
    const appError = handleError(error, 'KaKaoLogin');
    showErrorAlert(appError, 'LOGIN', '로그인 실패');
    return null;
  }
};

// 이용약관 리스트
export const TermsList = async (): Promise<AgreementsSchema[]> => {
  try {
    const { data } = await authClient.get(getTermsUrl());
    return data;
  } catch (error) {
    const appError = handleError(error, 'TermsList');
    showErrorAlert(appError, 'TERMS', '이용약관 목록을 불러오는데 실패했습니다.');
    return [];
  }
};

// 이용약관 상세 조회
export const TermsDetail = async (id: number): Promise<AgreementDetailResponse> => {
  try {
    const { data } = await authClient.get(getTermsDetailUrl(id));
    return data;
  } catch (error) {
    const appError = handleError(error, 'TermsDetail');
    throw appError;
  }
};

// 닉네임 중복 체크
export const DoubleCheckNickname = async (
  params: NicknameCheckSchemaParams,
): Promise<NicknameCheckResponse> => {
  try {
    const { data } = await authClient.get(getCheckNameUrl(), {
      params: { nickname: params.nickname },
    });
    return {
      isDuplicated: data.isDuplicated,
    };
  } catch (error) {
    const appError = handleError(error, 'DoubleCheckNickname');
    throw appError;
  }
};
