import { z } from "zod";

export const updateScoreArgsSchema = z.object({
  username: z.array(z.string()),
  avatar: z.number(),
  userId: z.number(),
  score: z.number(),
});
export type UpdateScoreArgs = z.infer<typeof updateScoreArgsSchema>;
