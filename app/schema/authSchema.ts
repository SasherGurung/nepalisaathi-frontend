import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Please enter a valid email address."),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters."),
  });

export const SignupSchema = z.object({
  name: z.string().trim().min(3, "Name is required"),
  email: z.email(),
  password: z.string().trim().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().trim().min(8, "Confirm your password"),
});
