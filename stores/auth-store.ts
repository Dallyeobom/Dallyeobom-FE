import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import * as authAPI from '../api/auth.service';

interface AuthState {
  userId: string | null;
  login: (userId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,

  login: async (userId: string, password: string) => {
    const { accessToken } = await authAPI.login({ userId, password });
    await SecureStore.setItemAsync('accessToken', accessToken);
    set({ userId });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    set({ userId: null });
  },
}));
