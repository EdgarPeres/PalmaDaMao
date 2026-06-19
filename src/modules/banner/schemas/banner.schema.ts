import { z } from "zod";

const optionalTextSchema = z.string().trim().optional().or(z.literal(""));

export const bannerMutationSchema = z.object({
  id: optionalTextSchema,
  title: z.string().trim().min(2, "Informe o título do banner."),
  imageUrl: z.string().trim().min(1, "Informe a imagem do banner."),
  order: z.coerce.number().int().min(0, "A ordem deve ser zero ou maior."),
  active: z.coerce.boolean().default(true)
});

export type BannerMutationInput = z.infer<typeof bannerMutationSchema>;
