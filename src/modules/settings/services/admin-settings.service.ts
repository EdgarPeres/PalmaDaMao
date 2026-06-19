import { getAdminSiteSettings, updateSiteSettings } from "@/modules/settings/repositories/admin-settings.repository";
import type { SiteSettingsMutationInput } from "@/modules/settings/schemas/settings.schema";

export async function getEditableSiteSettings() {
  try {
    return await getAdminSiteSettings();
  } catch {
    return null;
  }
}

export async function saveSiteSettings(input: SiteSettingsMutationInput): Promise<void> {
  await updateSiteSettings(input);
}
