import { RankingData } from '@/types/user';
import { create } from 'zustand';
import * as userAPI from '../api/user.service';

interface UserState {
  userRanking: (type: string) => Promise<RankingData>;
}

export const useUserStore = create<UserState>((set) => ({
  userRanking: async (type: string) => {
    const response = await userAPI.UserRanking(type);
    if (!response) {
      return {
        currentUserRank: null,
        list: [],
      };
    }
    const { currentUserRank, list } = await userAPI.UserRanking(type);
    return {
      currentUserRank,
      list,
    };
  },
}));
