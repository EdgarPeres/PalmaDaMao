import { listActiveBanners } from "@/modules/banner/repositories/banner.repository";

export async function getPublicBanners() {
  try {
    return await listActiveBanners();
  } catch {
    return [];
  }
}
