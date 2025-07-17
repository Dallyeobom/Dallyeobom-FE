import { create } from 'zustand';
import * as userAPI from '../api/user.service';

interface UserState {
  userRanking: (type: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  userRanking: async (type: string) => {
    const result = await userAPI.UserRanking(type);
    console.log('result333333', result);
  },
}));
