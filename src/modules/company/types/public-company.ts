import { DEFAULT_COMPANY_LOGO_URL } from "@/modules/company/constants";

export type PublicCompanyCard = {
  id: string;
  name: string;
  slug: string;
  citySlug: string;
  cityName: string;
  neighborhood: string | null;
  logoUrl: string;
  bannerUrl: string | null;
  categories: Array<{
    name: string;
    slug: string;
  }>;
};

export type PublicCompanyDetail = PublicCompanyCard & {
  description: string;
  whatsapp: string | null;
  phone: string | null;
  instagram: string | null;
  website: string | null;
  mainLink: string | null;
  photos: Array<{
    id: string;
    imageUrl: string;
    order: number;
  }>;
  schedules: Array<{
    id: string;
    dayOfWeek: number;
    openTime: string | null;
    closeTime: string | null;
    closed: boolean;
  }>;
};

type CompanyRecord = {
  id: string;
  name: string;
  slug: string;
  neighborhood: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  city: {
    name: string;
    slug: string;
  };
  categories: Array<{
    category: {
      name: string;
      slug: string;
    };
  }>;
};

type CompanyDetailRecord = CompanyRecord & {
  description: string;
  whatsapp: string | null;
  phone: string | null;
  instagram: string | null;
  website: string | null;
  mainLink: string | null;
  photos: Array<{
    id: string;
    imageUrl: string;
    order: number;
  }>;
  schedules: Array<{
    id: string;
    dayOfWeek: number;
    openTime: string | null;
    closeTime: string | null;
    closed: boolean;
  }>;
};

export function toPublicCompanyCard(company: CompanyRecord): PublicCompanyCard {
  return {
    id: company.id,
    name: company.name,
    slug: company.slug,
    citySlug: company.city.slug,
    cityName: company.city.name,
    neighborhood: company.neighborhood,
    logoUrl: company.logoUrl || DEFAULT_COMPANY_LOGO_URL,
    bannerUrl: company.bannerUrl,
    categories: company.categories.map(({ category }) => category)
  };
}

export function toPublicCompanyDetail(company: CompanyDetailRecord): PublicCompanyDetail {
  return {
    ...toPublicCompanyCard(company),
    description: company.description,
    whatsapp: company.whatsapp,
    phone: company.phone,
    instagram: company.instagram,
    website: company.website,
    mainLink: company.mainLink,
    photos: company.photos,
    schedules: company.schedules
  };
}
