import { listAdminCityOptions } from "@/modules/city/repositories/admin-city.repository";

export async function getAdminCityOptions() {
  try {
    return await listAdminCityOptions();
  } catch {
    return [];
  }
}
