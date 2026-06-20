"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { changeAdminUserStatus, saveAdminUser } from "@/modules/admin-user/services/admin-user.service";
import { adminUserMutationSchema } from "@/modules/admin-user/schemas/admin-user.schema";
import { recordAuditLog } from "@/modules/audit-log/services/audit-log.service";

export type AdminUserActionState = {
  ok: boolean;
  message: string;
};

export async function saveAdminUserAction(
  _state: AdminUserActionState,
  formData: FormData
): Promise<AdminUserActionState> {
  const parsed = adminUserMutationSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password") || undefined,
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
    await saveAdminUser(parsed.data);
    await recordAuditLog({
      adminId: session.user.id,
      action: parsed.data.id ? "UPDATE" : "CREATE",
      entity: "UserAdmin",
      entityId: parsed.data.id ?? null,
      metadata: {
        email: parsed.data.email,
        active: parsed.data.active
      }
    });

    revalidatePath("/admin/usuarios");
    revalidatePath("/admin/logs");

    return {
      ok: true,
      message: parsed.data.id ? "Administrador atualizado." : "Administrador criado."
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel salvar o administrador. Verifique se o e-mail ja esta em uso."
    };
  }
}

export async function toggleAdminUserActiveAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const session = await requireAdminSession();
  await changeAdminUserStatus(id);
  await recordAuditLog({
    adminId: session.user.id,
    action: "UPDATE",
    entity: "UserAdmin",
    entityId: id,
    metadata: {
      statusChanged: true
    }
  });

  revalidatePath("/admin/usuarios");
  revalidatePath("/admin/logs");
}
