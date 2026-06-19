import { AdminPlaceholderPage } from "@/modules/admin/components/admin-placeholder-page";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";

export default async function AdminLogsPage(): Promise<React.ReactElement> {
  const session = await requireAdminSession();

  return (
    <AdminPlaceholderPage
      description="Área reservada para auditoria de login, logout, criação, edição e exclusão."
      title="Logs"
      userEmail={session.user.email}
    />
  );
}
