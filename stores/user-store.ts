import { RankingData } from '@/types/auth';
import { create } from 'zustand';
import * as userAPI from '../api/user.service';

interface UserState {
  userRanking: (type: string) => Promise<RankingData>;
}

export const useUserStore = create<UserState>((set) => ({
  userRanking: async (type: string) => {
    const { currentUserRank, list } = await userAPI.UserRanking(type);
    return {
      currentUserRank,
      list,
    };
  },
}));
