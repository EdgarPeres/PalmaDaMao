import Image from "next/image";
import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { notFound, redirect } from "next/navigation";
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

export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = await getPublicCompanyDetail("montividiu", slug);

  if (!company) {
    return {
      title: "Empresa nao encontrada"
    };
  }

  const description = company.description.slice(0, 155);

  return {
    title: company.name,
    description,
    alternates: {
      canonical: `/montividiu/empresa/${company.slug}`
    },
    openGraph: {
      title: company.name,
      description,
      url: `/montividiu/empresa/${company.slug}`,
      type: "article",
      images: company.bannerUrl ? [{ url: company.bannerUrl }] : [{ url: company.logoUrl }]
    }
  };
}

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

  if (settings.maintenanceMode) {
    redirect("/manutencao");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <RegisterCompanyView companyId={company.id} />
      <PublicHeader cityName={city.name} citySlug={city.slug} />

      <article className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="relative h-44 bg-slate-100 sm:h-64">
            {company.bannerUrl ? (
              <Image
                alt=""
                className="object-cover"
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                src={company.bannerUrl}
              />
            ) : (
              <div className="h-full bg-[linear-gradient(135deg,#e0f2fe_0%,#ffffff_48%,#dbeafe_100%)]" />
            )}
          </div>

          <div className="px-5 pb-5">
            <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border-4 border-white bg-white shadow-sm">
                <Image alt="" className="object-cover" fill sizes="96px" src={company.logoUrl} />
              </div>

              <div className="min-w-0 pb-1">
                <h1 className="text-2xl font-black text-slate-950 sm:text-3xl">{company.name}</h1>
                <p className="mt-2 flex items-center gap-1 text-sm text-slate-600">
                  <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                  <span>{[company.neighborhood, company.cityName].filter(Boolean).join(" - ")}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {company.categories.map((category) => (
                <span
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700"
                  key={category.slug}
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <CompanyContactActions company={company} />

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Perfil</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">Sobre a empresa</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-700">{company.description}</p>
        </section>

        <CompanyScheduleList schedules={company.schedules} />
        <CompanyGallery photos={company.photos} />
      </article>

      <PublicFooter footerText={settings.footerText} siteName={settings.siteName} />
    </main>
  );
}
