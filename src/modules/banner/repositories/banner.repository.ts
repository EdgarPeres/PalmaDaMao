import { prisma } from "@/lib/prisma/client";

export type PublicBanner = {
  id: string;
  title: string;
  imageUrl: string;
};

export async function listActiveBanners(): Promise<PublicBanner[]> {
  return prisma.banner.findMany({
    where: { active: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: 5,
    select: {
      id: true,
      title: true,
      imageUrl: true
    }
  });
}
