import client from './client';
import { getUserRankingUrl } from './urls';

// TODO: 반환타입 넣어주기
export const UserRanking = async (type: string): Promise<any> => {
  try {
    const { data } = await client.get(getUserRankingUrl(type), {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMzUiLCJuaWNrTmFtZSI6InRlc3QiLCJleHAiOjE3NTI3NTk4NDJ9.mE3RVJrZ8myOgpnpYb3jQVXWxriKmAUcpvNmuzMyqpE`,
      },
    });
    return data;
  } catch (error) {
    console.error('API 요청 중 에러 발생:', error);
    throw error;
  }
};
