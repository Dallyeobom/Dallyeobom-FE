import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import * as authAPI from '../api/auth.service';

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

interface AuthState {
  userId: string | null;
  signup: (nickname: string) => Promise<number>;
  login: (userId: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  signup: async (nickname: string) => {
    const result = await authAPI.signup({ nickname });
    return result;
  },
  login: async (userId: string, password: string) => {
    const { accessToken, refreshToken } = await authAPI.login({ userId, password });
    await SecureStore.setItemAsync('accessToken', accessToken);
    set({ userId });
    return {
      accessToken,
      refreshToken,
    };
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    set({ userId: null });
  },
}));
