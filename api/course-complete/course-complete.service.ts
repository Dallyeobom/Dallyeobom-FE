import client from '../client';
import { getCourseCompleteHistory } from './urls';

export const courseCompleteHistory = async (params: any): Promise<any | null> => {
  console.log('파람쓰으으', params);

  try {
    const { data } = await client.get(getCourseCompleteHistory(), {
      params,
    });
    return data;
  } catch (error) {
    console.error('코스 complete history:', error);

    return null;
  }
};
