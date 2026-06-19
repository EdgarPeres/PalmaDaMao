"use server";

import { revalidatePath } from "next/cache";
import { changeCategoryStatus, saveCategory } from "@/modules/category/services/admin-category.service";
import { categoryMutationSchema } from "@/modules/category/schemas/category.schema";

export type CategoryActionState = {
  ok: boolean;
  message: string;
};

export async function saveCategoryAction(
  _state: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  const parsed = categoryMutationSchema.safeParse({
    id: formData.get("id") || undefined,
    groupId: formData.get("groupId"),
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
    await saveCategory(parsed.data);
    revalidatePath("/admin/categorias");
    revalidatePath("/montividiu");

    return {
      ok: true,
      message: parsed.data.id ? "Categoria atualizada." : "Categoria criada."
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível salvar a categoria. Verifique se já existe uma categoria com esse nome."
    };
  }
}

export async function toggleCategoryActiveAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  await changeCategoryStatus(id);
  revalidatePath("/admin/categorias");
  revalidatePath("/montividiu");
}
