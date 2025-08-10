import {
  CourseDetailResponse,
  CourseLikeRespone,
  NearRunnerCoursesRequest,
  NearUserCoursesResponse,
  PopularCoursesRequest,
  PopularCoursesResponse,
} from '@/types/course';
import { handleError } from '@/utils/error-handler';
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
    const appError = handleError(error, 'nearRunnerCourses');
    if (__DEV__) {
      console.error('[COURSE] 근처 유저들의 코스 API 요청 중 에러 발생:', appError);
    }
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
    const appError = handleError(error, 'popularCourses');
    if (__DEV__) {
      console.error('[COURSE] 인기코스 API 요청 중 에러 발생:', appError);
    }
    return null;
  }
};

export const courseDetail = async (id: number): Promise<CourseDetailResponse | null> => {
  try {
    const { data } = await client.get(getCourseDetailUrl(id));
    return data;
  } catch (error) {
    const appError = handleError(error, 'courseDetail');
    if (__DEV__) {
      console.error('[COURSE] 코스 상세 API 요청 중 에러 발생:', appError);
    }
    return null;
  }
};

export const courseLike = async (id: number): Promise<CourseLikeRespone | null> => {
  try {
    const { data } = await client.post(courseLikeUrl(id));
    return data;
  } catch (error) {
    const appError = handleError(error, 'courseLike');
    throw appError;
  }
};
