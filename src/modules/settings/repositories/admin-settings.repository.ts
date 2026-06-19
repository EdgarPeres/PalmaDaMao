import { prisma } from "@/lib/prisma/client";
import type { SiteSettingsMutationInput } from "@/modules/settings/schemas/settings.schema";

export type AdminSiteSettings = Omit<
  SiteSettingsMutationInput,
  "logoUrl" | "faviconUrl" | "supportWhatsapp" | "officialInstagram" | "homeText" | "footerText"
> & {
  id: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  supportWhatsapp: string | null;
  officialInstagram: string | null;
  homeText: string | null;
  footerText: string | null;
};

export async function getAdminSiteSettings(): Promise<AdminSiteSettings | null> {
  return prisma.siteSettings.findFirst({
    select: {
      id: true,
      siteName: true,
      slogan: true,
      logoUrl: true,
      faviconUrl: true,
      primaryColor: true,
      defaultCityId: true,
      supportWhatsapp: true,
      officialInstagram: true,
      homeText: true,
      footerText: true,
      maintenanceMode: true
    }
  });
}

export async function updateSiteSettings(input: SiteSettingsMutationInput): Promise<void> {
  const current = await prisma.siteSettings.findFirst({
    select: {
      id: true
    }
  });

  if (!current) {
    await prisma.siteSettings.create({
      data: {
        ...input,
        logoUrl: input.logoUrl || null,
        faviconUrl: input.faviconUrl || null,
        supportWhatsapp: input.supportWhatsapp || null,
        officialInstagram: input.officialInstagram || null,
        homeText: input.homeText || null,
        footerText: input.footerText || null
      }
    });
    return;
  }

  await prisma.siteSettings.update({
    where: {
      id: current.id
    },
    data: {
      ...input,
      logoUrl: input.logoUrl || null,
      faviconUrl: input.faviconUrl || null,
      supportWhatsapp: input.supportWhatsapp || null,
      officialInstagram: input.officialInstagram || null,
      homeText: input.homeText || null,
      footerText: input.footerText || null
    }
  });
}
