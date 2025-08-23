export const getNearRunnerCourseUrl = () => '/api/v1/course/nearby/running';
export const getPopularCourseUrl = () => '/api/v1/course/nearby';
export const getCourseDetailUrl = (id: number) => `/api/v1/course/${id}`;
export const courseLikeUrl = (id: number) => `/api/v1/course/${id}/like`;

// 좋아요 누른 코스
export const getFavoriteCourseUrl = (userId: number) =>
  `/api/v1/course/user/${userId}/like`;

// 내가 달린 코스
export const getRunningHistoryUrl = (userId: number) =>
  `/api/v1/course/user/${userId}/completed`;

// 코스 이미지
export const getCourseImagesUrl = (courseId: number) =>
  `/api/v1/course/${courseId}/images`;

// 코스 랭킹
export const getCourseRankUrl = (courseId: number) =>
  `/api/v1/course/${courseId}/rank`;
