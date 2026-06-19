import { AdminPlaceholderPage } from "@/modules/admin/components/admin-placeholder-page";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";

export default async function AdminBannersPage(): Promise<React.ReactElement> {
  const session = await requireAdminSession();

  return (
    <AdminPlaceholderPage
      description="Área reservada para cadastrar até 5 banners ativos e excluir banners fisicamente."
      title="Banners"
      userEmail={session.user.email}
    />
  );
}
