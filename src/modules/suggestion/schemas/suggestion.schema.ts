import { z } from "zod";

export const createSuggestionSchema = z.object({
  name: z.string().trim().min(2, "Informe o nome da empresa."),
  category: z.string().trim().min(2, "Informe a categoria."),
  phone: z.string().trim().min(8, "Informe um telefone valido."),
  honeypot: z.string().max(0).optional().or(z.literal(""))
});

export type CreateSuggestionInput = z.infer<typeof createSuggestionSchema>;
