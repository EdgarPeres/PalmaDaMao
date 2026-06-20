import Image from "next/image";
import type { PublicCompanyDetail } from "@/modules/company/types/public-company";

type CompanyGalleryProps = {
  photos: PublicCompanyDetail["photos"];
};

export function CompanyGallery({ photos }: CompanyGalleryProps): React.ReactElement | null {
  if (photos.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="gallery-title" className="space-y-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-primary">Imagens</p>
        <h2 id="gallery-title" className="mt-1 text-xl font-black text-slate-950">
          Galeria
        </h2>
      </div>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0">
        {photos.map((photo) => (
          <div className="relative h-44 min-w-72 overflow-hidden rounded-lg bg-slate-100 shadow-sm" key={photo.id}>
            <Image alt="" className="object-cover" fill sizes="(min-width: 768px) 320px, 80vw" src={photo.imageUrl} />
          </div>
        ))}
      </div>
    </section>
  );
}
