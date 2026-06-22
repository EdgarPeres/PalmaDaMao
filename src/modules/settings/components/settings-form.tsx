"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { saveSettingsAction, type SettingsActionState } from "@/modules/settings/actions/settings.actions";
import type { AdminCityOption } from "@/modules/city/repositories/admin-city.repository";
import type { AdminSiteSettings } from "@/modules/settings/repositories/admin-settings.repository";

type SettingsFormProps = {
  cities: AdminCityOption[];
  settings: AdminSiteSettings | null;
};

const initialState: SettingsActionState = { ok: false, message: "" };

export function SettingsForm({ cities, settings }: SettingsFormProps): React.ReactElement {
  const [state, formAction, isPending] = useActionState(saveSettingsAction, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field defaultValue={settings?.siteName ?? "Palma da Mao"} label="Nome do portal" name="siteName" />
        <Field
          defaultValue={settings?.slogan ?? "As melhores empresas da sua cidade em um so lugar."}
          label="Slogan"
          name="slogan"
        />
        <Field defaultValue={settings?.primaryColor ?? "#0069FC"} label="Cor principal" name="primaryColor" />
        <label className="block space-y-2 text-sm font-medium">
          <span>Cidade padrao</span>
          <select
            className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
            defaultValue={settings?.defaultCityId ?? cities[0]?.id ?? ""}
            name="defaultCityId"
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name} - {city.state}
              </option>
            ))}
          </select>
        </label>
        <Field defaultValue={settings?.logoUrl ?? ""} label="Logo URL" name="logoUrl" />
        <Field defaultValue={settings?.faviconUrl ?? ""} label="Favicon URL" name="faviconUrl" />
        <Field defaultValue={settings?.supportWhatsapp ?? ""} label="WhatsApp de suporte" name="supportWhatsapp" />
        <Field defaultValue={settings?.officialInstagram ?? ""} label="Instagram oficial" name="officialInstagram" />
      </div>

      <TextArea defaultValue={settings?.homeText ?? ""} label="Texto da home" name="homeText" />
      <TextArea defaultValue={settings?.footerText ?? ""} label="Texto do rodape" name="footerText" />

      <label className="flex items-center gap-3 text-sm font-medium">
        <input defaultChecked={settings?.maintenanceMode ?? false} name="maintenanceMode" type="checkbox" />
        Ativar modo manutencao
      </label>

      {state.message ? (
        <p className={`text-sm font-medium ${state.ok ? "text-green-700" : "text-red-600"}`}>
          {state.message}
        </p>
      ) : null}

      <Button disabled={isPending || cities.length === 0} type="submit">
        {isPending ? "Salvando..." : "Salvar configuracoes"}
      </Button>
    </form>
  );
}

type FieldProps = {
  defaultValue: string;
  label: string;
  name: string;
};

function Field({ defaultValue, label, name }: FieldProps): React.ReactElement {
  return (
    <label className="block space-y-2 text-sm font-medium">
      <span>{label}</span>
      <input
        className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
        defaultValue={defaultValue}
        name={name}
      />
    </label>
  );
}

function TextArea({ defaultValue, label, name }: FieldProps): React.ReactElement {
  return (
    <label className="block space-y-2 text-sm font-medium">
      <span>{label}</span>
      <textarea
        className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
        defaultValue={defaultValue}
        name={name}
      />
    </label>
  );
}
