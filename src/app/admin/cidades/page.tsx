import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { CityForm } from "@/modules/city/components/city-form";
import { CityTable } from "@/modules/city/components/city-table";
import { getAdminCityOptions } from "@/modules/city/services/admin-city.service";

export default async function AdminCitiesPage(): Promise<React.ReactElement> {
  const [session, cities] = await Promise.all([requireAdminSession(), getAdminCityOptions()]);

  return (
    <AdminShell userEmail={session.user.email}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Cidades</h2>
          <p className="mt-1 text-sm text-slate-600">
            Cadastre cidades para preparar a expansao futura sem habilitar seletor publico no MVP.
          </p>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          Montividiu permanece como unica cidade publica no MVP.
        </div>

        <CityForm cities={cities} />
        <CityTable cities={cities} />
      </div>
    </AdminShell>
  );
}
