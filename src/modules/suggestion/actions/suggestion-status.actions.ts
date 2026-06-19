"use server";

import type { SuggestionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { changeSuggestionStatus } from "@/modules/suggestion/services/admin-suggestion.service";

export async function updateSuggestionStatusAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id || !isSuggestionStatus(status)) {
    return;
  }

  await changeSuggestionStatus(id, status);
  revalidatePath("/admin/sugestoes");
}

function isSuggestionStatus(value: string): value is SuggestionStatus {
  return value === "PENDING" || value === "CONVERTED" || value === "IGNORED";
}
