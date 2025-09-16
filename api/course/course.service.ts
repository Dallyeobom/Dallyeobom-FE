import {
  CourseDetailResponse,
  CourseImagesResponse,
  CourseRankResponse,
  CourseLikeRespone,
  CourseReviewParams,
  CourseReviewResponse,
  FavoriteCourseItemsResponse,
  FavoriteCourseParams,
  NearRunnerCoursesRequest,
  NearUserCoursesResponse,
  PopularCoursesRequest,
  PopularCoursesResponse,
  RunningCourseItemsResponse,
  RunningCourseParams,
} from '@/types/course';
import { handleError } from '@/utils/error-handler';
import client from '../client';
import {
  courseLikeUrl,
  getCourseDetailUrl,
  getCourseImagesUrl,
  getCourseRankUrl,
  getCourseReviewUrl,
  getFavoriteCourseUrl,
  getNearRunnerCourseUrl,
  getPopularCourseUrl,
  getRunningHistoryUrl,
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
    console.error('내 찜코스 API 에러', error);
    return null;
  }
};

export const getRunningCourse = async (
  params: RunningCourseParams,
): Promise<RunningCourseItemsResponse | null> => {
  try {
    const { userId, lastId, size } = params;
    const { data } = await client.get(getRunningHistoryUrl(userId), {
      params: { lastId, size },
    });
    return data;
  } catch (error) {
    console.error('내가 달린 코스 API 에러', error);
    return null;
  }
};

export const getCourseImages = async (
  courseId: number,
  params?: { lastId?: number; size?: number },
): Promise<CourseImagesResponse | null> => {
  try {
    const { data } = await client.get(getCourseImagesUrl(courseId), { params });
    return data;
  } catch (error) {
    const appError = handleError(error, 'getCourseImages');
    if (__DEV__) {
      console.error('[COURSE] 코스 이미지 API 요청 중 에러 발생:', appError);
    }
    return null;
  }
};

export const getCourseRank = async (
  courseId: number,
  params?: { lastId?: number; size?: number },
): Promise<CourseRankResponse | null> => {
  try {
    const { data } = await client.get(getCourseRankUrl(courseId), { params });
    return data;
  } catch (error) {
    const appError = handleError(error, 'getCourseRank');
    if (__DEV__) {
      console.error('[COURSE] 코스 랭킹 API 요청 중 에러 발생:', appError);
    }
    return null;
  }
};

export const getCourseReview = async (
  courseId: number,
  params?: CourseReviewParams,
): Promise<CourseReviewResponse | null> => {
  try {
    const { data } = await client.get(getCourseReviewUrl(courseId), { params });
    return data;
  } catch (error) {
    const appError = handleError(error, 'getCourseReview');
    if (__DEV__) {
      console.error('[COURSE] 코스 리뷰 API 요청 중 에러 발생:', appError);
    }
    return null;
  }
};
