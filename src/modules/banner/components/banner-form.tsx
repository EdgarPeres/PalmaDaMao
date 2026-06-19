"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { saveBannerAction, type BannerActionState } from "@/modules/banner/actions/banner.actions";
import type { AdminBanner } from "@/modules/banner/repositories/admin-banner.repository";

type BannerFormProps = {
  banners: AdminBanner[];
};

const initialState: BannerActionState = { ok: false, message: "" };

export function BannerForm({ banners }: BannerFormProps): React.ReactElement {
  const [selectedId, setSelectedId] = useState("");
  const [state, formAction, isPending] = useActionState(saveBannerAction, initialState);
  const selectedBanner = banners.find((banner) => banner.id === selectedId);

  useEffect(() => {
    if (state.ok) setSelectedId("");
  }, [state.ok]);

  return (
    <form action={formAction} className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-base font-semibold">{selectedBanner ? "Editar banner" : "Novo banner"}</h3>
        <p className="mt-1 text-sm text-slate-600">A home exibe no máximo 5 banners ativos.</p>
      </div>

      <input name="id" type="hidden" value={selectedBanner?.id ?? ""} />

      <label className="block space-y-2 text-sm font-medium">
        <span>Editar existente</span>
        <select
          className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
          onChange={(event) => setSelectedId(event.target.value)}
          value={selectedId}
        >
          <option value="">Criar novo banner</option>
          {banners.map((banner) => (
            <option key={banner.id} value={banner.id}>
              {banner.title}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field defaultValue={selectedBanner?.title ?? ""} label="Título" name="title" placeholder="Título do banner" selectedId={selectedBanner?.id} />
        <Field defaultValue={selectedBanner?.order ?? 0} label="Ordem" name="order" placeholder="0" selectedId={selectedBanner?.id} type="number" />
      </div>

      <Field defaultValue={selectedBanner?.imageUrl ?? ""} label="Imagem URL" name="imageUrl" placeholder="/uploads/banner.png ou https://..." selectedId={selectedBanner?.id} />

      <label className="flex items-center gap-3 text-sm font-medium">
        <input defaultChecked={selectedBanner?.active ?? true} key={`active-${selectedBanner?.id ?? "new"}`} name="active" type="checkbox" />
        Banner ativo
      </label>

      {state.message ? <p className={`text-sm font-medium ${state.ok ? "text-green-700" : "text-red-600"}`}>{state.message}</p> : null}

      <Button disabled={isPending} type="submit">
        {isPending ? "Salvando..." : selectedBanner ? "Salvar alterações" : "Criar banner"}
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
