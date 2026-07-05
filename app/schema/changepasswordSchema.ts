import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(8, "Current password must be at least 8 characters"),

    newPassword: z
      .string()
      .trim()
      .min(8, "New password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .trim()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Confirm password must match the new password",
    path: ["confirmPassword"],
  });
