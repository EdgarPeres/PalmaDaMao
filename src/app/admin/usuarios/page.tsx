import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { AdminUserForm } from "@/modules/admin-user/components/admin-user-form";
import { AdminUserTable } from "@/modules/admin-user/components/admin-user-table";
import { getAdminUsers } from "@/modules/admin-user/services/admin-user.service";

export default async function AdminUsersPage(): Promise<React.ReactElement> {
  const [session, users] = await Promise.all([requireAdminSession(), getAdminUsers()]);

  return (
    <AdminShell userEmail={session.user.email}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Administradores</h2>
          <p className="mt-1 text-sm text-slate-600">
            Gerencie acessos administrativos sem roles ou permissoes diferenciadas no MVP.
          </p>
        </div>

        <AdminUserForm users={users} />
        <AdminUserTable users={users} />
      </div>
    </AdminShell>
  );
}
