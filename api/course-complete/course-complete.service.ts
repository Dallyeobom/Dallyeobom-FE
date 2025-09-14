import {
  CreateCourseRespose,
  RecordedCourseHistoryParams,
  RecordedCourseHistoryResponse,
} from '@/types/course-complete';
import { handleError } from '@/utils/error-handler';
import client from '../client';
import { createCourse, getMyRecordedCourseHistory } from './urls';

export const myRecordedCourseHistory = async (
  params: RecordedCourseHistoryParams,
): Promise<RecordedCourseHistoryResponse | null> => {
  try {
    const { userId, lastId, size } = params;
    const { data } = await client.get(getMyRecordedCourseHistory(userId), {
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
    const { data } = await client.post(createCourse(), formData, {
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
