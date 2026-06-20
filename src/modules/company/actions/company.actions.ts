"use server";

import { revalidatePath } from "next/cache";
import {
  changeCompanyActiveStatus,
  changeCompanyFeaturedStatus,
  removeCompany,
  saveCompanyHighlight,
  saveCompany
} from "@/modules/company/services/admin-company.service";
import { companyMutationSchema } from "@/modules/company/schemas/company.schema";

export type CompanyActionState = {
  ok: boolean;
  message: string;
};

function parsePhotos(formData: FormData) {
  return String(formData.get("photosText") ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((imageUrl, index) => ({
      imageUrl,
      order: index
    }));
}

function parseSchedules(formData: FormData) {
  return Array.from({ length: 7 }, (_, dayOfWeek) => ({
    dayOfWeek,
    openTime: formData.get(`scheduleOpen-${dayOfWeek}`) || undefined,
    closeTime: formData.get(`scheduleClose-${dayOfWeek}`) || undefined,
    closed: formData.get(`scheduleClosed-${dayOfWeek}`) === "on"
  })).filter((schedule) => schedule.closed || schedule.openTime || schedule.closeTime);
}

export async function saveCompanyAction(
  _state: CompanyActionState,
  formData: FormData
): Promise<CompanyActionState> {
  const parsed = companyMutationSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    cityId: formData.get("cityId"),
    description: formData.get("description"),
    neighborhood: formData.get("neighborhood") || undefined,
    phone: formData.get("phone") || undefined,
    whatsapp: formData.get("whatsapp") || undefined,
    instagram: formData.get("instagram") || undefined,
    website: formData.get("website") || undefined,
    mainLink: formData.get("mainLink") || undefined,
    logoUrl: formData.get("logoUrl") || undefined,
    bannerUrl: formData.get("bannerUrl") || undefined,
    active: formData.get("active") === "on",
    featured: formData.get("featured") === "on",
    featuredOrder: formData.get("featuredOrder") || "",
    categoryIds: formData.getAll("categoryIds"),
    photos: parsePhotos(formData),
    schedules: parseSchedules(formData)
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Revise os dados enviados."
    };
  }

  try {
    await saveCompany(parsed.data);
    revalidatePath("/admin/empresas");
    revalidatePath("/admin/dashboard");
    revalidatePath("/montividiu");

    return {
      ok: true,
      message: parsed.data.id ? "Empresa atualizada." : "Empresa criada."
    };
  } catch {
    return {
      ok: false,
      message: "Não foi possível salvar a empresa. Verifique dados duplicados ou inválidos."
    };
  }
}

export async function toggleCompanyActiveAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await changeCompanyActiveStatus(id);
  revalidatePath("/admin/empresas");
  revalidatePath("/montividiu");
}

export async function toggleCompanyFeaturedAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await changeCompanyFeaturedStatus(id);
  revalidatePath("/admin/empresas");
  revalidatePath("/montividiu");
}

export async function softDeleteCompanyAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await removeCompany(id);
  revalidatePath("/admin/empresas");
  revalidatePath("/admin/dashboard");
  revalidatePath("/montividiu");
}

export async function updateCompanyHighlightAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  const featuredOrderValue = String(formData.get("featuredOrder") ?? "");

  if (!id) return;

  await saveCompanyHighlight(id, {
    featured: formData.get("featured") === "on",
    featuredOrder: featuredOrderValue ? Number(featuredOrderValue) : null
  });
  revalidatePath("/admin/destaques");
  revalidatePath("/admin/empresas");
  revalidatePath("/montividiu");
}
