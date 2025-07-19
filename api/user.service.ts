import client from './client';
import { getUserRankingUrl } from './urls';

// TODO: 반환타입 넣어주기
export const UserRanking = async (type: string): Promise<any> => {
  try {
    const { data } = await client.get(getUserRankingUrl(type));
    return data;
  } catch (error) {
    console.error('API 요청 중 에러 발생:', error);
  }
};
