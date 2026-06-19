import { prisma } from "@/lib/prisma/client";
import type { CategoryMutationInput } from "@/modules/category/schemas/category.schema";

export type AdminCategory = {
  id: string;
  groupId: string;
  groupName: string;
  name: string;
  slug: string;
  icon: string | null;
  color: string | null;
  order: number;
  active: boolean;
  companiesCount: number;
};

export async function listAdminCategories(): Promise<AdminCategory[]> {
  const categories = await prisma.category.findMany({
    orderBy: [{ group: { order: "asc" } }, { order: "asc" }, { name: "asc" }],
    select: {
      id: true,
      groupId: true,
      name: true,
      slug: true,
      icon: true,
      color: true,
      order: true,
      active: true,
      group: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          companies: true
        }
      }
    }
  });

  return categories.map((category) => ({
    id: category.id,
    groupId: category.groupId,
    groupName: category.group.name,
    name: category.name,
    slug: category.slug,
    icon: category.icon,
    color: category.color,
    order: category.order,
    active: category.active,
    companiesCount: category._count.companies
  }));
}

export async function createCategory(input: CategoryMutationInput & { slug: string }): Promise<void> {
  await prisma.category.create({
    data: {
      groupId: input.groupId,
      name: input.name,
      slug: input.slug,
      icon: input.icon || null,
      color: input.color || null,
      order: input.order,
      active: input.active
    }
  });
}

export async function updateCategory(input: CategoryMutationInput & { id: string; slug: string }): Promise<void> {
  await prisma.category.update({
    where: {
      id: input.id
    },
    data: {
      groupId: input.groupId,
      name: input.name,
      slug: input.slug,
      icon: input.icon || null,
      color: input.color || null,
      order: input.order,
      active: input.active
    }
  });
}

export async function toggleCategoryActive(id: string): Promise<void> {
  const category = await prisma.category.findUnique({
    where: { id },
    select: { active: true }
  });

  if (!category) {
    return;
  }

  await prisma.category.update({
    where: { id },
    data: {
      active: !category.active
    }
  });
}
