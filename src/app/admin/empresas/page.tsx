import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { getAdminCategories } from "@/modules/category/services/admin-category.service";
import { getAdminCityOptions } from "@/modules/city/services/admin-city.service";
import { CompanyForm } from "@/modules/company/components/company-form";
import { CompanyTable } from "@/modules/company/components/company-table";
import { getAdminCompanies } from "@/modules/company/services/admin-company.service";

export default async function AdminCompaniesPage(): Promise<React.ReactElement> {
  const [session, companies, categories, cities] = await Promise.all([
    requireAdminSession(),
    getAdminCompanies(),
    getAdminCategories(),
    getAdminCityOptions()
  ]);

  return (
    <AdminShell userEmail={session.user.email}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Empresas</h2>
          <p className="mt-1 text-sm text-slate-600">
            Gerencie empresas, contatos, categorias, destaque e visibilidade pública.
          </p>
        </div>

        {categories.length === 0 || cities.length === 0 ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Cadastre ao menos uma cidade e uma categoria antes de criar empresas.
          </div>
        ) : null}

        <CompanyForm categories={categories} cities={cities} companies={companies} />
        <CompanyTable companies={companies} />
      </div>
    </AdminShell>
  );
}
