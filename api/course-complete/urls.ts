// 내 기록 조회
export const getMyRecordedCourseHistory = (userId: number) =>
  `/api/v1/course-completion-history/user/${userId}`;
