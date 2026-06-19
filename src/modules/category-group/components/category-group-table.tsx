import { Button } from "@/components/ui/button";
import { toggleCategoryGroupActiveAction } from "@/modules/category-group/actions/category-group.actions";
import type { AdminCategoryGroup } from "@/modules/category-group/repositories/admin-category-group.repository";

type CategoryGroupTableProps = {
  groups: AdminCategoryGroup[];
};

export function CategoryGroupTable({ groups }: CategoryGroupTableProps): React.ReactElement {
  if (groups.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
        Nenhum grupo cadastrado ainda.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Grupo</th>
              <th className="px-4 py-3 font-semibold">Slug</th>
              <th className="px-4 py-3 font-semibold">Categorias</th>
              <th className="px-4 py-3 font-semibold">Ordem</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {groups.map((group) => (
              <tr key={group.id}>
                <td className="px-4 py-3 font-medium text-slate-950">{group.name}</td>
                <td className="px-4 py-3 text-slate-600">{group.slug}</td>
                <td className="px-4 py-3 text-slate-600">{group.categoriesCount}</td>
                <td className="px-4 py-3 text-slate-600">{group.order}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      group.active ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {group.active ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <form action={toggleCategoryGroupActiveAction}>
                    <input name="id" type="hidden" value={group.id} />
                    <Button type="submit" variant="secondary">
                      {group.active ? "Inativar" : "Ativar"}
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
