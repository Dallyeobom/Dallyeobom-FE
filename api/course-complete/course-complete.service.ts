import {
  CourseCompleteHistoryParams,
  CourseCompleteHistoryResponse,
} from '@/types/course-complete';
import { handleError } from '@/utils/error-handler';
import client from '../client';
import { getCourseCompleteHistory } from './urls';

export const courseCompleteHistory = async (
  params: CourseCompleteHistoryParams,
): Promise<CourseCompleteHistoryResponse | null> => {
  try {
    const { userId, lastId, size } = params;
    const { data } = await client.get(getCourseCompleteHistory(userId), {
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
