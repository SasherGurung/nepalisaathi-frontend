import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Please enter a valid email address."),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters."),
  });

export const SignupSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.email(),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().trim().min(6, "Confirm your password"),
});
