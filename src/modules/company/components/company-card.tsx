import Image from "next/image";
import type { PublicCompanyCard } from "@/modules/company/types/public-company";

type CompanyCardProps = {
  company: PublicCompanyCard;
};

export function CompanyCard({ company }: CompanyCardProps): React.ReactElement {
  return (
    <article className="min-w-64 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:min-w-0">
      <div className="relative h-28 bg-slate-100">
        {company.bannerUrl ? (
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 280px, 75vw"
            src={company.bannerUrl}
          />
        ) : null}
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white">
            <Image alt="" className="object-cover" fill sizes="48px" src={company.logoUrl} />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold">{company.name}</h3>
            <p className="text-sm text-slate-600">
              {[company.neighborhood, company.cityName].filter(Boolean).join(" • ")}
            </p>
          </div>
        </div>

        {company.categories.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {company.categories.map((category) => (
              <span
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                key={category.slug}
              >
                {category.name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
