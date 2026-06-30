import { z } from "zod";

export const step1Schema = z.object({
  homeCity: z.string().trim().min(1, "Please enter your home or district in Nepal."),
});

export const step2Schema = z.object({
  status: z.string().min(1, "Please select your current status."),
  profession: z.string().trim().min(1, "Please enter your respective profession."),
});

export const step3Schema = z.object({
  
})
