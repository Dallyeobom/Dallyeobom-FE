// 내 기록 조회
export const getMyRecordedCourseHistoryUrl = (userId: number) =>
  `/api/v1/course-completion-history/user/${userId}`;

// 코스 완주 기록 생성 API
export const createCourseUrl = () => '/api/v1/course-completion-history';

// 코스 완주 기록 상세 API
export const getCompleteCourseDetailUrl = (courseId: number) =>
  `/api/v1/course-completion-history/${courseId}`;

// 코스 완주 기록 삭제 API
export const deleteCompleteCourseUrl = (id: number) =>
  `/api/v1/course-completion-history/${id}`;

// 코스 완주 기록 수정 API
export const editCompleteCourseUrl = (id: number) =>
  `/api/v1/course-completion-history/${id}`;
