import type { SuggestionStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma/client";

export type AdminSuggestion = {
  id: string;
  name: string;
  category: string;
  phone: string;
  status: SuggestionStatus;
  createdAt: Date;
};

export async function listAdminSuggestions(): Promise<AdminSuggestion[]> {
  return prisma.companySuggestion.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      category: true,
      phone: true,
      status: true,
      createdAt: true
    }
  });
}

export async function updateSuggestionStatus(id: string, status: SuggestionStatus): Promise<void> {
  await prisma.companySuggestion.update({
    where: { id },
    data: { status }
  });
}
