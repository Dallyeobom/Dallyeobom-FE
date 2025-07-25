import {
  NearUserCoursesResponse,
  PopularCoursesResponse,
  RankingDataResponse,
} from '@/types/user';
import client from './client';
import { getNearRunnerCourseUrl, getPopularCourseUrl, getUserRankingUrl } from './urls';

export const UserRanking = async (type: string): Promise<RankingDataResponse | null> => {
  try {
    const { data } = await client.get(getUserRankingUrl(type));
    return data;
  } catch (error) {
    console.error('랭킹 API 요청 중 에러 발생:', error);
    return null;
  }
};

export const NearRunnerCourses = async (
  latitude: number,
  longitude: number,
  radius?: number,
  maxCount?: number,
): Promise<NearUserCoursesResponse | null> => {
  try {
    const { data } = await client.get(
      getNearRunnerCourseUrl(latitude, longitude, radius, maxCount),
    );
    return data;
  } catch (error) {
    console.error('근처 유저들의 코스 API 요청 중 에러 발생:', error);

    return null;
  }
};

export const PopularCourses = async (
  latitude: number,
  longitude: number,
  radius?: number,
  maxCount?: number,
): Promise<PopularCoursesResponse | null> => {
  try {
    const { data } = await client.get(
      getPopularCourseUrl(latitude, longitude, radius, maxCount),
    );
    return data;
  } catch (error) {
    console.error('인기코스 API 요청 중 에러 발생:', error);

    return null;
  }
};
