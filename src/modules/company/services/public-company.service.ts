import {
  listFeaturedCompanies,
  listRecentCompanies,
  searchCompanies
} from "@/modules/company/repositories/company.repository";
import type { PublicCompanyCard } from "@/modules/company/types/public-company";

export type PublicCompanySections = {
  featured: PublicCompanyCard[];
  recent: PublicCompanyCard[];
};

export async function getPublicCompanySections(citySlug: string): Promise<PublicCompanySections> {
  try {
    const [featured, recent] = await Promise.all([
      listFeaturedCompanies(citySlug),
      listRecentCompanies(citySlug)
    ]);

    return { featured, recent };
  } catch {
    return { featured: [], recent: [] };
  }
}

export async function searchPublicCompanies(
  citySlug: string,
  query: string
): Promise<PublicCompanyCard[]> {
  try {
    return await searchCompanies(citySlug, query);
  } catch {
    return [];
  }
}
