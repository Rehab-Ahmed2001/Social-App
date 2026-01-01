import * as z from "zod";

export const commentAddSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Comment is required" })
    .max(500, { message: "Comment must be less than 500 characters" }),
});
