import { slugify } from "@/lib/utils/slugify";
import {
  createCategory,
  listAdminCategories,
  toggleCategoryActive,
  updateCategory
} from "@/modules/category/repositories/admin-category.repository";
import type { CategoryMutationInput } from "@/modules/category/schemas/category.schema";

export async function getAdminCategories() {
  try {
    return await listAdminCategories();
  } catch {
    return [];
  }
}

export async function saveCategory(input: CategoryMutationInput): Promise<void> {
  const slug = slugify(input.name);

  if (input.id) {
    await updateCategory({ ...input, id: input.id, slug });
    return;
  }

  await createCategory({ ...input, slug });
}

export async function changeCategoryStatus(id: string): Promise<void> {
  await toggleCategoryActive(id);
}
