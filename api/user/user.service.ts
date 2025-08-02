import { RankingDataResponse, UserInfoResponse } from '@/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../client';
import { changeNickNameUrl, getUserInfoUrl, getUserRankingUrl } from './urls';

export const userRanking = async (type: string): Promise<RankingDataResponse | null> => {
  try {
    const { data } = await client.get(getUserRankingUrl(type));
    return data;
  } catch (error) {
    console.error('랭킹 API 요청 중 에러 발생:', error);
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
    console.error('user info API 요청 중 에러 발생:', error);
    return null;
  }
};

export const changeNickName = async (nickname: string) => {
  try {
    const { status } = await client.put(changeNickNameUrl(), {
      nickname: nickname,
    });

    return status;
  } catch (error) {
    console.error('닉네임 변경 API중 :', error);
    return null;
  }
};
