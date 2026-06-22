"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { saveCompanyAction, type CompanyActionState } from "@/modules/company/actions/company.actions";
import { GalleryUploadField } from "@/modules/uploads/components/gallery-upload-field";
import { ImageUploadField } from "@/modules/uploads/components/image-upload-field";
import type { AdminCompany } from "@/modules/company/repositories/admin-company.repository";
import type { AdminCategory } from "@/modules/category/repositories/admin-category.repository";
import type { AdminCityOption } from "@/modules/city/repositories/admin-city.repository";

type CompanyFormProps = {
  categories: AdminCategory[];
  cities: AdminCityOption[];
  companies: AdminCompany[];
};

const initialState: CompanyActionState = { ok: false, message: "" };
const dayLabels = ["Domingo", "Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado"];

export function CompanyForm({ categories, cities, companies }: CompanyFormProps): React.ReactElement {
  const [selectedId, setSelectedId] = useState("");
  const [state, formAction, isPending] = useActionState(saveCompanyAction, initialState);
  const selectedCompany = companies.find((company) => company.id === selectedId);

  useEffect(() => {
    if (state.ok) setSelectedId("");
  }, [state.ok]);

  return (
    <form action={formAction} className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-base font-semibold">{selectedCompany ? "Editar empresa" : "Nova empresa"}</h3>
        <p className="mt-1 text-sm text-slate-600">
          Cadastre empresas para exibicao publica. Pelo menos um canal de contato e obrigatorio.
        </p>
      </div>

      <input name="id" type="hidden" value={selectedCompany?.id ?? ""} />

      <label className="block space-y-2 text-sm font-medium">
        <span>Editar existente</span>
        <select
          className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
          onChange={(event) => setSelectedId(event.target.value)}
          value={selectedId}
        >
          <option value="">Criar nova empresa</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field defaultValue={selectedCompany?.name ?? ""} label="Nome" name="name" placeholder="Nome da empresa" selectedId={selectedCompany?.id} />
        <label className="block space-y-2 text-sm font-medium">
          <span>Cidade</span>
          <select
            className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={selectedCompany?.cityId ?? cities[0]?.id ?? ""}
            key={`city-${selectedCompany?.id ?? "new"}`}
            name="cityId"
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name} - {city.state}
              </option>
            ))}
          </select>
        </label>
        <Field defaultValue={selectedCompany?.neighborhood ?? ""} label="Bairro" name="neighborhood" placeholder="Bairro" selectedId={selectedCompany?.id} />
        <Field defaultValue={selectedCompany?.phone ?? ""} label="Telefone" name="phone" placeholder="Telefone" selectedId={selectedCompany?.id} />
        <Field defaultValue={selectedCompany?.whatsapp ?? ""} label="WhatsApp" name="whatsapp" placeholder="WhatsApp" selectedId={selectedCompany?.id} />
        <Field defaultValue={selectedCompany?.instagram ?? ""} label="Instagram" name="instagram" placeholder="@empresa" selectedId={selectedCompany?.id} />
        <Field defaultValue={selectedCompany?.website ?? ""} label="Site" name="website" placeholder="https://..." selectedId={selectedCompany?.id} />
        <Field defaultValue={selectedCompany?.mainLink ?? ""} label="Link principal" name="mainLink" placeholder="https://..." selectedId={selectedCompany?.id} />
        <ImageUploadField
          defaultValue={selectedCompany?.logoUrl ?? ""}
          folder="company-logos"
          key={`logo-${selectedCompany?.id ?? "new"}`}
          label="Logo"
          name="logoUrl"
        />
        <ImageUploadField
          defaultValue={selectedCompany?.bannerUrl ?? ""}
          folder="company-banners"
          key={`banner-${selectedCompany?.id ?? "new"}`}
          label="Banner"
          name="bannerUrl"
        />
        <Field defaultValue={selectedCompany?.featuredOrder ?? ""} label="Ordem destaque" name="featuredOrder" placeholder="1" selectedId={selectedCompany?.id} type="number" />
      </div>

      <label className="block space-y-2 text-sm font-medium">
        <span>Descricao</span>
        <textarea
          className="min-h-28 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
          defaultValue={selectedCompany?.description ?? ""}
          key={`description-${selectedCompany?.id ?? "new"}`}
          name="description"
          placeholder="Descreva a empresa em pelo menos 50 caracteres."
        />
      </label>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">Categorias</legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <label className="flex items-center gap-2 rounded-md border border-slate-200 p-2 text-sm" key={category.id}>
              <input
                defaultChecked={selectedCompany?.categoryIds.includes(category.id) ?? false}
                key={`category-${selectedCompany?.id ?? "new"}-${category.id}`}
                name="categoryIds"
                type="checkbox"
                value={category.id}
              />
              {category.name}
            </label>
          ))}
        </div>
      </fieldset>

      <GalleryUploadField
        defaultValue={selectedCompany?.photosText ?? ""}
        folder="company-gallery"
        key={`photos-${selectedCompany?.id ?? "new"}`}
        label="Galeria"
        name="photosText"
      />

      <fieldset className="space-y-3 rounded-lg border border-slate-200 p-4">
        <legend className="px-1 text-sm font-medium">Horarios informativos</legend>
        <div className="grid gap-3">
          {dayLabels.map((day, dayOfWeek) => {
            const schedule = selectedCompany?.schedules.find((item) => item.dayOfWeek === dayOfWeek);

            return (
              <div className="grid gap-2 rounded-md bg-slate-50 p-3 sm:grid-cols-[120px_1fr_1fr_auto]" key={day}>
                <div className="text-sm font-semibold text-slate-700">{day}</div>
                <input
                  className="h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                  defaultValue={schedule?.openTime ?? ""}
                  key={`open-${selectedCompany?.id ?? "new"}-${dayOfWeek}`}
                  name={`scheduleOpen-${dayOfWeek}`}
                  placeholder="Abertura"
                  type="time"
                />
                <input
                  className="h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                  defaultValue={schedule?.closeTime ?? ""}
                  key={`close-${selectedCompany?.id ?? "new"}-${dayOfWeek}`}
                  name={`scheduleClose-${dayOfWeek}`}
                  placeholder="Fechamento"
                  type="time"
                />
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    defaultChecked={schedule?.closed ?? false}
                    key={`closed-${selectedCompany?.id ?? "new"}-${dayOfWeek}`}
                    name={`scheduleClosed-${dayOfWeek}`}
                    type="checkbox"
                  />
                  Fechado
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-wrap gap-4">
        <Checkbox defaultChecked={selectedCompany?.active ?? true} label="Empresa ativa" name="active" selectedId={selectedCompany?.id} />
        <Checkbox defaultChecked={selectedCompany?.featured ?? false} label="Destaque" name="featured" selectedId={selectedCompany?.id} />
      </div>

      {state.message ? <p className={`text-sm font-medium ${state.ok ? "text-green-700" : "text-red-600"}`}>{state.message}</p> : null}

      <Button disabled={isPending || categories.length === 0 || cities.length === 0} type="submit">
        {isPending ? "Salvando..." : selectedCompany ? "Salvar alteracoes" : "Criar empresa"}
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

type CheckboxProps = {
  defaultChecked: boolean;
  label: string;
  name: string;
  selectedId?: string;
};

function Checkbox({ defaultChecked, label, name, selectedId }: CheckboxProps): React.ReactElement {
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <input defaultChecked={defaultChecked} key={`${name}-${selectedId ?? "new"}`} name={name} type="checkbox" />
      {label}
    </label>
  );
}
