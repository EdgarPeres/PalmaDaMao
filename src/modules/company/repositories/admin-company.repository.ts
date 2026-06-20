import { prisma } from "@/lib/prisma/client";
import type { CompanyMutationInput } from "@/modules/company/schemas/company.schema";

export type AdminCompany = {
  id: string;
  cityId: string;
  cityName: string;
  name: string;
  slug: string;
  description: string;
  neighborhood: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  whatsapp: string | null;
  phone: string | null;
  instagram: string | null;
  website: string | null;
  mainLink: string | null;
  active: boolean;
  featured: boolean;
  featuredOrder: number | null;
  categoryIds: string[];
  categoriesLabel: string;
  photosText: string;
  schedules: Array<{
    dayOfWeek: number;
    openTime: string | null;
    closeTime: string | null;
    closed: boolean;
  }>;
};

export async function listAdminCompanies(): Promise<AdminCompany[]> {
  const companies = await prisma.company.findMany({
    where: { deletedAt: null },
    orderBy: [{ name: "asc" }],
    select: {
      id: true,
      cityId: true,
      name: true,
      slug: true,
      description: true,
      neighborhood: true,
      logoUrl: true,
      bannerUrl: true,
      whatsapp: true,
      phone: true,
      instagram: true,
      website: true,
      mainLink: true,
      active: true,
      featured: true,
      featuredOrder: true,
      city: { select: { name: true } },
      categories: {
        select: {
          categoryId: true,
          category: { select: { name: true } }
        }
      },
      photos: {
        orderBy: { order: "asc" },
        select: {
          imageUrl: true
        }
      },
      schedules: {
        orderBy: { dayOfWeek: "asc" },
        select: {
          dayOfWeek: true,
          openTime: true,
          closeTime: true,
          closed: true
        }
      }
    }
  });

  return companies.map((company) => ({
    id: company.id,
    cityId: company.cityId,
    cityName: company.city.name,
    name: company.name,
    slug: company.slug,
    description: company.description,
    neighborhood: company.neighborhood,
    logoUrl: company.logoUrl,
    bannerUrl: company.bannerUrl,
    whatsapp: company.whatsapp,
    phone: company.phone,
    instagram: company.instagram,
    website: company.website,
    mainLink: company.mainLink,
    active: company.active,
    featured: company.featured,
    featuredOrder: company.featuredOrder,
    categoryIds: company.categories.map((category) => category.categoryId),
    categoriesLabel: company.categories.map(({ category }) => category.name).join(", "),
    photosText: company.photos.map((photo) => photo.imageUrl).join("\n"),
    schedules: company.schedules
  }));
}

export async function createCompany(input: CompanyMutationInput & { slug: string }): Promise<void> {
  await prisma.company.create({
    data: {
      cityId: input.cityId,
      name: input.name,
      slug: input.slug,
      description: input.description,
      neighborhood: input.neighborhood || null,
      logoUrl: input.logoUrl || null,
      bannerUrl: input.bannerUrl || null,
      whatsapp: input.whatsapp || null,
      phone: input.phone || null,
      instagram: input.instagram || null,
      website: input.website || null,
      mainLink: input.mainLink || null,
      active: input.active,
      featured: input.featured,
      featuredOrder: input.featuredOrder || null,
      categories: {
        createMany: {
          data: input.categoryIds.map((categoryId) => ({ categoryId }))
        }
      },
      photos: {
        createMany: {
          data: input.photos
            .filter((photo) => photo.imageUrl)
            .map((photo, index) => ({
              imageUrl: String(photo.imageUrl),
              order: photo.order || index
            }))
        }
      },
      schedules: {
        createMany: {
          data: input.schedules.map((schedule) => ({
            dayOfWeek: schedule.dayOfWeek,
            openTime: schedule.closed ? null : schedule.openTime || null,
            closeTime: schedule.closed ? null : schedule.closeTime || null,
            closed: schedule.closed
          }))
        }
      }
    }
  });
}

export async function updateCompany(input: CompanyMutationInput & { id: string; slug: string }): Promise<void> {
  await prisma.$transaction([
    prisma.companyCategory.deleteMany({ where: { companyId: input.id } }),
    prisma.companyPhoto.deleteMany({ where: { companyId: input.id } }),
    prisma.companySchedule.deleteMany({ where: { companyId: input.id } }),
    prisma.company.update({
      where: { id: input.id },
      data: {
        cityId: input.cityId,
        name: input.name,
        slug: input.slug,
        description: input.description,
        neighborhood: input.neighborhood || null,
        logoUrl: input.logoUrl || null,
        bannerUrl: input.bannerUrl || null,
        whatsapp: input.whatsapp || null,
        phone: input.phone || null,
        instagram: input.instagram || null,
        website: input.website || null,
        mainLink: input.mainLink || null,
        active: input.active,
        featured: input.featured,
        featuredOrder: input.featuredOrder || null,
        categories: {
          createMany: {
            data: input.categoryIds.map((categoryId) => ({ categoryId }))
          }
        },
        photos: {
          createMany: {
            data: input.photos
              .filter((photo) => photo.imageUrl)
              .map((photo, index) => ({
                imageUrl: String(photo.imageUrl),
                order: photo.order || index
              }))
          }
        },
        schedules: {
          createMany: {
            data: input.schedules.map((schedule) => ({
              dayOfWeek: schedule.dayOfWeek,
              openTime: schedule.closed ? null : schedule.openTime || null,
              closeTime: schedule.closed ? null : schedule.closeTime || null,
              closed: schedule.closed
            }))
          }
        }
      }
    })
  ]);
}

export async function softDeleteCompany(id: string): Promise<void> {
  await prisma.company.update({
    where: { id },
    data: {
      active: false,
      deletedAt: new Date()
    }
  });
}

export async function toggleCompanyActive(id: string): Promise<void> {
  const company = await prisma.company.findUnique({ where: { id }, select: { active: true } });

  if (!company) {
    return;
  }

  await prisma.company.update({ where: { id }, data: { active: !company.active } });
}

export async function toggleCompanyFeatured(id: string): Promise<void> {
  const company = await prisma.company.findUnique({ where: { id }, select: { featured: true } });

  if (!company) {
    return;
  }

  await prisma.company.update({ where: { id }, data: { featured: !company.featured } });
}

export async function updateCompanyHighlight(
  id: string,
  input: {
    featured: boolean;
    featuredOrder: number | null;
  }
): Promise<void> {
  await prisma.company.update({
    where: { id },
    data: input
  });
}
