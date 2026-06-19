import { z } from "zod";

const optionalTextSchema = z.string().trim().optional().or(z.literal(""));

export const categoryGroupMutationSchema = z.object({
  id: optionalTextSchema,
  name: z.string().trim().min(2, "Informe o nome do grupo."),
  icon: optionalTextSchema,
  color: optionalTextSchema,
  order: z.coerce.number().int().min(0, "A ordem deve ser zero ou maior."),
  active: z.coerce.boolean().default(true)
});

export type CategoryGroupMutationInput = z.infer<typeof categoryGroupMutationSchema>;
