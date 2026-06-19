import { AdminPlaceholderPage } from "@/modules/admin/components/admin-placeholder-page";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";

export default async function AdminSettingsPage(): Promise<React.ReactElement> {
  const session = await requireAdminSession();

  return (
    <AdminPlaceholderPage
      description="Área reservada para alterar nome do portal, slogan, cor principal, cidade padrão e modo manutenção."
      title="Configurações"
      userEmail={session.user.email}
    />
  );
}
