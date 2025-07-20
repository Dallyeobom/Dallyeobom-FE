import { router } from 'expo-router';

export const navigateReplaceTo = async (path: any) => {
  setTimeout(() => {
    try {
      router.replace(path);
    } catch (e) {
      console.error('라우팅 실패:', e);
    }
  }, 0);
};
