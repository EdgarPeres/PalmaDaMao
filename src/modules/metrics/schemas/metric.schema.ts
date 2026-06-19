import { z } from "zod";

export const clickEventTypeSchema = z.enum(["VIEW", "WHATSAPP", "INSTAGRAM", "MAIN_LINK"]);

export const registerMetricSchema = z.object({
  companyId: z.string().trim().min(1),
  type: clickEventTypeSchema,
  sessionId: z.string().trim().min(8).max(120)
});

export type RegisterMetricInput = z.infer<typeof registerMetricSchema>;
