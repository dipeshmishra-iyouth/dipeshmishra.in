import { z } from "zod";
import { TOPICS } from "./contact-topics";

// Server-side validation; the form's maxLength attributes mirror these limits.
export const contactSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.email().max(120),
  phone: z.union([z.literal(""), z.string().regex(/^\+?[\d\s-]{7,20}$/)]),
  topic: z.enum(TOPICS),
  message: z.string().min(10).max(2000),
});
