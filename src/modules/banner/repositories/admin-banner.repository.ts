import { prisma } from "@/lib/prisma/client";
import type { BannerMutationInput } from "@/modules/banner/schemas/banner.schema";

export type AdminBanner = {
  id: string;
  title: string;
  imageUrl: string;
  order: number;
  active: boolean;
  createdAt: Date;
};

export async function listAdminBanners(): Promise<AdminBanner[]> {
  return prisma.banner.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      imageUrl: true,
      order: true,
      active: true,
      createdAt: true
    }
  });
}

export async function countActiveBanners(exceptId?: string): Promise<number> {
  return prisma.banner.count({
    where: {
      active: true,
      ...(exceptId ? { id: { not: exceptId } } : {})
    }
  });
}

export async function createBanner(input: BannerMutationInput): Promise<void> {
  await prisma.banner.create({
    data: {
      title: input.title,
      imageUrl: input.imageUrl,
      order: input.order,
      active: input.active
    }
  });
}

export async function updateBanner(input: BannerMutationInput & { id: string }): Promise<void> {
  await prisma.banner.update({
    where: { id: input.id },
    data: {
      title: input.title,
      imageUrl: input.imageUrl,
      order: input.order,
      active: input.active
    }
  });
}

export async function deleteBanner(id: string): Promise<AdminBanner> {
  return prisma.banner.delete({
    where: { id },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      order: true,
      active: true,
      createdAt: true
    }
  });
}
