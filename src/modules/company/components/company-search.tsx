"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { PublicCompanyCard } from "@/modules/company/types/public-company";

type CompanySearchProps = {
  citySlug: string;
};

type SearchResponse = {
  companies: PublicCompanyCard[];
};

export function CompanySearch({ citySlug }: CompanySearchProps): React.ReactElement {
  const [query, setQuery] = useState("");
  const [companies, setCompanies] = useState<PublicCompanyCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const normalizedQuery = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    if (normalizedQuery.length < 2) {
      setCompanies([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setIsLoading(true);

      try {
        const params = new URLSearchParams({
          city: citySlug,
          q: normalizedQuery
        });
        const response = await fetch(`/api/companies/search?${params.toString()}`, {
          signal: controller.signal
        });
        const data = (await response.json()) as SearchResponse;
        setCompanies(data.companies);
      } catch {
        if (!controller.signal.aborted) {
          setCompanies([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [citySlug, normalizedQuery]);

  return (
    <section className="space-y-3" aria-label="Busca de empresas">
      <label className="flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 shadow-sm">
        <Search aria-hidden="true" className="h-5 w-5 text-slate-500" />
        <span className="sr-only">Pesquisar empresas</span>
        <input
          className="h-full flex-1 bg-transparent text-base outline-none placeholder:text-slate-500"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Pesquisar empresas ou categorias"
          type="search"
          value={query}
        />
      </label>

      {normalizedQuery.length >= 2 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-950">
            {isLoading ? "Buscando..." : `Resultados para "${normalizedQuery}"`}
          </p>
          {!isLoading && companies.length === 0 ? (
            <p className="mt-2 text-sm text-slate-600">Nenhuma empresa encontrada.</p>
          ) : null}
          {companies.length > 0 ? (
            <div className="mt-3 divide-y divide-slate-100">
              {companies.map((company) => (
                <a
                  className="block py-3 text-sm hover:text-primary"
                  href={`/${company.citySlug}/empresa/${company.slug}`}
                  key={company.id}
                >
                  <span className="font-semibold">{company.name}</span>
                  <span className="ml-2 text-slate-500">
                    {[company.neighborhood, company.categories[0]?.name].filter(Boolean).join(" • ")}
                  </span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
