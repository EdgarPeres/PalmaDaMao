import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { HighlightTable } from "@/modules/company/components/highlight-table";
import { getAdminCompanies } from "@/modules/company/services/admin-company.service";

export default async function AdminHighlightsPage(): Promise<React.ReactElement> {
  const [session, companies] = await Promise.all([requireAdminSession(), getAdminCompanies()]);

  return (
    <AdminShell userEmail={session.user.email}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Destaques</h2>
          <p className="mt-1 text-sm text-slate-600">
            Marque empresas como destaque e defina a ordem manual exibida na home.
          </p>
        </div>

        <HighlightTable companies={companies} />
      </div>
    </AdminShell>
  );
}
