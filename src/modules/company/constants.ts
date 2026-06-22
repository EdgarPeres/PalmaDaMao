export const DEFAULT_COMPANY_LOGO_URL = "/uploads/system/default-company.png";

export const PUBLIC_COMPANY_SELECT = {
  id: true,
  name: true,
  slug: true,
  neighborhood: true,
  logoUrl: true,
  bannerUrl: true,
  featured: true,
  featuredOrder: true,
  createdAt: true,
  city: {
    select: {
      name: true,
      slug: true
    }
  },
  categories: {
    where: {
      category: {
        active: true,
        group: {
          active: true
        }
      }
    },
    select: {
      category: {
        select: {
          name: true,
          slug: true
        }
      }
    }
  }
} as const;
