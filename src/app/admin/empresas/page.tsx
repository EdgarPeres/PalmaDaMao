import { AdminPlaceholderPage } from "@/modules/admin/components/admin-placeholder-page";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";

export default async function AdminCompaniesPage(): Promise<React.ReactElement> {
  const session = await requireAdminSession();

  return (
    <AdminPlaceholderPage
      description="Área reservada para criar, editar, inativar, destacar e excluir logicamente empresas."
      title="Empresas"
      userEmail={session.user.email}
    />
  );
}
