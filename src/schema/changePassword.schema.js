import * as z from "zod";

export const changePasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Current password is required"),

  newPassword: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    ),
});
