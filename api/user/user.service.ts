import { RankingDataResponse } from '@/types/user';
import client from '../client';
import { getUserInfo, getUserRankingUrl } from './urls';

export const userRanking = async (type: string): Promise<RankingDataResponse | null> => {
  try {
    const { data } = await client.get(getUserRankingUrl(type));
    return data;
  } catch (error) {
    console.error('랭킹 API 요청 중 에러 발생:', error);
    return null;
  }
};

export const userInfo = async () => {
  try {
    const { data } = await client.get(getUserInfo());
    return data;
  } catch (error) {
    console.error('user info API 요청 중 에러 발생:', error);
    return null;
  }
};
