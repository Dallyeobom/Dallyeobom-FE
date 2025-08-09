import {
  CourseDetailResponse,
  CourseLikeRespone,
  FavoriteCourseItemsResponse,
  FavoriteCourseParams,
  NearRunnerCoursesRequest,
  NearUserCoursesResponse,
  PopularCoursesRequest,
  PopularCoursesResponse,
} from '@/types/course';
import client from '../client';
import {
  courseLikeUrl,
  getCourseDetailUrl,
  getFavoriteCourseUrl,
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

export const courseLike = async (id: number): Promise<CourseLikeRespone | null> => {
  try {
    const { data } = await client.post(courseLikeUrl(id));
    return data;
  } catch (error) {
    console.error('코스 좋아요 API 에러', error);
    return null;
  }
};

export const getFavoriteCourse = async (
  params: FavoriteCourseParams,
): Promise<FavoriteCourseItemsResponse | null> => {
  try {
    const { userId, lastId, size } = params;
    const { data } = await client.get(getFavoriteCourseUrl(userId), {
      params: { lastId, size },
    });
    return data;
  } catch (error) {
    console.error('내 찜코스 li22t22d32 에2러', error);
    return null;
  }
};
