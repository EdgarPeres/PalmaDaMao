import { z } from "zod";

const optionalUrlSchema = z
  .string()
  .trim()
  .url("Informe uma URL válida.")
  .optional()
  .or(z.literal(""));

const optionalTextSchema = z.string().trim().optional().or(z.literal(""));

export const companyContactSchema = z
  .object({
    whatsapp: optionalTextSchema,
    instagram: optionalTextSchema,
    website: optionalUrlSchema,
    mainLink: optionalUrlSchema
  })
  .refine((data) => Boolean(data.whatsapp || data.instagram || data.website || data.mainLink), {
    message: "Informe pelo menos um canal de contato.",
    path: ["whatsapp"]
  });

export const companyMutationSchema = companyContactSchema.extend({
  id: optionalTextSchema,
  name: z.string().trim().min(2, "Informe o nome da empresa."),
  cityId: z.string().trim().min(1, "Informe a cidade."),
  description: z
    .string()
    .trim()
    .min(50, "A descrição deve ter pelo menos 50 caracteres.")
    .max(1000, "A descrição deve ter no máximo 1000 caracteres."),
  neighborhood: optionalTextSchema,
  phone: optionalTextSchema,
  logoUrl: optionalUrlSchema,
  bannerUrl: optionalUrlSchema,
  active: z.coerce.boolean().default(true),
  featured: z.coerce.boolean().default(false),
  featuredOrder: z.coerce.number().int().positive().optional().nullable().or(z.literal("")),
  categoryIds: z.array(z.string().trim().min(1)).min(1, "Selecione ao menos uma categoria.")
});

export type CompanyMutationInput = z.infer<typeof companyMutationSchema>;
