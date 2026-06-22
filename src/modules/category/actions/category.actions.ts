"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { recordAuditLog } from "@/modules/audit-log/services/audit-log.service";
import { changeCategoryStatus, saveCategory } from "@/modules/category/services/admin-category.service";
import { categoryMutationSchema } from "@/modules/category/schemas/category.schema";

export type CategoryActionState = {
  ok: boolean;
  message: string;
};

export async function saveCategoryAction(
  _state: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  const parsed = categoryMutationSchema.safeParse({
    id: formData.get("id") || undefined,
    groupId: formData.get("groupId"),
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
    await saveCategory(parsed.data);
    await recordAuditLog({
      adminId: session.user.id,
      action: parsed.data.id ? "UPDATE" : "CREATE",
      entity: "Category",
      entityId: parsed.data.id || null,
      metadata: {
        name: parsed.data.name,
        active: parsed.data.active
      }
    });
    revalidatePath("/admin/categorias");
    revalidatePath("/admin/logs");
    revalidatePath("/montividiu");

    return {
      ok: true,
      message: parsed.data.id ? "Categoria atualizada." : "Categoria criada."
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel salvar a categoria. Verifique se ja existe uma categoria com esse nome."
    };
  }
}

export async function toggleCategoryActiveAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const session = await requireAdminSession();
  await changeCategoryStatus(id);
  await recordAuditLog({
    adminId: session.user.id,
    action: "UPDATE",
    entity: "Category",
    entityId: id,
    metadata: { statusChanged: true }
  });
  revalidatePath("/admin/categorias");
  revalidatePath("/admin/logs");
  revalidatePath("/montividiu");
}
