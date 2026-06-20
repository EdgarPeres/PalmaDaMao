import Image from "next/image";
import { MapPin } from "lucide-react";
import type { PublicCompanyCard } from "@/modules/company/types/public-company";

type CompanyCardProps = {
  company: PublicCompanyCard;
};

export function CompanyCard({ company }: CompanyCardProps): React.ReactElement {
  return (
    <a
      className="group block min-w-72 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md sm:min-w-0"
      href={`/${company.citySlug}/empresa/${company.slug}`}
    >
      <div className="relative h-32 bg-slate-100">
        {company.bannerUrl ? (
          <Image
            alt=""
            className="object-cover transition duration-300 group-hover:scale-105"
            fill
            sizes="(min-width: 1024px) 280px, 80vw"
            src={company.bannerUrl}
          />
        ) : (
          <div className="h-full bg-[linear-gradient(135deg,#e0f2fe_0%,#ffffff_48%,#dbeafe_100%)]" />
        )}
        <div className="absolute -bottom-8 left-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-lg border-4 border-white bg-white shadow-sm">
            <Image alt="" className="object-cover" fill sizes="64px" src={company.logoUrl} />
          </div>
        </div>
      </div>

      <div className="space-y-3 px-4 pb-4 pt-11">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-slate-950">{company.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span className="truncate">
              {[company.neighborhood, company.cityName].filter(Boolean).join(" - ")}
            </span>
          </p>
        </div>

        {company.categories.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {company.categories.slice(0, 3).map((category) => (
              <span
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
                key={category.slug}
              >
                {category.name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </a>
  );
}
