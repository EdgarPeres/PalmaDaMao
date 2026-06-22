import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { SuggestionTable } from "@/modules/suggestion/components/suggestion-table";
import { getAdminSuggestions } from "@/modules/suggestion/services/admin-suggestion.service";

export default async function AdminSuggestionsPage(): Promise<React.ReactElement> {
  const [session, suggestions] = await Promise.all([requireAdminSession(), getAdminSuggestions()]);

  return (
    <AdminShell userEmail={session.user.email}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Sugestoes</h2>
          <p className="mt-1 text-sm text-slate-600">
            Visualize sugestoes recebidas e atualize o status sem excluir historico.
          </p>
        </div>

        <SuggestionTable suggestions={suggestions} />
      </div>
    </AdminShell>
  );
}
