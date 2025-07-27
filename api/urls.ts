export const getKaKaoSignUpUrl = () => '/api/v1/auth/user/kakao';
export const getKaKaoLoginUrl = () => '/api/v1/auth/login/kakao';
export const getCheckNameUrl = () => '/api/v1/auth/check-nickname';
export const getTermsUrl = () => '/api/v1/auth/terms';
export const getTermsDetailUrl = (id: number) => `/api/v1/auth/terms/${id}`;
export const getUserRankingUrl = (type: string) => `/api/v1/user-rank/${type}`;
export const getAccessTokenUrl = () => `/api/v1/auth/refresh`;

export const getNearRunnerCourseUrl = (
  latitude: number,
  longitude: number,
  radius: number = 1000,
  maxCount: number = 10,
): string => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    radius: radius.toString(),
    maxCount: maxCount.toString(),
  });

  return `/api/v1/course/nearby/running?${params.toString()}`;
};

export const getPopularCourseUrl = (
  latitude: number,
  longitude: number,
  radius: number = 1000,
  maxCount: number = 10,
): string => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    radius: radius.toString(),
    maxCount: maxCount.toString(),
  });

  return `/api/v1/course/nearby?${params.toString()}`;
};
