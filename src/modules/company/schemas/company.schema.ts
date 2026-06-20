import { z } from "zod";

const optionalUrlSchema = z
  .string()
  .trim()
  .url("Informe uma URL valida.")
  .optional()
  .or(z.literal(""));

const optionalImagePathSchema = z
  .string()
  .trim()
  .refine((value) => !value || value.startsWith("/uploads/") || z.string().url().safeParse(value).success, {
    message: "Informe uma URL valida ou um caminho em /uploads/."
  })
  .optional()
  .or(z.literal(""));

const optionalTextSchema = z.string().trim().optional().or(z.literal(""));

const companyPhotoSchema = z.object({
  imageUrl: optionalImagePathSchema,
  order: z.coerce.number().int().min(0).default(0)
});

const companyScheduleSchema = z.object({
  dayOfWeek: z.coerce.number().int().min(0).max(6),
  openTime: optionalTextSchema,
  closeTime: optionalTextSchema,
  closed: z.boolean()
});

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
    .min(50, "A descricao deve ter pelo menos 50 caracteres.")
    .max(1000, "A descricao deve ter no maximo 1000 caracteres."),
  neighborhood: optionalTextSchema,
  phone: optionalTextSchema,
  logoUrl: optionalImagePathSchema,
  bannerUrl: optionalImagePathSchema,
  active: z.coerce.boolean().default(true),
  featured: z.coerce.boolean().default(false),
  featuredOrder: z.coerce.number().int().positive().optional().nullable().or(z.literal("")),
  categoryIds: z.array(z.string().trim().min(1)).min(1, "Selecione ao menos uma categoria."),
  photos: z
    .array(companyPhotoSchema)
    .max(20, "A galeria deve ter no maximo 20 imagens.")
    .default([]),
  schedules: z.array(companyScheduleSchema).max(7).default([])
});

export type CompanyMutationInput = z.infer<typeof companyMutationSchema>;
