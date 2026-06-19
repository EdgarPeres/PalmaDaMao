import { prisma } from "@/lib/prisma/client";
import type { PublicCity } from "@/modules/city/types/public-city";

export async function getActiveCityBySlug(slug: string): Promise<PublicCity | null> {
  return prisma.city.findFirst({
    where: {
      slug,
      active: true
    },
    select: {
      id: true,
      name: true,
      state: true,
      slug: true,
      description: true
    }
  });
}
