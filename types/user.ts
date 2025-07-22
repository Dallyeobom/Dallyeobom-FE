import { z } from 'zod';


const RankingDataListSchema = z.object({
  completeCourseCount: z.number(),
  nickname: z.string(),
  runningLength: z.number(),
  userId: z.number(),
});

const currentUserRankSchema = z.object({
  rank: z.number(),
  runningLength: z.number(),
  completeCourseCount: z.number(),
});


// 랭킹 리스트 API 응답 타입
export const RankingDataResponseSchema = z.object({
  currentUserRank: currentUserRankSchema.nullable(),
  list: z.array(RankingDataListSchema),
});

export const UserSchema = z.object({
  id: z.number(),
  nickname: z.string(),
});

export const NearUserCoursesResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  courseImage: z.string().url(),
  user: UserSchema,
});

export type RankingDataResponse = z.infer<typeof RankingDataResponseSchema>;
export type RankingDataList = z.infer<typeof RankingDataListSchema>;
export type CurrentUserRank = z.infer<typeof currentUserRankSchema>;
export type NearUserCourses = z.infer<typeof NearUserCoursesResponseSchema>;
