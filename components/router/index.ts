import { router } from 'expo-router';

export const navigateReplaceTo = async (path: any) => {
  try {
    setTimeout(() => {
      router.replace(path);
    }, 0);
  } catch (e) {
    console.error('라우팅 실패:', e);
  }
};
