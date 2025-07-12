import { z } from 'zod';

export const nearByRunnerCourseItemSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
  profileImage: z.string(),
  nickname: z.string(),
  courseName: z.string(),
});

export type NearByRunneCourseItemSchema = z.infer<typeof nearByRunnerCourseItemSchema>;

export const popularCourseItemSchema = z.object({
  id: z.number(),
  courseName: z.string(),
  difficulty: z.string(),
  distance: z.string(),
  imageUrl: z.string(),
});

export type PopularCourseItemSchema = z.infer<typeof popularCourseItemSchema>;

export const termsAndConditionItemSchema = z.object({
  id: z.number(),
  label: z.string(),
  required: z.boolean(),
  checked: z.boolean(),
  name: z.string(),
  onToggle: z.function(),
});

export type TermsAndConditionItemSchema = z.infer<typeof termsAndConditionItemSchema>;
