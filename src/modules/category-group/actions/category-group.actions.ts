"use server";

import { revalidatePath } from "next/cache";
import { changeCategoryGroupStatus, saveCategoryGroup } from "@/modules/category-group/services/admin-category-group.service";
import { categoryGroupMutationSchema } from "@/modules/category-group/schemas/category-group.schema";

export type CategoryGroupActionState = {
  ok: boolean;
  message: string;
};

export async function saveCategoryGroupAction(
  _state: CategoryGroupActionState,
  formData: FormData
): Promise<CategoryGroupActionState> {
  const parsed = categoryGroupMutationSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    icon: formData.get("icon") || undefined,
    color: formData.get("color") || undefined,
    order: formData.get("order"),
    active: formData.get("active") === "on"
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Revise os dados enviados."
    };
  }

  try {
    await saveCategoryGroup(parsed.data);
    revalidatePath("/admin/grupos");
    revalidatePath("/montividiu");

    return {
      ok: true,
      message: parsed.data.id ? "Grupo atualizado." : "Grupo criado."
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível salvar o grupo. Verifique se já existe um grupo com esse nome."
    };
  }
}

export async function toggleCategoryGroupActiveAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  await changeCategoryGroupStatus(id);
  revalidatePath("/admin/grupos");
  revalidatePath("/montividiu");
}
