import { formatAuditAction } from "@/modules/audit-log/services/audit-log.service";
import type { AdminAuditLog } from "@/modules/audit-log/repositories/audit-log.repository";

type AuditLogTableProps = {
  logs: AdminAuditLog[];
};

function formatMetadata(metadata: AdminAuditLog["metadata"]): string {
  if (!metadata || typeof metadata !== "object") {
    return "-";
  }

  const entries = Object.entries(metadata)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(([key, value]) => `${key}: ${String(value)}`);

  return entries.length > 0 ? entries.join(" | ") : "-";
}

export function AuditLogTable({ logs }: AuditLogTableProps): React.ReactElement {
  if (logs.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
        Nenhum log registrado ainda.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Data</th>
              <th className="px-4 py-3 font-semibold">Admin</th>
              <th className="px-4 py-3 font-semibold">Acao</th>
              <th className="px-4 py-3 font-semibold">Entidade</th>
              <th className="px-4 py-3 font-semibold">Detalhes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-4 py-3 text-slate-600">
                  {new Intl.DateTimeFormat("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short"
                  }).format(log.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-950">{log.admin?.name ?? "Sistema"}</div>
                  <div className="text-xs text-slate-500">{log.admin?.email ?? "-"}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {formatAuditAction(log.action)}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  <div>{log.entity}</div>
                  <div className="text-xs text-slate-400">{log.entityId ?? "-"}</div>
                </td>
                <td className="px-4 py-3 text-slate-600">{formatMetadata(log.metadata)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
