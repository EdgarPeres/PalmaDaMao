import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/layout/admin-shell";
import { authOptions } from "@/lib/auth/options";
import { getAdminDashboardSummary } from "@/modules/dashboard/services/dashboard.service";

export default async function AdminDashboardPage(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  const summary = await getAdminDashboardSummary();
  const cards = [
    { label: "Empresas", value: summary.totalCompanies },
    { label: "Categorias", value: summary.totalCategories },
    { label: "Visualizações", value: summary.totalViews },
    { label: "Cliques no WhatsApp", value: summary.totalWhatsappClicks }
  ];

  return (
    <AdminShell userEmail={session.user.email}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="mt-1 text-sm text-slate-600">Resumo geral do portal.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm" key={card.label}>
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <p className="mt-2 text-3xl font-bold">{card.value}</p>
            </article>
          ))}
        </div>

        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold">Empresas mais visualizadas</h2>
          {summary.mostViewedCompanies.length > 0 ? (
            <div className="mt-4 divide-y divide-slate-100">
              {summary.mostViewedCompanies.map((company) => (
                <div className="flex items-center justify-between gap-4 py-3" key={company.id}>
                  <span className="text-sm font-medium">{company.name}</span>
                  <span className="text-sm text-slate-600">{company.views} visualizações</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-600">Nenhuma visualização registrada ainda.</p>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
