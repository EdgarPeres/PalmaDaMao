import { AdminPlaceholderPage } from "@/modules/admin/components/admin-placeholder-page";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";

export default async function AdminUsersPage(): Promise<React.ReactElement> {
  const session = await requireAdminSession();

  return (
    <AdminPlaceholderPage
      description="Área reservada para gerenciar administradores. Todos possuem os mesmos poderes no MVP."
      title="Administradores"
      userEmail={session.user.email}
    />
  );
}
