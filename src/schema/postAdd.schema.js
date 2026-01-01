import * as z from "zod";

export const postAddSchema = z.object({
  body: z
    .string()
    .min(1, { message: "Post content is required" })
    .max(500, { message: "Max length is 500 characters" }),
});
