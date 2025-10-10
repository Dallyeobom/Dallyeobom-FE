import {
  CreateCourseRespose,
  RecordedCourseHistoryParams,
  RecordedCourseHistoryResponse,
} from '@/types/course-complete';
import { handleError } from '@/utils/error-handler';
import client from '../client';
import {
  createCourseUrl,
  deleteCompleteCourseUrl,
  editCompleteCourseUrl,
  getCompleteCourseDetailUrl,
  getMyRecordedCourseHistoryUrl,
} from './urls';

export const myRecordedCourseHistory = async (
  params: RecordedCourseHistoryParams,
): Promise<RecordedCourseHistoryResponse | null> => {
  try {
    const { userId, lastId, size } = params;
    const { data } = await client.get(getMyRecordedCourseHistoryUrl(userId), {
      params: { lastId, size },
    });
    return data;
  } catch (error) {
    const appError = handleError(error, 'courseCompleteHistory');
    if (__DEV__) {
      console.error('[COURSE_COMPLETE] 나의 running course list 에러:', appError);
    }
    return null;
  }
};

export const createMyCourse = async (
  formData: FormData,
): Promise<CreateCourseRespose | null> => {
  try {
    const { data } = await client.post(createCourseUrl(), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error) {
    const appError = handleError(error, 'courseComplete');
    if (__DEV__) {
      console.error('[COURSE_COMPLETE] 나의 createCourse 에러:', appError);
    }
    return null;
  }
};

export const completeCourseDetail = async (id: number) => {
  try {
    const { data } = await client.get(getCompleteCourseDetailUrl(id));
    return data;
  } catch (error) {
    const appError = handleError(error, 'courseCompleteDetail');
    if (__DEV__) {
      console.error('[COURSE_COMPLETE] 코스 상세 API 요청 중 에러 발생:', appError);
    }
    return null;
  }
};

export const deleteCompleteCourse = async (id: number) => {
  try {
    const { status } = await client.delete(deleteCompleteCourseUrl(id));
    return status;
  } catch (error) {
    const appError = handleError(error, 'deleteCompleteCourse');
    if (__DEV__) {
      console.error('[deleteCompleteCourse] 코스 삭제 API 요청 중 에러 발생:', appError);
    }
    return null;
  }
};

export const editCompleteCourse = async (id: number) => {
  try {
    const { data } = await client.patch(editCompleteCourseUrl(id));
    return data;
  } catch (error) {
    const appError = handleError(error, 'editCompleteCourse');
    if (__DEV__) {
      console.error('[editCompleteCourse] 코스 삭제 API 요청 중 에러 발생:', appError);
    }
    return null;
  }
};
