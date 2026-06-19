import { slugify } from "@/lib/utils/slugify";
import {
  createCategoryGroup,
  listAdminCategoryGroups,
  toggleCategoryGroupActive,
  updateCategoryGroup
} from "@/modules/category-group/repositories/admin-category-group.repository";
import type { CategoryGroupMutationInput } from "@/modules/category-group/schemas/category-group.schema";

export async function getAdminCategoryGroups() {
  try {
    return await listAdminCategoryGroups();
  } catch {
    return [];
  }
}

export async function saveCategoryGroup(input: CategoryGroupMutationInput): Promise<void> {
  const slug = slugify(input.name);

  if (input.id) {
    await updateCategoryGroup({ ...input, id: input.id, slug });
    return;
  }

  await createCategoryGroup({ ...input, slug });
}

export async function changeCategoryGroupStatus(id: string): Promise<void> {
  await toggleCategoryGroupActive(id);
}
