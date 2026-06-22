export type DashboardSummary = {
  totalCompanies: number;
  totalCategories: number;
  totalViews: number;
  totalWhatsappClicks: number;
  totalInstagramClicks: number;
  totalMainLinkClicks: number;
  activeCompanies: number;
  inactiveCompanies: number;
  mostViewedCompanies: Array<{
    id: string;
    name: string;
    views: number;
  }>;
};
