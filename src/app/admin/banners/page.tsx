import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { BannerForm } from "@/modules/banner/components/banner-form";
import { BannerTable } from "@/modules/banner/components/banner-table";
import { getAdminBanners } from "@/modules/banner/services/admin-banner.service";

export default async function AdminBannersPage(): Promise<React.ReactElement> {
  const [session, banners] = await Promise.all([requireAdminSession(), getAdminBanners()]);

  return (
    <AdminShell userEmail={session.user.email}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Banners</h2>
          <p className="mt-1 text-sm text-slate-600">
            Gerencie os banners exibidos na home. O MVP permite até 5 ativos.
          </p>
        </div>

        <BannerForm banners={banners} />
        <BannerTable banners={banners} />
      </div>
    </AdminShell>
  );
}
