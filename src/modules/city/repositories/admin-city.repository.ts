import { prisma } from "@/lib/prisma/client";

export type AdminCityOption = {
  id: string;
  name: string;
  state: string;
  slug: string;
  active: boolean;
};

export async function listAdminCityOptions(): Promise<AdminCityOption[]> {
  return prisma.city.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      state: true,
      slug: true,
      active: true
    }
  });
}
