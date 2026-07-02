import { z } from "zod";

export const ChangePasswordSchema = z.object({
  currentpassword: z.string().trim().min(6, "Current password is incorrect"),
  newpassword: z.string().trim().min(6, "Current password is incorrect"),
  confirmPassword: z.string().trim().min(6, "Confirm your password"),
});
