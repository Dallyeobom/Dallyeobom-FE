import { RankingDataResponse, UserInfoResponse } from '@/types/user';
import { handleError, showErrorAlert } from '@/utils/error-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../client';
import {
  changeNicknameUrl,
  changeUserProfileImageUrl,
  getUserInfoUrl,
  getUserRankingUrl,
} from './urls';

export const userRanking = async (type: string): Promise<RankingDataResponse | null> => {
  try {
    const { data } = await client.get(getUserRankingUrl(type));
    return data;
  } catch (error) {
    const appError = handleError(error, 'userRanking');
    if (__DEV__) {
      console.error('[USER] 랭킹 API 요청 중 에러 발생:', appError);
    }
    return null;
  }
};

export const userInfo = async (): Promise<UserInfoResponse | null> => {
  try {
    const { data } = await client.get(getUserInfoUrl());
    if (data) {
      AsyncStorage.setItem('nickname', data.nickname);
      AsyncStorage.setItem('profileImage', data.profileImage);
    }
    return data ?? { nickname: '', profileImage: null };
  } catch (error) {
    const appError = handleError(error, 'userInfo');
    if (__DEV__) {
      console.error('[USER] user info API 요청 중 에러 발생:', appError);
    }
    return null;
  }
};

export const changeNickname = async (nickname: string) => {
  try {
    const { status } = await client.put(changeNicknameUrl(), {
      nickname: nickname,
    });
    return status;
  } catch (error) {
    const appError = handleError(error, 'changeNickname');
    showErrorAlert(appError, 'NICKNAME_CHANGE', '닉네임 변경 실패');
    return null;
  }
};

export const changeUserProfileImage = async (formData: FormData) => {
  try {
    const { status } = await client.put(changeUserProfileImageUrl(), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return status;
  } catch (error) {
    const appError = handleError(error, 'changeUserProfileImage');
    showErrorAlert(appError, 'PROFILE_IMAGE_CHANGE', '프로필 이미지 변경 실패');
    return null;
  }
};
