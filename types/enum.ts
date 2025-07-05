import { z } from 'zod';

export const rankingEnum = z.enum(['weekly', 'monthly', 'yearly']);

export type RankingEnum = z.infer<typeof rankingEnum>;
