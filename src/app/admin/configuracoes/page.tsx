import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { getAdminCityOptions } from "@/modules/city/services/admin-city.service";
import { SettingsForm } from "@/modules/settings/components/settings-form";
import { getEditableSiteSettings } from "@/modules/settings/services/admin-settings.service";

export default async function AdminSettingsPage(): Promise<React.ReactElement> {
  const [session, settings, cities] = await Promise.all([
    requireAdminSession(),
    getEditableSiteSettings(),
    getAdminCityOptions()
  ]);

  return (
    <AdminShell userEmail={session.user.email}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Configurações</h2>
          <p className="mt-1 text-sm text-slate-600">
            Edite informações públicas do portal e controle o modo manutenção.
          </p>
        </div>

        {cities.length === 0 ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Cadastre ou rode o seed de cidade antes de salvar configurações.
          </div>
        ) : null}

        <SettingsForm cities={cities} settings={settings} />
      </div>
    </AdminShell>
  );
}
