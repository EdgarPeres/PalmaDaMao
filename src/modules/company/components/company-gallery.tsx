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
      <h2 id="gallery-title" className="text-lg font-semibold">
        Galeria
      </h2>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0">
        {photos.map((photo) => (
          <div className="relative h-40 min-w-64 overflow-hidden rounded-lg bg-slate-100" key={photo.id}>
            <Image alt="" className="object-cover" fill sizes="(min-width: 768px) 320px, 75vw" src={photo.imageUrl} />
          </div>
        ))}
      </div>
    </section>
  );
}
