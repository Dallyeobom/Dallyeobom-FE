import { RankingDataResponse } from '@/types/user';
import client from './client';
import { getNearRunnerCourseUrl, getUserRankingUrl } from './urls';

export const UserRanking = async (type: string): Promise<RankingDataResponse | null> => {
  try {
    const { data } = await client.get(getUserRankingUrl(type));
    return data;
  } catch (error) {
    console.error('API 요청 중 에러 발생:', error);
    return null;
  }
};

export const NearRunnerCourses = async (
  latitude: number,
  longitude: number,
  radius?: number,
  maxCount?: number,
) => {
  try {
    const { data } = await client.get(
      getNearRunnerCourseUrl(latitude, longitude, radius, maxCount),
    );
    console.log('data ===>>>>>>', data);
    return data;
  } catch (error) {
    return null;
  }
};
