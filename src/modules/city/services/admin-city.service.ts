import { slugify } from "@/lib/utils/slugify";
import {
  countActiveCities,
  createCity,
  findCityStatus,
  listAdminCityOptions,
  toggleCityActive,
  updateCity
} from "@/modules/city/repositories/admin-city.repository";
import type { CityMutationInput } from "@/modules/city/schemas/city.schema";

export async function getAdminCityOptions() {
  try {
    return await listAdminCityOptions();
  } catch {
    return [];
  }
}

export async function saveCity(input: CityMutationInput): Promise<void> {
  const slug = slugify(input.name);

  if (input.id) {
    await updateCity({ ...input, id: input.id, slug });
    return;
  }

  await createCity({ ...input, slug });
}

export async function changeCityStatus(id: string): Promise<void> {
  const city = await findCityStatus(id);

  if (!city) {
    return;
  }

  if (city.active) {
    const activeCities = await countActiveCities();

    if (activeCities <= 1) {
      return;
    }
  }

  await toggleCityActive(id);
}
