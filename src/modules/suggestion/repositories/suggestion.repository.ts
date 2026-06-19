import { prisma } from "@/lib/prisma/client";
import type { CreateSuggestionInput } from "@/modules/suggestion/schemas/suggestion.schema";

export async function createSuggestion(input: CreateSuggestionInput): Promise<void> {
  await prisma.companySuggestion.create({
    data: {
      name: input.name,
      category: input.category,
      phone: input.phone
    }
  });
}
