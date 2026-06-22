import { z } from "zod";

const optionalTextSchema = z.string().trim().optional().or(z.literal(""));

export const cityMutationSchema = z.object({
  id: optionalTextSchema,
  name: z.string().trim().min(2, "Informe o nome da cidade."),
  state: z.string().trim().length(2, "Informe a UF com 2 letras.").toUpperCase(),
  description: optionalTextSchema,
  order: z.coerce.number().int().min(0, "A ordem deve ser zero ou maior."),
  active: z.coerce.boolean().default(true)
});

export type CityMutationInput = z.infer<typeof cityMutationSchema>;
