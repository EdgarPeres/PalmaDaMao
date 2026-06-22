import type { Metadata } from "next";
import { Search } from "lucide-react";
import { PublicFooter } from "@/components/layout/public-footer";
import { PublicHeader } from "@/components/layout/public-header";
import { CompanyCard } from "@/modules/company/components/company-card";
import { getPublicCompanies } from "@/modules/company/services/public-company.service";
import { getPublicCity } from "@/modules/city/services/city.service";
import { getPublicSiteSettings } from "@/modules/settings/services/settings.service";

type CompaniesPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Todas as empresas em Montividiu",
  description: "Consulte empresas ativas no guia comercial de Montividiu.",
  alternates: {
    canonical: "/montividiu/empresas"
  },
  openGraph: {
    title: "Todas as empresas em Montividiu",
    description: "Consulte empresas ativas no guia comercial de Montividiu.",
    url: "/montividiu/empresas"
  }
};

export default async function CompaniesPage({ searchParams }: CompaniesPageProps): Promise<React.ReactElement> {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const citySlug = "montividiu";
  const [city, settings, companies] = await Promise.all([
    getPublicCity(citySlug),
    getPublicSiteSettings(),
    getPublicCompanies(citySlug, query)
  ]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <PublicHeader cityName={city.name} citySlug={city.slug} />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Guia comercial</p>
          <h1 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">Todas as empresas</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Veja as empresas ativas em Montividiu e acesse os canais oficiais de contato.
          </p>

          <form action="/montividiu/empresas" className="mt-5 flex flex-col gap-3 sm:flex-row">
            <label className="flex h-12 flex-1 items-center gap-3 rounded-md border border-slate-300 bg-white px-3">
              <Search aria-hidden="true" className="h-4 w-4 text-primary" />
              <span className="sr-only">Pesquisar empresas</span>
              <input
                className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500"
                defaultValue={query}
                name="q"
                placeholder="Buscar por empresa ou categoria"
                type="search"
              />
            </label>
            <button className="h-12 rounded-md bg-primary px-5 text-sm font-bold text-white hover:bg-blue-700" type="submit">
              Buscar
            </button>
          </form>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">
              {query ? `Resultado para "${query}"` : "Empresas cadastradas"}
            </p>
            <h2 className="mt-1 text-xl font-black text-slate-950">
              {companies.length} {companies.length === 1 ? "empresa" : "empresas"}
            </h2>
          </div>
          {query ? (
            <a className="text-sm font-bold text-primary" href="/montividiu/empresas">
              Limpar busca
            </a>
          ) : null}
        </div>

        {companies.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {companies.map((company) => (
              <CompanyCard company={company} key={company.id} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
            Nenhuma empresa encontrada.
          </div>
        )}
      </section>

      <PublicFooter footerText={settings.footerText} siteName={settings.siteName} />
    </main>
  );
}
