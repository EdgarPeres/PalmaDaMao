import { prisma } from "@/lib/prisma/client";
import { PUBLIC_COMPANY_SELECT } from "@/modules/company/constants";
import { toPublicCompanyCard, type PublicCompanyCard } from "@/modules/company/types/public-company";

export async function listFeaturedCompanies(citySlug: string): Promise<PublicCompanyCard[]> {
  const companies = await prisma.company.findMany({
    where: {
      active: true,
      deletedAt: null,
      featured: true,
      city: {
        slug: citySlug,
        active: true
      }
    },
    orderBy: [{ featuredOrder: "asc" }, { name: "asc" }],
    take: 8,
    select: PUBLIC_COMPANY_SELECT
  });

  return companies.map(toPublicCompanyCard);
}

export async function listRecentCompanies(citySlug: string): Promise<PublicCompanyCard[]> {
  const companies = await prisma.company.findMany({
    where: {
      active: true,
      deletedAt: null,
      city: {
        slug: citySlug,
        active: true
      }
    },
    orderBy: { createdAt: "desc" },
    take: 8,
    select: PUBLIC_COMPANY_SELECT
  });

  return companies.map(toPublicCompanyCard);
}

export async function searchCompanies(citySlug: string, query: string): Promise<PublicCompanyCard[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const companies = await prisma.company.findMany({
    where: {
      active: true,
      deletedAt: null,
      city: {
        slug: citySlug,
        active: true
      },
      OR: [
        {
          name: {
            contains: trimmedQuery,
            mode: "insensitive"
          }
        },
        {
          categories: {
            some: {
              category: {
                name: {
                  contains: trimmedQuery,
                  mode: "insensitive"
                }
              }
            }
          }
        }
      ]
    },
    orderBy: { name: "asc" },
    take: 20,
    select: PUBLIC_COMPANY_SELECT
  });

  return companies.map(toPublicCompanyCard);
}
