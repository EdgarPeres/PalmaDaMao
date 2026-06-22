import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma/client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const homeEntry = [
    {
      url: `${siteUrl}/montividiu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${siteUrl}/montividiu/empresas`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9
    }
  ] satisfies MetadataRoute.Sitemap;

  try {
    const companies = await prisma.company.findMany({
      where: {
        active: true,
        deletedAt: null,
        city: {
          slug: "montividiu",
          active: true
        }
      },
      select: {
        slug: true,
        updatedAt: true
      },
      orderBy: {
        updatedAt: "desc"
      }
    });

    return [
      ...homeEntry,
      ...companies.map((company) => ({
        url: `${siteUrl}/montividiu/empresa/${company.slug}`,
        lastModified: company.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8
      }))
    ];
  } catch {
    return homeEntry;
  }
}
