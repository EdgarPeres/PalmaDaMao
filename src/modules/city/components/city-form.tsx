"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { saveCityAction, type CityActionState } from "@/modules/city/actions/city.actions";
import type { AdminCityOption } from "@/modules/city/repositories/admin-city.repository";

type CityFormProps = {
  cities: AdminCityOption[];
};

const initialState: CityActionState = {
  ok: false,
  message: ""
};

export function CityForm({ cities }: CityFormProps): React.ReactElement {
  const [selectedId, setSelectedId] = useState("");
  const [state, formAction, isPending] = useActionState(saveCityAction, initialState);
  const selectedCity = cities.find((city) => city.id === selectedId);

  useEffect(() => {
    if (state.ok) {
      setSelectedId("");
    }
  }, [state.ok]);

  return (
    <form action={formAction} className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-base font-semibold">{selectedCity ? "Editar cidade" : "Nova cidade"}</h3>
        <p className="mt-1 text-sm text-slate-600">
          O MVP usa Montividiu publicamente, mas o cadastro ja fica preparado para expansao.
        </p>
      </div>

      <input name="id" type="hidden" value={selectedCity?.id ?? ""} />

      <label className="block space-y-2 text-sm font-medium">
        <span>Editar existente</span>
        <select
          className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
          onChange={(event) => setSelectedId(event.target.value)}
          value={selectedId}
        >
          <option value="">Criar nova cidade</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name} - {city.state}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block space-y-2 text-sm font-medium sm:col-span-2">
          <span>Nome</span>
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={selectedCity?.name ?? ""}
            key={`name-${selectedCity?.id ?? "new"}`}
            name="name"
            placeholder="Ex.: Montividiu"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium">
          <span>UF</span>
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 uppercase outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={selectedCity?.state ?? "GO"}
            key={`state-${selectedCity?.id ?? "new"}`}
            maxLength={2}
            name="state"
            placeholder="GO"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium">
          <span>Ordem</span>
          <input
            className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={selectedCity?.order ?? 0}
            key={`order-${selectedCity?.id ?? "new"}`}
            min={0}
            name="order"
            type="number"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm font-medium">
        <span>Descricao</span>
        <textarea
          className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
          defaultValue={selectedCity?.description ?? ""}
          key={`description-${selectedCity?.id ?? "new"}`}
          name="description"
          placeholder="Observacao interna ou descricao da cidade."
        />
      </label>

      <label className="flex items-center gap-3 text-sm font-medium">
        <input
          className="h-4 w-4 rounded border-slate-300 text-primary"
          defaultChecked={selectedCity?.active ?? true}
          key={`active-${selectedCity?.id ?? "new"}`}
          name="active"
          type="checkbox"
        />
        Cidade ativa
      </label>

      {state.message ? (
        <p className={`text-sm font-medium ${state.ok ? "text-green-700" : "text-red-600"}`}>
          {state.message}
        </p>
      ) : null}

      <Button disabled={isPending} type="submit">
        {isPending ? "Salvando..." : selectedCity ? "Salvar alteracoes" : "Criar cidade"}
      </Button>
    </form>
  );
}
