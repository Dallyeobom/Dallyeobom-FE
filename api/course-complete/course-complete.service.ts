import {
  CourseCompleteHistoryParams,
  CourseCompleteHistoryResponse,
} from '@/types/course-complete';
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
    console.error('나의 running course list', error);
    return null;
  }
};
