import { getDashboardSummary } from "@/modules/dashboard/repositories/dashboard.repository";
import type { DashboardSummary } from "@/modules/dashboard/types/dashboard-summary";

const fallbackSummary: DashboardSummary = {
  totalCompanies: 0,
  totalCategories: 0,
  totalViews: 0,
  totalWhatsappClicks: 0,
  mostViewedCompanies: []
};

export async function getAdminDashboardSummary(): Promise<DashboardSummary> {
  try {
    return await getDashboardSummary();
  } catch {
    return fallbackSummary;
  }
}
