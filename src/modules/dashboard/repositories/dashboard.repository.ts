import { ClickEventType } from "@prisma/client";
import { prisma } from "@/lib/prisma/client";
import type { DashboardSummary } from "@/modules/dashboard/types/dashboard-summary";

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const [
    totalCompanies,
    activeCompanies,
    inactiveCompanies,
    totalCategories,
    totalViews,
    totalWhatsappClicks,
    totalInstagramClicks,
    totalMainLinkClicks,
    viewedCompanyGroups
  ] = await Promise.all([
    prisma.company.count({
      where: {
        deletedAt: null
      }
    }),
    prisma.company.count({
      where: {
        active: true,
        deletedAt: null
      }
    }),
    prisma.company.count({
      where: {
        active: false,
        deletedAt: null
      }
    }),
    prisma.category.count(),
    prisma.clickEvent.count({
      where: {
        type: ClickEventType.VIEW
      }
    }),
    prisma.clickEvent.count({
      where: {
        type: ClickEventType.WHATSAPP
      }
    }),
    prisma.clickEvent.count({
      where: {
        type: ClickEventType.INSTAGRAM
      }
    }),
    prisma.clickEvent.count({
      where: {
        type: ClickEventType.MAIN_LINK
      }
    }),
    prisma.clickEvent.groupBy({
      by: ["companyId"],
      where: {
        type: ClickEventType.VIEW
      },
      _count: {
        companyId: true
      },
      orderBy: {
        _count: {
          companyId: "desc"
        }
      },
      take: 5
    })
  ]);

  const companies = await prisma.company.findMany({
    where: {
      id: {
        in: viewedCompanyGroups.map((group) => group.companyId)
      }
    },
    select: {
      id: true,
      name: true
    }
  });

  const companyNamesById = new Map(companies.map((company) => [company.id, company.name]));

  return {
    totalCompanies,
    totalCategories,
    totalViews,
    totalWhatsappClicks,
    totalInstagramClicks,
    totalMainLinkClicks,
    activeCompanies,
    inactiveCompanies,
    mostViewedCompanies: viewedCompanyGroups.map((group) => ({
      id: group.companyId,
      name: companyNamesById.get(group.companyId) ?? "Empresa removida",
      views: group._count.companyId
    }))
  };
}
