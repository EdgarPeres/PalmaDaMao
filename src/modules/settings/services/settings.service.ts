import { getSiteSettings } from "@/modules/settings/repositories/settings.repository";
import type { PublicSiteSettings } from "@/modules/settings/types/site-settings";

const fallbackSettings: PublicSiteSettings = {
  siteName: "Palma da Mão",
  slogan: "As melhores empresas da sua cidade em um só lugar.",
  primaryColor: "#0069FC",
  homeText: "Encontre empresas locais em Montividiu.",
  footerText: "Palma da Mão",
  maintenanceMode: false
};

export async function getPublicSiteSettings(): Promise<PublicSiteSettings> {
  try {
    return (await getSiteSettings()) ?? fallbackSettings;
  } catch {
    return fallbackSettings;
  }
}
