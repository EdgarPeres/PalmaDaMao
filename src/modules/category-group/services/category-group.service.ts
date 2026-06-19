import { listActiveCategoryGroups } from "@/modules/category-group/repositories/category-group.repository";
import type { PublicCategoryGroup } from "@/modules/category-group/types/public-category-group";

const fallbackGroups: PublicCategoryGroup[] = [
  { id: "alimentacao", name: "Alimentação", slug: "alimentacao", icon: null, color: null },
  { id: "saude", name: "Saúde", slug: "saude", icon: null, color: null },
  { id: "compras", name: "Compras", slug: "compras", icon: null, color: null },
  { id: "servicos", name: "Serviços", slug: "servicos", icon: null, color: null },
  { id: "lazer", name: "Lazer", slug: "lazer", icon: null, color: null },
  { id: "veiculos", name: "Veículos", slug: "veiculos", icon: null, color: null }
];

export async function getPublicCategoryGroups(): Promise<PublicCategoryGroup[]> {
  try {
    const groups = await listActiveCategoryGroups();
    return groups.length > 0 ? groups : fallbackGroups;
  } catch {
    return fallbackGroups;
  }
}
