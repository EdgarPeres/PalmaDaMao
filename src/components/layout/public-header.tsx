import { MapPin, Search } from "lucide-react";

type PublicHeaderProps = {
  cityName: string;
  citySlug: string;
};

export function PublicHeader({ cityName, citySlug }: PublicHeaderProps): React.ReactElement {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a className="flex items-center gap-2 text-base font-bold text-slate-950" href={`/${citySlug}`}>
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-sm font-black text-white">
            PM
          </span>
          <span>Palma da Mao</span>
        </a>

        <div className="flex items-center gap-2">
          <a
            aria-label="Ir para busca"
            className="grid h-10 w-10 place-items-center rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200"
            href="#busca"
          >
            <Search aria-hidden="true" className="h-4 w-4" />
          </a>
          <span className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-100 px-3 text-sm font-semibold text-slate-700">
            <MapPin aria-hidden="true" className="h-4 w-4 text-primary" />
            {cityName}
          </span>
        </div>
      </div>
    </header>
  );
}
