export const getNearRunnerCourseUrl = () => '/api/v1/course/nearby/running';
export const getPopularCourseUrl = () => '/api/v1/course/nearby';
export const getCourseDetailUrl = (id: number) => `/api/v1/course/${id}`;
export const courseLikeUrl = (id: number) => `/api/v1/course/${id}/like`;
// https://jayden-bin.cc/api/v1/course/user/1/like?lastId=10&size=10

export const getFavoriteCourseUrl = (userId: number) => `/api/v1/course/user/${userId}`;
