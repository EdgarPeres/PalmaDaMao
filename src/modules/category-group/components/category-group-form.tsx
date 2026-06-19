"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  saveCategoryGroupAction,
  type CategoryGroupActionState
} from "@/modules/category-group/actions/category-group.actions";
import type { AdminCategoryGroup } from "@/modules/category-group/repositories/admin-category-group.repository";

type CategoryGroupFormProps = {
  groups: AdminCategoryGroup[];
};

const initialState: CategoryGroupActionState = {
  ok: false,
  message: ""
};

export function CategoryGroupForm({ groups }: CategoryGroupFormProps): React.ReactElement {
  const [selectedId, setSelectedId] = useState("");
  const [state, formAction, isPending] = useActionState(saveCategoryGroupAction, initialState);
  const selectedGroup = groups.find((group) => group.id === selectedId);

  useEffect(() => {
    if (state.ok) {
      setSelectedId("");
    }
  }, [state.ok]);

  return (
    <form action={formAction} className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-base font-semibold">{selectedGroup ? "Editar grupo" : "Novo grupo"}</h3>
        <p className="mt-1 text-sm text-slate-600">
          Organize categorias por grupos como Alimentação, Saúde e Serviços.
        </p>
      </div>

      <input name="id" type="hidden" value={selectedGroup?.id ?? ""} />

      <label className="block space-y-2 text-sm font-medium">
        <span>Editar existente</span>
        <select
          className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
          onChange={(event) => setSelectedId(event.target.value)}
          value={selectedId}
        >
          <option value="">Criar novo grupo</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm font-medium">
          <span>Nome</span>
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={selectedGroup?.name ?? ""}
            key={`name-${selectedGroup?.id ?? "new"}`}
            name="name"
            placeholder="Ex.: Alimentação"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium">
          <span>Ordem</span>
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={selectedGroup?.order ?? 0}
            key={`order-${selectedGroup?.id ?? "new"}`}
            min={0}
            name="order"
            type="number"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium">
          <span>Ícone</span>
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={selectedGroup?.icon ?? ""}
            key={`icon-${selectedGroup?.id ?? "new"}`}
            name="icon"
            placeholder="Nome do ícone"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium">
          <span>Cor</span>
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={selectedGroup?.color ?? ""}
            key={`color-${selectedGroup?.id ?? "new"}`}
            name="color"
            placeholder="#0069FC"
          />
        </label>
      </div>

      <label className="flex items-center gap-3 text-sm font-medium">
        <input
          className="h-4 w-4 rounded border-slate-300 text-primary"
          defaultChecked={selectedGroup?.active ?? true}
          key={`active-${selectedGroup?.id ?? "new"}`}
          name="active"
          type="checkbox"
        />
        Grupo ativo
      </label>

      {state.message ? (
        <p className={`text-sm font-medium ${state.ok ? "text-green-700" : "text-red-600"}`}>
          {state.message}
        </p>
      ) : null}

      <Button disabled={isPending} type="submit">
        {isPending ? "Salvando..." : selectedGroup ? "Salvar alterações" : "Criar grupo"}
      </Button>
    </form>
  );
}
