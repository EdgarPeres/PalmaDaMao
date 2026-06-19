import { getActiveCityBySlug } from "@/modules/city/repositories/city.repository";
import type { PublicCity } from "@/modules/city/types/public-city";

const montividiuFallback: PublicCity = {
  id: "montividiu",
  name: "Montividiu",
  state: "GO",
  slug: "montividiu",
  description: "Cidade padrão do MVP"
};

export async function getPublicCity(slug: string): Promise<PublicCity> {
  try {
    return (await getActiveCityBySlug(slug)) ?? montividiuFallback;
  } catch {
    return montividiuFallback;
  }
}
