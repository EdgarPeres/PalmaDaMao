import { AtSign, Building2, Eye, Link as LinkIcon, MessageCircle, Tags } from "lucide-react";
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
    { label: "Empresas", value: summary.totalCompanies, hint: `${summary.activeCompanies} ativas`, icon: Building2 },
    { label: "Categorias", value: summary.totalCategories, hint: "Grupos e categorias", icon: Tags },
    { label: "Visualizacoes", value: summary.totalViews, hint: "Historico completo", icon: Eye },
    { label: "WhatsApp", value: summary.totalWhatsappClicks, hint: "Cliques externos", icon: MessageCircle }
  ];

  const contactCards = [
    { label: "Instagram", value: summary.totalInstagramClicks, icon: AtSign },
    { label: "Links principais", value: summary.totalMainLinkClicks, icon: LinkIcon },
    { label: "Empresas inativas", value: summary.inactiveCompanies, icon: Building2 }
  ];

  const maxViews = Math.max(...summary.mostViewedCompanies.map((company) => company.views), 1);

  return (
    <AdminShell userEmail={session.user.email}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="mt-1 text-sm text-slate-600">
            Resumo geral do portal com metricas acumuladas desde o inicio.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm" key={card.label}>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-slate-500">{card.label}</p>
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-blue-50 text-primary">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 text-3xl font-black text-slate-950">{card.value}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">{card.hint}</p>
              </article>
            );
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-primary">Ranking</p>
              <h2 className="mt-1 text-lg font-black text-slate-950">Empresas mais visualizadas</h2>
              <p className="mt-1 text-sm text-slate-600">Considera o historico completo, sem filtro por periodo.</p>
            </div>

            {summary.mostViewedCompanies.length > 0 ? (
              <div className="mt-4 space-y-4">
                {summary.mostViewedCompanies.map((company, index) => (
                  <div className="space-y-2" key={company.id}>
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="font-semibold text-slate-800">
                        {index + 1}. {company.name}
                      </span>
                      <span className="font-bold text-slate-950">{company.views}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.max((company.views / maxViews) * 100, 6)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600">
                Nenhuma visualizacao registrada ainda.
              </p>
            )}
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-primary">Contatos</p>
              <h2 className="mt-1 text-lg font-black text-slate-950">Cliques registrados</h2>
            </div>
            <div className="mt-4 divide-y divide-slate-100">
              {contactCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div className="flex items-center justify-between gap-4 py-3" key={card.label}>
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-md bg-slate-100 text-slate-600">
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-semibold text-slate-700">{card.label}</span>
                    </div>
                    <span className="text-lg font-black text-slate-950">{card.value}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </AdminShell>
  );
}
