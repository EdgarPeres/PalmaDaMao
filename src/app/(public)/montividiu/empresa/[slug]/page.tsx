import Image from "next/image";
import { notFound } from "next/navigation";
import { PublicFooter } from "@/components/layout/public-footer";
import { PublicHeader } from "@/components/layout/public-header";
import { CompanyContactActions } from "@/modules/company/components/company-contact-actions";
import { CompanyGallery } from "@/modules/company/components/company-gallery";
import { CompanyScheduleList } from "@/modules/company/components/company-schedule-list";
import { getPublicCompanyDetail } from "@/modules/company/services/public-company.service";
import { getPublicCity } from "@/modules/city/services/city.service";
import { RegisterCompanyView } from "@/modules/metrics/components/register-company-view";
import { getPublicSiteSettings } from "@/modules/settings/services/settings.service";

type CompanyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function CompanyPage({ params }: CompanyPageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const citySlug = "montividiu";
  const [city, settings, company] = await Promise.all([
    getPublicCity(citySlug),
    getPublicSiteSettings(),
    getPublicCompanyDetail(citySlug, slug)
  ]);

  if (!company) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <RegisterCompanyView companyId={company.id} />
      <PublicHeader cityName={city.name} citySlug={city.slug} />

      <article className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        {company.bannerUrl ? (
          <div className="relative h-44 overflow-hidden rounded-lg bg-slate-200 sm:h-64">
            <Image alt="" className="object-cover" fill priority sizes="(min-width: 768px) 768px, 100vw" src={company.bannerUrl} />
          </div>
        ) : null}

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
              <Image alt="" className="object-cover" fill sizes="64px" src={company.logoUrl} />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold">{company.name}</h1>
              <p className="mt-1 text-sm text-slate-600">
                {[company.neighborhood, company.cityName].filter(Boolean).join(" • ")}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {company.categories.map((category) => (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700" key={category.slug}>
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CompanyContactActions company={company} />

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Sobre a empresa</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{company.description}</p>
        </section>

        <CompanyScheduleList schedules={company.schedules} />
        <CompanyGallery photos={company.photos} />
      </article>

      <PublicFooter footerText={settings.footerText} siteName={settings.siteName} />
    </main>
  );
}
