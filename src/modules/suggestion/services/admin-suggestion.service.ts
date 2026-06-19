import type { SuggestionStatus } from "@prisma/client";
import {
  listAdminSuggestions,
  updateSuggestionStatus
} from "@/modules/suggestion/repositories/admin-suggestion.repository";

export async function getAdminSuggestions() {
  try {
    return await listAdminSuggestions();
  } catch {
    return [];
  }
}

export async function changeSuggestionStatus(id: string, status: SuggestionStatus): Promise<void> {
  await updateSuggestionStatus(id, status);
}
