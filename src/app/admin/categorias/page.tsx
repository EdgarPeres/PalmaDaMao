import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { CategoryForm } from "@/modules/category/components/category-form";
import { CategoryTable } from "@/modules/category/components/category-table";
import { getAdminCategories } from "@/modules/category/services/admin-category.service";
import { getAdminCategoryGroups } from "@/modules/category-group/services/admin-category-group.service";

export default async function AdminCategoriesPage(): Promise<React.ReactElement> {
  const [session, categories, groups] = await Promise.all([
    requireAdminSession(),
    getAdminCategories(),
    getAdminCategoryGroups()
  ]);

  return (
    <AdminShell userEmail={session.user.email}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Categorias</h2>
          <p className="mt-1 text-sm text-slate-600">
            Gerencie as categorias vinculadas aos grupos do portal.
          </p>
        </div>

        {groups.length === 0 ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Cadastre ao menos um grupo antes de criar categorias.
          </div>
        ) : null}

        <CategoryForm categories={categories} groups={groups} />
        <CategoryTable categories={categories} />
      </div>
    </AdminShell>
  );
}
