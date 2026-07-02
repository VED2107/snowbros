import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name.").max(120),
  email: z.string().email("Please enter a valid email."),
  company: z.string().max(160).optional().or(z.literal("")),
  projectType: z.string().max(60).optional().or(z.literal("")),
  budget: z.string().max(60).optional().or(z.literal("")),
  timeline: z.string().max(60).optional().or(z.literal("")),
  message: z
    .string()
    .min(20, "Tell us a little more — at least 20 characters.")
    .max(4000),
  // Honeypot — must stay empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResult = { ok: true } | { ok: false; error: string };
