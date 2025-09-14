// 내 기록 조회
export const getMyRecordedCourseHistory = (userId: number) =>
  `/api/v1/course-completion-history/user/${userId}`;

// 코스 완주 기록 생성 API
export const createCourse = () => '/api/v1/course-completion-history';
