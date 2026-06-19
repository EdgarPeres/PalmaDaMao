import { AdminPlaceholderPage } from "@/modules/admin/components/admin-placeholder-page";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";

export default async function AdminSuggestionsPage(): Promise<React.ReactElement> {
  const session = await requireAdminSession();

  return (
    <AdminPlaceholderPage
      description="Área reservada para visualizar sugestões e marcar como pendente, convertida ou ignorada."
      title="Sugestões"
      userEmail={session.user.email}
    />
  );
}
