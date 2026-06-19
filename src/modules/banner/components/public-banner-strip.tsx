import Image from "next/image";
import type { PublicBanner } from "@/modules/banner/repositories/banner.repository";

type PublicBannerStripProps = {
  banners: PublicBanner[];
};

export function PublicBannerStrip({ banners }: PublicBannerStripProps): React.ReactElement | null {
  if (banners.length === 0) {
    return null;
  }

  return (
    <section aria-label="Banners" className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      {banners.map((banner) => (
        <article className="relative h-40 min-w-full overflow-hidden rounded-lg bg-slate-200 shadow-sm sm:h-56" key={banner.id}>
          <Image alt={banner.title} className="object-cover" fill priority sizes="(min-width: 1024px) 1024px, 100vw" src={banner.imageUrl} />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h2 className="text-lg font-bold text-white">{banner.title}</h2>
          </div>
        </article>
      ))}
    </section>
  );
}
