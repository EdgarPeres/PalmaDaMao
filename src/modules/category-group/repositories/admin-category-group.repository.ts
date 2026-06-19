import { prisma } from "@/lib/prisma/client";
import type { CategoryGroupMutationInput } from "@/modules/category-group/schemas/category-group.schema";

export type AdminCategoryGroup = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  color: string | null;
  order: number;
  active: boolean;
  categoriesCount: number;
};

export async function listAdminCategoryGroups(): Promise<AdminCategoryGroup[]> {
  const groups = await prisma.categoryGroup.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      icon: true,
      color: true,
      order: true,
      active: true,
      _count: {
        select: {
          categories: true
        }
      }
    }
  });

  return groups.map((group) => ({
    id: group.id,
    name: group.name,
    slug: group.slug,
    icon: group.icon,
    color: group.color,
    order: group.order,
    active: group.active,
    categoriesCount: group._count.categories
  }));
}

export async function createCategoryGroup(
  input: CategoryGroupMutationInput & { slug: string }
): Promise<void> {
  await prisma.categoryGroup.create({
    data: {
      name: input.name,
      slug: input.slug,
      icon: input.icon || null,
      color: input.color || null,
      order: input.order,
      active: input.active
    }
  });
}

export async function updateCategoryGroup(
  input: CategoryGroupMutationInput & { id: string; slug: string }
): Promise<void> {
  await prisma.categoryGroup.update({
    where: {
      id: input.id
    },
    data: {
      name: input.name,
      slug: input.slug,
      icon: input.icon || null,
      color: input.color || null,
      order: input.order,
      active: input.active
    }
  });
}

export async function toggleCategoryGroupActive(id: string): Promise<void> {
  const group = await prisma.categoryGroup.findUnique({
    where: { id },
    select: { active: true }
  });

  if (!group) {
    return;
  }

  await prisma.categoryGroup.update({
    where: { id },
    data: {
      active: !group.active
    }
  });
}
