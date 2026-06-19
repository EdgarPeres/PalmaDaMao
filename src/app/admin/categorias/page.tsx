import { AdminPlaceholderPage } from "@/modules/admin/components/admin-placeholder-page";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";

export default async function AdminCategoriesPage(): Promise<React.ReactElement> {
  const session = await requireAdminSession();

  return (
    <AdminPlaceholderPage
      description="Área reservada para gestão de categorias vinculadas aos grupos."
      title="Categorias"
      userEmail={session.user.email}
    />
  );
}
