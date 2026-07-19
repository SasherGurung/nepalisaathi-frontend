import { z } from "zod";

export const step1Schema = z.object({
  province: z.string().trim().min(1, {message: "Please select a province."}),
  district: z.string().trim().min(1, {message: "Please select a district."}),
  municipality: z.string().trim().min(1, {message: "Please select a municipality"}),
})

export const step2Schema = z.object({
  status: z.string().min(1, "Please select your current status."),
  profession: z.string().trim().min(1, "Please enter your respective profession."),
});
