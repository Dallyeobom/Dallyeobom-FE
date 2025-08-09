import {
  RecordedCourseHistoryParams,
  RecordedCourseHistoryResponse,
} from '@/types/course-complete';
import client from '../client';
import { getMyRecordedCourseHistory } from './urls';

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
    console.error('나의 기록 list', error);
    return null;
  }
};
