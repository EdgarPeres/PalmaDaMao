import { z } from "zod";

const optionalTextSchema = z.string().trim().optional().or(z.literal(""));

export const categoryMutationSchema = z.object({
  id: optionalTextSchema,
  groupId: z.string().trim().min(1, "Selecione um grupo."),
  name: z.string().trim().min(2, "Informe o nome da categoria."),
  icon: optionalTextSchema,
  color: optionalTextSchema,
  order: z.coerce.number().int().min(0, "A ordem deve ser zero ou maior."),
  active: z.coerce.boolean().default(true)
});

export type CategoryMutationInput = z.infer<typeof categoryMutationSchema>;
