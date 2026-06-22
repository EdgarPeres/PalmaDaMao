"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { recordAuditLog } from "@/modules/audit-log/services/audit-log.service";
import { changeCategoryGroupStatus, saveCategoryGroup } from "@/modules/category-group/services/admin-category-group.service";
import { categoryGroupMutationSchema } from "@/modules/category-group/schemas/category-group.schema";

export type CategoryGroupActionState = {
  ok: boolean;
  message: string;
};

export async function saveCategoryGroupAction(
  _state: CategoryGroupActionState,
  formData: FormData
): Promise<CategoryGroupActionState> {
  const parsed = categoryGroupMutationSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    icon: formData.get("icon") || undefined,
    color: formData.get("color") || undefined,
    order: formData.get("order"),
    active: formData.get("active") === "on"
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Revise os dados enviados."
    };
  }

  try {
    const session = await requireAdminSession();
    await saveCategoryGroup(parsed.data);
    await recordAuditLog({
      adminId: session.user.id,
      action: parsed.data.id ? "UPDATE" : "CREATE",
      entity: "CategoryGroup",
      entityId: parsed.data.id || null,
      metadata: {
        name: parsed.data.name,
        active: parsed.data.active
      }
    });
    revalidatePath("/admin/grupos");
    revalidatePath("/admin/logs");
    revalidatePath("/montividiu");

    return {
      ok: true,
      message: parsed.data.id ? "Grupo atualizado." : "Grupo criado."
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel salvar o grupo. Verifique se ja existe um grupo com esse nome."
    };
  }
}

export async function toggleCategoryGroupActiveAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const session = await requireAdminSession();
  await changeCategoryGroupStatus(id);
  await recordAuditLog({
    adminId: session.user.id,
    action: "UPDATE",
    entity: "CategoryGroup",
    entityId: id,
    metadata: { statusChanged: true }
  });
  revalidatePath("/admin/grupos");
  revalidatePath("/admin/logs");
  revalidatePath("/montividiu");
}
