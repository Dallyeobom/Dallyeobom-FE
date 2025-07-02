import { useCallback } from 'react';

export const useGoogleMapsApi = () => {
  const callGoogleMapsApi = useCallback(async (url: string, timeout = 10000) => {
    // 타임아웃 증가
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'max-age=300', // 5분 캐시
        },
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.warn('API 요청 타임아웃');
        } else {
          console.error('Google Maps API 호출 실패:', error.message);
        }
      } else {
        console.error('Google Maps API 호출 실패:', error);
      }
      return null;
    }
  }, []);
  return callGoogleMapsApi;
};
