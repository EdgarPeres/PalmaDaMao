import { Button } from "@/components/ui/button";
import {
  softDeleteCompanyAction,
  toggleCompanyActiveAction,
  toggleCompanyFeaturedAction
} from "@/modules/company/actions/company.actions";
import type { AdminCompany } from "@/modules/company/repositories/admin-company.repository";

type CompanyTableProps = {
  companies: AdminCompany[];
};

export function CompanyTable({ companies }: CompanyTableProps): React.ReactElement {
  if (companies.length === 0) {
    return <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">Nenhuma empresa cadastrada ainda.</div>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Empresa</th>
              <th className="px-4 py-3 font-semibold">Cidade</th>
              <th className="px-4 py-3 font-semibold">Categorias</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Destaque</th>
              <th className="px-4 py-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {companies.map((company) => (
              <tr key={company.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-950">{company.name}</p>
                  <p className="text-xs text-slate-500">{company.slug}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{company.cityName}</td>
                <td className="px-4 py-3 text-slate-600">{company.categoriesLabel || "-"}</td>
                <td className="px-4 py-3">{company.active ? "Ativa" : "Inativa"}</td>
                <td className="px-4 py-3">{company.featured ? "Sim" : "Não"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <ActionForm action={toggleCompanyActiveAction} id={company.id} label={company.active ? "Inativar" : "Ativar"} />
                    <ActionForm action={toggleCompanyFeaturedAction} id={company.id} label={company.featured ? "Remover destaque" : "Destacar"} />
                    <ActionForm action={softDeleteCompanyAction} id={company.id} label="Excluir" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type ActionFormProps = {
  action: (formData: FormData) => Promise<void>;
  id: string;
  label: string;
};

function ActionForm({ action, id, label }: ActionFormProps): React.ReactElement {
  return (
    <form action={action}>
      <input name="id" type="hidden" value={id} />
      <Button type="submit" variant="secondary">
        {label}
      </Button>
    </form>
  );
}
