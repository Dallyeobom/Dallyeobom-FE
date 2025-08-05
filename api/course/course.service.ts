import {
  CourseDetailResponse,
  NearRunnerCoursesRequest,
  NearUserCoursesResponse,
  PopularCoursesRequest,
  PopularCoursesResponse,
} from '@/types/course';
import client from '../client';
import {
  courseLikeUrl,
  getCourseDetailUrl,
  getNearRunnerCourseUrl,
  getPopularCourseUrl,
} from './urls';

export const nearRunnerCourses = async (
  params: NearRunnerCoursesRequest,
): Promise<NearUserCoursesResponse[] | null> => {
  try {
    const { data } = await client.get(getNearRunnerCourseUrl(), { params });
    return data;
  } catch (error) {
    console.error('근처 유저들의 코스 API 요청 중 에러 발생:', error);

    return null;
  }
};

export const popularCourses = async (
  params: PopularCoursesRequest,
): Promise<PopularCoursesResponse[] | null> => {
  try {
    const { data } = await client.get(getPopularCourseUrl(), { params });
    return data;
  } catch (error) {
    console.error('인기코스 API 요청 중 에러 발생:', error);

    return null;
  }
};

export const courseDetail = async (id: number): Promise<CourseDetailResponse | null> => {
  try {
    const { data } = await client.get(getCourseDetailUrl(id));
    return data;
  } catch (error) {
    console.error('코스 상세 API 요청 중 에러 발생:', error);
    return null;
  }
};

export const courseLike = async (id: number) => {
  try {
    const { status, data } = await client.post(courseLikeUrl(id));
    return {
      status,
      data,
    };
  } catch (error) {
    console.error('코스 좋아요 API 에러', error);
    return null;
  }
};
