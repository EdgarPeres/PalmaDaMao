import { prisma } from "@/lib/prisma/client";
import type { CityMutationInput } from "@/modules/city/schemas/city.schema";

export type AdminCityOption = {
  id: string;
  name: string;
  state: string;
  slug: string;
  description: string | null;
  order: number;
  active: boolean;
  companiesCount: number;
};

export async function listAdminCityOptions(): Promise<AdminCityOption[]> {
  const cities = await prisma.city.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      state: true,
      slug: true,
      description: true,
      order: true,
      active: true,
      _count: {
        select: {
          companies: true
        }
      }
    }
  });

  return cities.map((city) => ({
    id: city.id,
    name: city.name,
    state: city.state,
    slug: city.slug,
    description: city.description,
    order: city.order,
    active: city.active,
    companiesCount: city._count.companies
  }));
}

export async function createCity(input: CityMutationInput & { slug: string }): Promise<void> {
  await prisma.city.create({
    data: {
      name: input.name,
      state: input.state,
      slug: input.slug,
      description: input.description || null,
      order: input.order,
      active: input.active
    }
  });
}

export async function updateCity(input: CityMutationInput & { id: string; slug: string }): Promise<void> {
  await prisma.city.update({
    where: { id: input.id },
    data: {
      name: input.name,
      state: input.state,
      slug: input.slug,
      description: input.description || null,
      order: input.order,
      active: input.active
    }
  });
}

export async function findCityStatus(id: string): Promise<{ active: boolean } | null> {
  return prisma.city.findUnique({
    where: { id },
    select: { active: true }
  });
}

export async function countActiveCities(): Promise<number> {
  return prisma.city.count({
    where: {
      active: true
    }
  });
}

export async function toggleCityActive(id: string): Promise<void> {
  const city = await findCityStatus(id);

  if (!city) {
    return;
  }

  await prisma.city.update({
    where: { id },
    data: {
      active: !city.active
    }
  });
}
