import { Button } from "@/components/ui/button";
import { toggleCityActiveAction } from "@/modules/city/actions/city.actions";
import type { AdminCityOption } from "@/modules/city/repositories/admin-city.repository";

type CityTableProps = {
  cities: AdminCityOption[];
};

export function CityTable({ cities }: CityTableProps): React.ReactElement {
  if (cities.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
        Nenhuma cidade cadastrada ainda.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Cidade</th>
              <th className="px-4 py-3 font-semibold">Slug</th>
              <th className="px-4 py-3 font-semibold">Empresas</th>
              <th className="px-4 py-3 font-semibold">Ordem</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Acao</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cities.map((city) => (
              <tr key={city.id}>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-950">{city.name}</div>
                  <div className="text-xs text-slate-500">{city.state}</div>
                </td>
                <td className="px-4 py-3 text-slate-600">{city.slug}</td>
                <td className="px-4 py-3 text-slate-600">{city.companiesCount}</td>
                <td className="px-4 py-3 text-slate-600">{city.order}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      city.active ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {city.active ? "Ativa" : "Inativa"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <form action={toggleCityActiveAction}>
                    <input name="id" type="hidden" value={city.id} />
                    <Button type="submit" variant="secondary">
                      {city.active ? "Inativar" : "Ativar"}
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
