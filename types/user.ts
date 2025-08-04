import { z } from 'zod';

const rankingDataListSchema = z.object({
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

export const rankingDataResponseSchema = z.object({
  currentUserRank: currentUserRankSchema.nullable(),
  list: z.array(rankingDataListSchema),
});

export const userInfoResponseSchema = z.object({
  nickname: z.string(),
  profileImage: z.string().nullable(),
});

export type RankingDataResponse = z.infer<typeof rankingDataResponseSchema>;
export type RankingDataList = z.infer<typeof rankingDataListSchema>;
export type CurrentUserRank = z.infer<typeof currentUserRankSchema>;

export type UserInfoResponse = z.infer<typeof userInfoResponseSchema>;
