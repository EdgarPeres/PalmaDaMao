import { prisma } from "@/lib/prisma/client";
import type { PublicCategoryGroup } from "@/modules/category-group/types/public-category-group";

export async function listActiveCategoryGroups(): Promise<PublicCategoryGroup[]> {
  return prisma.categoryGroup.findMany({
    where: {
      active: true
    },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      icon: true,
      color: true
    }
  });
}
