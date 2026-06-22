import { z } from "zod";

const optionalUrlSchema = z.string().trim().url("Informe uma URL válida.").optional().or(z.literal(""));
const optionalTextSchema = z.string().trim().optional().or(z.literal(""));

export const siteSettingsMutationSchema = z.object({
  siteName: z.string().trim().min(2, "Informe o nome do portal."),
  slogan: z.string().trim().min(5, "Informe o slogan."),
  logoUrl: optionalUrlSchema,
  faviconUrl: optionalUrlSchema,
  primaryColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Informe uma cor hexadecimal válida."),
  defaultCityId: z.string().trim().min(1, "Informe a cidade padrao."),
  supportWhatsapp: optionalTextSchema,
  officialInstagram: optionalTextSchema,
  homeText: optionalTextSchema,
  footerText: optionalTextSchema,
  maintenanceMode: z.coerce.boolean().default(false)
});

export type SiteSettingsMutationInput = z.infer<typeof siteSettingsMutationSchema>;
