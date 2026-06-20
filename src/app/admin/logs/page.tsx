import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdminSession } from "@/modules/admin/utils/require-admin-session";
import { AuditLogTable } from "@/modules/audit-log/components/audit-log-table";
import { getAdminAuditLogs } from "@/modules/audit-log/services/audit-log.service";

export default async function AdminLogsPage(): Promise<React.ReactElement> {
  const [session, logs] = await Promise.all([requireAdminSession(), getAdminAuditLogs()]);

  return (
    <AdminShell userEmail={session.user.email}>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Logs</h2>
          <p className="mt-1 text-sm text-slate-600">
            Acompanhe os eventos administrativos recentes do portal.
          </p>
        </div>

        <AuditLogTable logs={logs} />
      </div>
    </AdminShell>
  );
}
