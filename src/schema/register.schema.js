import * as z from "zod";

export const registerSchema = z.object({
  name: z.string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" }),

  email: z.string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email format" }),

  password: z.string()
    .nonempty({ message: "Password is required" })
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/,
      { message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character" }
    ),

  rePassword: z.string()
    .nonempty({ message: "Confirm Password is required" })
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/,
      { message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character" }
    ),

  dateOfBirth: z.string()
    .refine(val => {
      const d = new Date(val);
      if (isNaN(d.getTime())) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      d.setHours(0, 0, 0, 0);
      return d <= today;
    }, { message: "Invalid date of birth" }),

  gender: z.enum(["male", "female"], { message: "Please select a gender" })
})
.refine(data => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
});
