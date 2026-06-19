import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { CategoryGroupForm } from "@/modules/category-group/components/category-group-form";
import { CategoryGroupTable } from "@/modules/category-group/components/category-group-table";
import { getAdminCategoryGroups } from "@/modules/category-group/services/admin-category-group.service";

export default async function AdminGroupsPage(): Promise<React.ReactElement> {
  const [session, groups] = await Promise.all([requireAdminSession(), getAdminCategoryGroups()]);

  return (
    <AdminShell userEmail={session.user.email}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Grupos</h2>
          <p className="mt-1 text-sm text-slate-600">
            Gerencie os grupos usados para organizar categorias no portal público.
          </p>
        </div>

        <CategoryGroupForm groups={groups} />
        <CategoryGroupTable groups={groups} />
      </div>
    </AdminShell>
  );
}
