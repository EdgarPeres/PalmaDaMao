type PublicHeaderProps = {
  cityName: string;
  citySlug: string;
};

export function PublicHeader({ cityName, citySlug }: PublicHeaderProps): React.ReactElement {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a className="text-base font-bold text-slate-950" href={`/${citySlug}`}>
          Palma da Mão
        </a>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          {cityName}
        </span>
      </div>
    </header>
  );
}
