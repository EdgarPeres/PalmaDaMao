"use server";

import { revalidatePath } from "next/cache";
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
    await saveBanner(parsed.data);
    revalidatePath("/admin/banners");
    revalidatePath("/montividiu");
    return {
      ok: true,
      message: parsed.data.id ? "Banner atualizado." : "Banner criado."
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível salvar. O limite é de 5 banners ativos."
    };
  }
}

export async function deleteBannerAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await removeBanner(id);
  revalidatePath("/admin/banners");
  revalidatePath("/montividiu");
}
