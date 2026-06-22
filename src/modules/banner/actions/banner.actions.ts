"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { recordAuditLog } from "@/modules/audit-log/services/audit-log.service";
import { saveBanner, removeBanner } from "@/modules/banner/services/admin-banner.service";
import { bannerMutationSchema } from "@/modules/banner/schemas/banner.schema";

export type BannerActionState = {
  ok: boolean;
  message: string;
};

export async function saveBannerAction(
  _state: BannerActionState,
  formData: FormData
): Promise<BannerActionState> {
  const parsed = bannerMutationSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    imageUrl: formData.get("imageUrl"),
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
    await saveBanner(parsed.data);
    await recordAuditLog({
      adminId: session.user.id,
      action: parsed.data.id ? "UPDATE" : "CREATE",
      entity: "Banner",
      entityId: parsed.data.id || null,
      metadata: {
        title: parsed.data.title,
        active: parsed.data.active
      }
    });
    revalidatePath("/admin/banners");
    revalidatePath("/admin/logs");
    revalidatePath("/montividiu");
    return {
      ok: true,
      message: parsed.data.id ? "Banner atualizado." : "Banner criado."
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel salvar. O limite e de 5 banners ativos."
    };
  }
}

export async function deleteBannerAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const session = await requireAdminSession();
  await removeBanner(id);
  await recordAuditLog({
    adminId: session.user.id,
    action: "DELETE",
    entity: "Banner",
    entityId: id,
    metadata: { physicalDelete: true }
  });
  revalidatePath("/admin/banners");
  revalidatePath("/admin/logs");
  revalidatePath("/montividiu");
}
