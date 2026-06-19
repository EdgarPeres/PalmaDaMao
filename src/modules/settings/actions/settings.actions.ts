"use server";

import { revalidatePath } from "next/cache";
import { saveSiteSettings } from "@/modules/settings/services/admin-settings.service";
import { siteSettingsMutationSchema } from "@/modules/settings/schemas/settings.schema";

export type SettingsActionState = {
  ok: boolean;
  message: string;
};

export async function saveSettingsAction(
  _state: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const parsed = siteSettingsMutationSchema.safeParse({
    siteName: formData.get("siteName"),
    slogan: formData.get("slogan"),
    logoUrl: formData.get("logoUrl") || undefined,
    faviconUrl: formData.get("faviconUrl") || undefined,
    primaryColor: formData.get("primaryColor"),
    defaultCityId: formData.get("defaultCityId"),
    supportWhatsapp: formData.get("supportWhatsapp") || undefined,
    officialInstagram: formData.get("officialInstagram") || undefined,
    homeText: formData.get("homeText") || undefined,
    footerText: formData.get("footerText") || undefined,
    maintenanceMode: formData.get("maintenanceMode") === "on"
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Revise os dados enviados."
    };
  }

  try {
    await saveSiteSettings(parsed.data);
    revalidatePath("/admin/configuracoes");
    revalidatePath("/montividiu");
    revalidatePath("/manutencao");

    return {
      ok: true,
      message: "Configurações atualizadas."
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível salvar as configurações."
    };
  }
}
