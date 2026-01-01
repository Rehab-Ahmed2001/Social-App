import * as z from "zod";

export const loginSchema = z.object({
  email: z.string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email format" }),
  
  password: z.string()
    .nonempty({ message: "Password is required" })
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/,
      { message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character" }
    ),
  
});
