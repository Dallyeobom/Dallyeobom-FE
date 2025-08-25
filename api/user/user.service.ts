import { RankingDataResponse, UserInfoResponse } from '@/types/user';
import { handleError } from '@/utils/error-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../client';
import {
  changeNicknameUrl,
  getProfileImageUrl,
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
      await AsyncStorage.setItem('nickname', data.nickname);

      if (data.profileImage) {
        await AsyncStorage.setItem('profileImage', data.profileImage);
      } else {
        await AsyncStorage.removeItem('profileImage');
      }
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
    if (appError.statusCode === 409) {
      return appError.statusCode;
    }
    throw appError;
  }
};

export const changeUserProfileImage = async (formData: FormData) => {
  try {
    const { status } = await client.put(getProfileImageUrl(), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return status;
  } catch (error) {
    const appError = handleError(error, 'changeUserProfileImage');
    throw appError;
  }
};

export const deleteUserProfileImage = async () => {
  try {
    const { status } = await client.delete(getProfileImageUrl());
    return status;
  } catch (error) {
    const appError = handleError(error, 'deleteUserProfileImage');
    throw appError;
  }
};
