import { slugify } from "@/lib/utils/slugify";
import {
  createCompany,
  listAdminCompanies,
  softDeleteCompany,
  toggleCompanyActive,
  toggleCompanyFeatured,
  updateCompany
} from "@/modules/company/repositories/admin-company.repository";
import type { CompanyMutationInput } from "@/modules/company/schemas/company.schema";

export async function getAdminCompanies() {
  try {
    return await listAdminCompanies();
  } catch {
    return [];
  }
}

export async function saveCompany(input: CompanyMutationInput): Promise<void> {
  const slug = slugify(input.name);
  const normalizedInput = {
    ...input,
    featuredOrder: input.featuredOrder === "" ? null : input.featuredOrder
  };

  if (input.id) {
    await updateCompany({ ...normalizedInput, id: input.id, slug });
    return;
  }

  await createCompany({ ...normalizedInput, slug });
}

export async function removeCompany(id: string): Promise<void> {
  await softDeleteCompany(id);
}

export async function changeCompanyActiveStatus(id: string): Promise<void> {
  await toggleCompanyActive(id);
}

export async function changeCompanyFeaturedStatus(id: string): Promise<void> {
  await toggleCompanyFeatured(id);
}
