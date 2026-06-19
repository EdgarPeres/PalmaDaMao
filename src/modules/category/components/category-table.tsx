import { Button } from "@/components/ui/button";
import { toggleCategoryActiveAction } from "@/modules/category/actions/category.actions";
import type { AdminCategory } from "@/modules/category/repositories/admin-category.repository";

type CategoryTableProps = {
  categories: AdminCategory[];
};

export function CategoryTable({ categories }: CategoryTableProps): React.ReactElement {
  if (categories.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
        Nenhuma categoria cadastrada ainda.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Categoria</th>
              <th className="px-4 py-3 font-semibold">Grupo</th>
              <th className="px-4 py-3 font-semibold">Slug</th>
              <th className="px-4 py-3 font-semibold">Empresas</th>
              <th className="px-4 py-3 font-semibold">Ordem</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-4 py-3 font-medium text-slate-950">{category.name}</td>
                <td className="px-4 py-3 text-slate-600">{category.groupName}</td>
                <td className="px-4 py-3 text-slate-600">{category.slug}</td>
                <td className="px-4 py-3 text-slate-600">{category.companiesCount}</td>
                <td className="px-4 py-3 text-slate-600">{category.order}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      category.active ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {category.active ? "Ativa" : "Inativa"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <form action={toggleCategoryActiveAction}>
                    <input name="id" type="hidden" value={category.id} />
                    <Button type="submit" variant="secondary">
                      {category.active ? "Inativar" : "Ativar"}
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
