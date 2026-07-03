import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(6, "Current password must be at least 6 characters"),

    newPassword: z
      .string()
      .trim()
      .min(6, "New password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .trim()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Confirm password must match the new password",
    path: ["confirmPassword"],
  });
