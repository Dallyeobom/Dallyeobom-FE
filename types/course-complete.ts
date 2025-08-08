import { z } from 'zod';

export const courseCompleteHistoryParamsSchema = z.object({
  userId: z.number(),
  lastId: z.number().optional(),
  size: z.number().optional(),
});

const courseCompleteHistoryItemSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  location: z.string(),
  overViewImageUrl: z.string(),
  length: z.number().int(),
  level: z.string(),
  isLiked: z.boolean(),
});

const courseCompleteHistoryResponseSchema = z.object({
  items: z.array(courseCompleteHistoryItemSchema),
  lastId: z.number().int(),
  hasNext: z.boolean(),
});
export type CourseCompleteHistoryParams = z.infer<
  typeof courseCompleteHistoryParamsSchema
>;

export type CourseCompleteHistoryItem = z.infer<typeof courseCompleteHistoryItemSchema>;
export type CourseCompleteHistoryResponse = z.infer<
  typeof courseCompleteHistoryResponseSchema
>;
