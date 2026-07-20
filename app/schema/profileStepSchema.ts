import { z } from "zod";

export const step1Schema = z.object({
  // province: z.string().trim().min(1, {message: "Please select a province."}),
  // district: z.string().trim().min(1, {message: "Please select a district."}),
  // municipality: z.string().trim().min(1, {message: "Please select a municipality"}),
})

export const step2Schema = z.object({
  // status: z.string().trim().min(1, {message: "Please select your current status."}),
  // profession: z.string().trim().min(1, {message: "Please enter your respective profession."}),
});

export const step4Schema = z.object({
  // bio: z.string().trim().min(1, {message: "Please enter your respective profession."}),
});