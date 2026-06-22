"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { recordAuditLog } from "@/modules/audit-log/services/audit-log.service";
import { cityMutationSchema } from "@/modules/city/schemas/city.schema";
import { changeCityStatus, saveCity } from "@/modules/city/services/admin-city.service";

export type CityActionState = {
  ok: boolean;
  message: string;
};

export async function saveCityAction(
  _state: CityActionState,
  formData: FormData
): Promise<CityActionState> {
  const parsed = cityMutationSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    state: formData.get("state"),
    description: formData.get("description") || undefined,
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
    await saveCity(parsed.data);
    await recordAuditLog({
      adminId: session.user.id,
      action: parsed.data.id ? "UPDATE" : "CREATE",
      entity: "City",
      entityId: parsed.data.id || null,
      metadata: {
        name: parsed.data.name,
        state: parsed.data.state,
        active: parsed.data.active
      }
    });

    revalidatePath("/admin/cidades");
    revalidatePath("/admin/configuracoes");
    revalidatePath("/admin/empresas");
    revalidatePath("/admin/logs");

    return {
      ok: true,
      message: parsed.data.id ? "Cidade atualizada." : "Cidade criada."
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel salvar a cidade. Verifique se ja existe uma cidade com esse nome."
    };
  }
}

export async function toggleCityActiveAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const session = await requireAdminSession();
  await changeCityStatus(id);
  await recordAuditLog({
    adminId: session.user.id,
    action: "UPDATE",
    entity: "City",
    entityId: id,
    metadata: { statusChanged: true }
  });

  revalidatePath("/admin/cidades");
  revalidatePath("/admin/configuracoes");
  revalidatePath("/admin/empresas");
  revalidatePath("/admin/logs");
}
