"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { recordAuditLog } from "@/modules/audit-log/services/audit-log.service";
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
    const session = await requireAdminSession();
    await saveCompany(parsed.data);
    await recordAuditLog({
      adminId: session.user.id,
      action: parsed.data.id ? "UPDATE" : "CREATE",
      entity: "Company",
      entityId: parsed.data.id || null,
      metadata: {
        name: parsed.data.name,
        active: parsed.data.active,
        featured: parsed.data.featured
      }
    });
    revalidatePath("/admin/empresas");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/logs");
    revalidatePath("/montividiu");

    return {
      ok: true,
      message: parsed.data.id ? "Empresa atualizada." : "Empresa criada."
    };
  } catch {
    return {
      ok: false,
      message: "Nao foi possivel salvar a empresa. Verifique dados duplicados ou invalidos."
    };
  }
}

export async function toggleCompanyActiveAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const session = await requireAdminSession();
  await changeCompanyActiveStatus(id);
  await recordAuditLog({
    adminId: session.user.id,
    action: "UPDATE",
    entity: "Company",
    entityId: id,
    metadata: { statusChanged: true }
  });
  revalidatePath("/admin/empresas");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/logs");
  revalidatePath("/montividiu");
}

export async function toggleCompanyFeaturedAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const session = await requireAdminSession();
  await changeCompanyFeaturedStatus(id);
  await recordAuditLog({
    adminId: session.user.id,
    action: "UPDATE",
    entity: "Company",
    entityId: id,
    metadata: { featuredChanged: true }
  });
  revalidatePath("/admin/empresas");
  revalidatePath("/admin/destaques");
  revalidatePath("/admin/logs");
  revalidatePath("/montividiu");
}

export async function softDeleteCompanyAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const session = await requireAdminSession();
  await removeCompany(id);
  await recordAuditLog({
    adminId: session.user.id,
    action: "DELETE",
    entity: "Company",
    entityId: id,
    metadata: { softDelete: true }
  });
  revalidatePath("/admin/empresas");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/logs");
  revalidatePath("/montividiu");
}

export async function updateCompanyHighlightAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  const featuredOrderValue = String(formData.get("featuredOrder") ?? "");

  if (!id) return;

  const session = await requireAdminSession();
  await saveCompanyHighlight(id, {
    featured: formData.get("featured") === "on",
    featuredOrder: featuredOrderValue ? Number(featuredOrderValue) : null
  });
  await recordAuditLog({
    adminId: session.user.id,
    action: "UPDATE",
    entity: "Company",
    entityId: id,
    metadata: {
      featured: formData.get("featured") === "on",
      featuredOrder: featuredOrderValue || null
    }
  });
  revalidatePath("/admin/destaques");
  revalidatePath("/admin/empresas");
  revalidatePath("/admin/logs");
  revalidatePath("/montividiu");
}
