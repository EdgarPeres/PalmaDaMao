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
          Organize categorias por grupos como Alimentacao, Saude e Servicos.
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
        <Field defaultValue={selectedGroup?.name ?? ""} label="Nome" name="name" placeholder="Ex.: Alimentacao" selectedId={selectedGroup?.id} />
        <Field defaultValue={selectedGroup?.order ?? 0} label="Ordem" name="order" placeholder="0" selectedId={selectedGroup?.id} type="number" />
        <Field defaultValue={selectedGroup?.icon ?? ""} label="Icone" name="icon" placeholder="Nome do icone" selectedId={selectedGroup?.id} />
        <Field defaultValue={selectedGroup?.color ?? ""} label="Cor" name="color" placeholder="#0069FC" selectedId={selectedGroup?.id} />
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
        {isPending ? "Salvando..." : selectedGroup ? "Salvar alteracoes" : "Criar grupo"}
      </Button>
    </form>
  );
}

type FieldProps = {
  defaultValue: string | number;
  label: string;
  name: string;
  placeholder: string;
  selectedId?: string;
  type?: string;
};

function Field({ defaultValue, label, name, placeholder, selectedId, type = "text" }: FieldProps): React.ReactElement {
  return (
    <label className="block space-y-2 text-sm font-medium">
      <span>{label}</span>
      <input
        className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
        defaultValue={defaultValue}
        key={`${name}-${selectedId ?? "new"}`}
        name={name}
        placeholder={placeholder}
        type={type}
      />
    </label>
  );
}
