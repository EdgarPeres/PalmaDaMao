import { Button } from "@/components/ui/button";
import { updateCompanyHighlightAction } from "@/modules/company/actions/company.actions";
import type { AdminCompany } from "@/modules/company/repositories/admin-company.repository";

type HighlightTableProps = {
  companies: AdminCompany[];
};

export function HighlightTable({ companies }: HighlightTableProps): React.ReactElement {
  if (companies.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
        Nenhuma empresa cadastrada ainda.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Empresa</th>
              <th className="px-4 py-3 font-semibold">Categorias</th>
              <th className="px-4 py-3 font-semibold">Ativa</th>
              <th className="px-4 py-3 font-semibold">Destaque</th>
              <th className="px-4 py-3 font-semibold">Ordem</th>
              <th className="px-4 py-3 font-semibold">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {companies.map((company) => {
              const formId = `highlight-${company.id}`;

              return (
                <tr key={company.id}>
                  <td className="px-4 py-3 font-medium text-slate-950">{company.name}</td>
                  <td className="px-4 py-3 text-slate-600">{company.categoriesLabel || "-"}</td>
                  <td className="px-4 py-3 text-slate-600">{company.active ? "Sim" : "Nao"}</td>
                  <td className="px-4 py-3">
                    <form action={updateCompanyHighlightAction} id={formId}>
                      <input name="id" type="hidden" value={company.id} />
                      <input defaultChecked={company.featured} name="featured" type="checkbox" />
                    </form>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      className="h-10 w-24 rounded-md border border-slate-300 px-2"
                      defaultValue={company.featuredOrder ?? ""}
                      form={formId}
                      min={1}
                      name="featuredOrder"
                      type="number"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Button form={formId} type="submit" variant="secondary">
                      Salvar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
