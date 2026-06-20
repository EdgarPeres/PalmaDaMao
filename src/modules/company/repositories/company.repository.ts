import { prisma } from "@/lib/prisma/client";
import { PUBLIC_COMPANY_SELECT } from "@/modules/company/constants";
import {
  toPublicCompanyCard,
  toPublicCompanyDetail,
  type PublicCompanyCard,
  type PublicCompanyDetail
} from "@/modules/company/types/public-company";

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

export async function getCompanyBySlug(
  citySlug: string,
  companySlug: string
): Promise<PublicCompanyDetail | null> {
  const company = await prisma.company.findFirst({
    where: {
      slug: companySlug,
      active: true,
      deletedAt: null,
      city: {
        slug: citySlug,
        active: true
      }
    },
    select: {
      ...PUBLIC_COMPANY_SELECT,
      description: true,
      whatsapp: true,
      phone: true,
      instagram: true,
      website: true,
      mainLink: true,
      photos: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          imageUrl: true,
          order: true
        }
      },
      schedules: {
        orderBy: { dayOfWeek: "asc" },
        select: {
          id: true,
          dayOfWeek: true,
          openTime: true,
          closeTime: true,
          closed: true
        }
      }
    }
  });

  return company ? toPublicCompanyDetail(company) : null;
}
