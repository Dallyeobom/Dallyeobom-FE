export const getNearRunnerCourseUrl = () => '/api/v1/course/nearby/running';
export const getPopularCourseUrl = () => '/api/v1/course/nearby';
export const getCourseDetailUrl = (id: number) => `/api/v1/course/${id}`;
export const courseLikeUrl = (id: number) => `/api/v1/course/${id}/like`;

export const getFavoriteCourseUrl = (userId: number) =>
  `/api/v1/course/user/${userId}/like`;
