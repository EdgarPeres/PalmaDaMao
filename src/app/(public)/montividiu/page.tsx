import { redirect } from "next/navigation";
import { PublicFooter } from "@/components/layout/public-footer";
import { PublicHeader } from "@/components/layout/public-header";
import { getPublicCategoryGroups } from "@/modules/category-group/services/category-group.service";
import { CompanyCard } from "@/modules/company/components/company-card";
import { CompanySearch } from "@/modules/company/components/company-search";
import { getPublicCompanySections } from "@/modules/company/services/public-company.service";
import type { PublicCompanyCard } from "@/modules/company/types/public-company";
import { getPublicCity } from "@/modules/city/services/city.service";
import { getPublicSiteSettings } from "@/modules/settings/services/settings.service";
import { SuggestionForm } from "@/modules/suggestion/components/suggestion-form";

export const dynamic = "force-dynamic";

export default async function MontividiuPage(): Promise<React.ReactElement> {
  const citySlug = "montividiu";
  const [city, settings, categoryGroups, companies] = await Promise.all([
    getPublicCity(citySlug),
    getPublicSiteSettings(),
    getPublicCategoryGroups(),
    getPublicCompanySections(citySlug)
  ]);

  if (settings.maintenanceMode) {
    redirect("/manutencao");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <PublicHeader cityName={city.name} citySlug={city.slug} />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <div
          className="rounded-lg bg-primary px-5 py-8 text-white shadow-sm"
          style={{ backgroundColor: settings.primaryColor }}
        >
          <p className="text-sm font-medium opacity-90">{settings.siteName}</p>
          <h1 className="mt-2 max-w-xl text-3xl font-bold leading-tight">{settings.slogan}</h1>
          {settings.homeText ? (
            <p className="mt-3 max-w-lg text-sm opacity-90">{settings.homeText}</p>
          ) : null}
        </div>

        <CompanySearch citySlug={city.slug} />

        <section aria-labelledby="categories-title" className="space-y-3">
          <h2 id="categories-title" className="text-lg font-semibold">
            Categorias
          </h2>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-6">
            {categoryGroups.map((category) => (
              <article
                className="min-w-32 rounded-lg border border-slate-200 bg-white p-4 text-sm font-medium shadow-sm"
                key={category.id}
              >
                {category.name}
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="featured-title" className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h2 id="featured-title" className="text-lg font-semibold">
              Empresas em destaque
            </h2>
            <a className="text-sm font-semibold text-primary" href="/montividiu/empresas">
              Ver todas
            </a>
          </div>
          <CompanyList
            companies={companies.featured}
            emptyLabel="Nenhuma empresa em destaque cadastrada ainda."
          />
        </section>

        <section aria-labelledby="recent-title" className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h2 id="recent-title" className="text-lg font-semibold">
              Recentemente adicionadas
            </h2>
            <a className="text-sm font-semibold text-primary" href="/montividiu/empresas">
              Ver todas
            </a>
          </div>
          <CompanyList companies={companies.recent} emptyLabel="Nenhuma empresa cadastrada ainda." />
        </section>

        <SuggestionForm />
      </section>

      <PublicFooter footerText={settings.footerText} siteName={settings.siteName} />
    </main>
  );
}

type CompanyListProps = {
  companies: PublicCompanyCard[];
  emptyLabel: string;
};

function CompanyList({ companies, emptyLabel }: CompanyListProps): React.ReactElement {
  if (companies.length > 0) {
    return (
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
        {companies.map((company) => (
          <CompanyCard company={company} key={company.id} />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
      {emptyLabel}
    </div>
  );
}
