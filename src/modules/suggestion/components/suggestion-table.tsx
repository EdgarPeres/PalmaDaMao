import type { SuggestionStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { updateSuggestionStatusAction } from "@/modules/suggestion/actions/suggestion-status.actions";
import type { AdminSuggestion } from "@/modules/suggestion/repositories/admin-suggestion.repository";

type SuggestionTableProps = {
  suggestions: AdminSuggestion[];
};

const statusLabels: Record<SuggestionStatus, string> = {
  PENDING: "Pendente",
  CONVERTED: "Convertida",
  IGNORED: "Ignorada"
};

export function SuggestionTable({ suggestions }: SuggestionTableProps): React.ReactElement {
  if (suggestions.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
        Nenhuma sugestão recebida ainda.
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
              <th className="px-4 py-3 font-semibold">Categoria</th>
              <th className="px-4 py-3 font-semibold">Telefone</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Recebida em</th>
              <th className="px-4 py-3 font-semibold">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {suggestions.map((suggestion) => (
              <tr key={suggestion.id}>
                <td className="px-4 py-3 font-medium text-slate-950">{suggestion.name}</td>
                <td className="px-4 py-3 text-slate-600">{suggestion.category}</td>
                <td className="px-4 py-3 text-slate-600">{suggestion.phone}</td>
                <td className="px-4 py-3">{statusLabels[suggestion.status]}</td>
                <td className="px-4 py-3 text-slate-600">
                  {new Intl.DateTimeFormat("pt-BR").format(suggestion.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <form action={updateSuggestionStatusAction} className="flex gap-2">
                    <input name="id" type="hidden" value={suggestion.id} />
                    <select
                      className="h-10 rounded-md border border-slate-300 bg-white px-2"
                      defaultValue={suggestion.status}
                      name="status"
                    >
                      <option value="PENDING">Pendente</option>
                      <option value="CONVERTED">Convertida</option>
                      <option value="IGNORED">Ignorada</option>
                    </select>
                    <Button type="submit" variant="secondary">
                      Salvar
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
