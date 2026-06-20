"use server";

import { revalidatePath } from "next/cache";
import { changeAdminUserStatus, saveAdminUser } from "@/modules/admin-user/services/admin-user.service";
import { adminUserMutationSchema } from "@/modules/admin-user/schemas/admin-user.schema";

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
    await saveAdminUser(parsed.data);
    revalidatePath("/admin/usuarios");

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

  await changeAdminUserStatus(id);
  revalidatePath("/admin/usuarios");
}
