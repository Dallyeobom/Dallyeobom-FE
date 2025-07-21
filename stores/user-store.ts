import { NearUserCourses, RankingDataResponse } from '@/types/user';
import { create } from 'zustand';
import * as userAPI from '../api/user.service';

interface UserState {
  userRanking: (type: string) => Promise<RankingDataResponse>;
  nearRunnerCourses: (
    latitude: number,
    longitude: number,
    radius?: number,
    maxCount?: number,
  ) => Promise<NearUserCourses[]>;
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
    const { currentUserRank, list } = response;
    return {
      currentUserRank,
      list,
    };
  },
  nearRunnerCourses: async (
    latitude: number,
    longitude: number,
    radius?: number,
    maxCount?: number,
  ) => {
    const response = await userAPI.NearRunnerCourses(
      latitude,
      longitude,
      radius,
      maxCount,
    );
    return response;
  },
}));
