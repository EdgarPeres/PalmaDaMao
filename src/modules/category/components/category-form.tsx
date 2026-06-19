"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { saveCategoryAction, type CategoryActionState } from "@/modules/category/actions/category.actions";
import type { AdminCategory } from "@/modules/category/repositories/admin-category.repository";
import type { AdminCategoryGroup } from "@/modules/category-group/repositories/admin-category-group.repository";

type CategoryFormProps = {
  categories: AdminCategory[];
  groups: AdminCategoryGroup[];
};

const initialState: CategoryActionState = {
  ok: false,
  message: ""
};

export function CategoryForm({ categories, groups }: CategoryFormProps): React.ReactElement {
  const [selectedId, setSelectedId] = useState("");
  const [state, formAction, isPending] = useActionState(saveCategoryAction, initialState);
  const selectedCategory = categories.find((category) => category.id === selectedId);

  useEffect(() => {
    if (state.ok) {
      setSelectedId("");
    }
  }, [state.ok]);

  return (
    <form action={formAction} className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-base font-semibold">{selectedCategory ? "Editar categoria" : "Nova categoria"}</h3>
        <p className="mt-1 text-sm text-slate-600">
          Vincule categorias aos grupos para organizar a navegação pública.
        </p>
      </div>

      <input name="id" type="hidden" value={selectedCategory?.id ?? ""} />

      <label className="block space-y-2 text-sm font-medium">
        <span>Editar existente</span>
        <select
          className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
          onChange={(event) => setSelectedId(event.target.value)}
          value={selectedId}
        >
          <option value="">Criar nova categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm font-medium">
          <span>Grupo</span>
          <select
            className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={selectedCategory?.groupId ?? ""}
            key={`group-${selectedCategory?.id ?? "new"}`}
            name="groupId"
          >
            <option value="">Selecione</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2 text-sm font-medium">
          <span>Nome</span>
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={selectedCategory?.name ?? ""}
            key={`name-${selectedCategory?.id ?? "new"}`}
            name="name"
            placeholder="Ex.: Restaurantes"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium">
          <span>Ordem</span>
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={selectedCategory?.order ?? 0}
            key={`order-${selectedCategory?.id ?? "new"}`}
            min={0}
            name="order"
            type="number"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium">
          <span>Ícone</span>
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={selectedCategory?.icon ?? ""}
            key={`icon-${selectedCategory?.id ?? "new"}`}
            name="icon"
            placeholder="Nome do ícone"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium">
          <span>Cor</span>
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={selectedCategory?.color ?? ""}
            key={`color-${selectedCategory?.id ?? "new"}`}
            name="color"
            placeholder="#0069FC"
          />
        </label>
      </div>

      <label className="flex items-center gap-3 text-sm font-medium">
        <input
          className="h-4 w-4 rounded border-slate-300 text-primary"
          defaultChecked={selectedCategory?.active ?? true}
          key={`active-${selectedCategory?.id ?? "new"}`}
          name="active"
          type="checkbox"
        />
        Categoria ativa
      </label>

      {state.message ? (
        <p className={`text-sm font-medium ${state.ok ? "text-green-700" : "text-red-600"}`}>
          {state.message}
        </p>
      ) : null}

      <Button disabled={isPending || groups.length === 0} type="submit">
        {isPending ? "Salvando..." : selectedCategory ? "Salvar alterações" : "Criar categoria"}
      </Button>
    </form>
  );
}
