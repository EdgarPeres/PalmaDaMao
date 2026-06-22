"use server";

import type { SuggestionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { recordAuditLog } from "@/modules/audit-log/services/audit-log.service";
import { changeSuggestionStatus } from "@/modules/suggestion/services/admin-suggestion.service";

export async function updateSuggestionStatusAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id || !isSuggestionStatus(status)) {
    return;
  }

  const session = await requireAdminSession();
  await changeSuggestionStatus(id, status);
  await recordAuditLog({
    adminId: session.user.id,
    action: "UPDATE",
    entity: "CompanySuggestion",
    entityId: id,
    metadata: { status }
  });
  revalidatePath("/admin/sugestoes");
  revalidatePath("/admin/logs");
}

function isSuggestionStatus(value: string): value is SuggestionStatus {
  return value === "PENDING" || value === "CONVERTED" || value === "IGNORED";
}
