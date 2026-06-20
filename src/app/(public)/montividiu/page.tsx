import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { PublicFooter } from "@/components/layout/public-footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicBannerStrip } from "@/modules/banner/components/public-banner-strip";
import { getPublicBanners } from "@/modules/banner/services/banner.service";
import { getPublicCategoryGroups } from "@/modules/category-group/services/category-group.service";
import { CompanyCard } from "@/modules/company/components/company-card";
import { CompanySearch } from "@/modules/company/components/company-search";
import { getPublicCompanySections } from "@/modules/company/services/public-company.service";
import type { PublicCompanyCard } from "@/modules/company/types/public-company";
import { getPublicCity } from "@/modules/city/services/city.service";
import { getPublicSiteSettings } from "@/modules/settings/services/settings.service";
import { SuggestionForm } from "@/modules/suggestion/components/suggestion-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Empresas em Montividiu",
  description: "Encontre empresas, servicos e contatos comerciais em Montividiu.",
  alternates: {
    canonical: "/montividiu"
  },
  openGraph: {
    title: "Empresas em Montividiu",
    description: "Encontre empresas, servicos e contatos comerciais em Montividiu.",
    url: "/montividiu"
  }
};

export default async function MontividiuPage(): Promise<React.ReactElement> {
  const citySlug = "montividiu";
  const [city, settings, categoryGroups, companies, banners] = await Promise.all([
    getPublicCity(citySlug),
    getPublicSiteSettings(),
    getPublicCategoryGroups(),
    getPublicCompanySections(citySlug),
    getPublicBanners()
  ]);

  if (settings.maintenanceMode) {
    redirect("/manutencao");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <PublicHeader cityName={city.name} citySlug={city.slug} />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <div
          className="overflow-hidden rounded-lg bg-primary text-white shadow-sm"
          style={{ backgroundColor: settings.primaryColor }}
        >
          <div className="grid gap-6 px-5 py-8 sm:px-7 lg:grid-cols-[1fr_280px] lg:items-end">
            <div>
              <p className="text-sm font-semibold opacity-90">{settings.siteName}</p>
              <h1 className="mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
                {settings.slogan}
              </h1>
              {settings.homeText ? (
                <p className="mt-4 max-w-xl text-sm leading-6 opacity-90 sm:text-base">{settings.homeText}</p>
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-white/15 p-4">
                <strong className="block text-2xl">{companies.featured.length}</strong>
                <span className="opacity-90">destaques</span>
              </div>
              <div className="rounded-lg bg-white/15 p-4">
                <strong className="block text-2xl">{categoryGroups.length}</strong>
                <span className="opacity-90">grupos</span>
              </div>
            </div>
          </div>
        </div>

        <CompanySearch citySlug={city.slug} />

        <PublicBannerStrip banners={banners} />

        <section aria-labelledby="categories-title" className="space-y-3">
          <SectionHeading
            eyebrow="Explore"
            title="Categorias"
          />
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-6">
            {categoryGroups.map((category) => (
              <article
                className="min-w-36 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold text-slate-800 shadow-sm"
                key={category.id}
              >
                {category.name}
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="featured-title" className="space-y-3">
          <SectionHeading eyebrow="Selecao local" title="Empresas em destaque" />
          <CompanyList
            companies={companies.featured}
            emptyLabel="Nenhuma empresa em destaque cadastrada ainda."
          />
        </section>

        <section aria-labelledby="recent-title" className="space-y-3">
          <SectionHeading eyebrow="Novidades" title="Recentemente adicionadas" />
          <CompanyList companies={companies.recent} emptyLabel="Nenhuma empresa cadastrada ainda." />
        </section>

        <SuggestionForm />
      </section>

      <PublicFooter footerText={settings.footerText} siteName={settings.siteName} />
    </main>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

function SectionHeading({ eyebrow, title }: SectionHeadingProps): React.ReactElement {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-primary">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-black text-slate-950">{title}</h2>
    </div>
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
