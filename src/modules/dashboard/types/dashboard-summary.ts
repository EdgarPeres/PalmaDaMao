export type DashboardSummary = {
  totalCompanies: number;
  totalCategories: number;
  totalViews: number;
  totalWhatsappClicks: number;
  mostViewedCompanies: Array<{
    id: string;
    name: string;
    views: number;
  }>;
};
