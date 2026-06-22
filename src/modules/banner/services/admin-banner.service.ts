import {
  countActiveBanners,
  createBanner,
  deleteBanner,
  listAdminBanners,
  updateBanner
} from "@/modules/banner/repositories/admin-banner.repository";
import type { BannerMutationInput } from "@/modules/banner/schemas/banner.schema";
import { deleteImage } from "@/modules/uploads/services/upload.service";

export async function getAdminBanners() {
  try {
    return await listAdminBanners();
  } catch {
    return [];
  }
}

export async function saveBanner(input: BannerMutationInput): Promise<void> {
  if (input.active) {
    const activeCount = await countActiveBanners(input.id || undefined);

    if (activeCount >= 5) {
      throw new Error("ACTIVE_BANNER_LIMIT");
    }
  }

  if (input.id) {
    await updateBanner({ ...input, id: input.id });
    return;
  }

  await createBanner(input);
}

export async function removeBanner(id: string): Promise<void> {
  const deletedBanner = await deleteBanner(id);

  if (deletedBanner.imageUrl.startsWith("/uploads/")) {
    await deleteImage(deletedBanner.imageUrl);
  }
}
