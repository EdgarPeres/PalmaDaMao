import { prisma } from "@/lib/prisma/client";
import type { PublicSiteSettings } from "@/modules/settings/types/site-settings";

export async function getSiteSettings(): Promise<PublicSiteSettings | null> {
  return prisma.siteSettings.findFirst({
    select: {
      siteName: true,
      slogan: true,
      primaryColor: true,
      homeText: true,
      footerText: true,
      maintenanceMode: true
    }
  });
}
