"use server";

import { revalidatePath } from "next/cache";
import { createSuggestion } from "@/modules/suggestion/repositories/suggestion.repository";
import { createSuggestionSchema } from "@/modules/suggestion/schemas/suggestion.schema";

export type CreateSuggestionState = {
  ok: boolean;
  message: string;
};

export async function createSuggestionAction(
  _state: CreateSuggestionState,
  formData: FormData
): Promise<CreateSuggestionState> {
  const parsed = createSuggestionSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    phone: formData.get("phone"),
    honeypot: formData.get("company")
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Revise os dados enviados."
    };
  }

  if (parsed.data.honeypot) {
    return {
      ok: true,
      message: "Sugestao recebida."
    };
  }

  try {
    await createSuggestion(parsed.data);
    revalidatePath("/admin/sugestoes");
    return {
      ok: true,
      message: "Sugestao recebida."
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel enviar a sugestao agora."
    };
  }
}
