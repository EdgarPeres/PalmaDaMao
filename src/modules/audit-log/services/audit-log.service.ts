import type { AuditAction, Prisma } from "@prisma/client";
import {
  createAuditLog,
  listAuditLogs,
  type CreateAuditLogInput
} from "@/modules/audit-log/repositories/audit-log.repository";

export async function getAdminAuditLogs() {
  try {
    return await listAuditLogs();
  } catch {
    return [];
  }
}

export async function recordAuditLog(input: CreateAuditLogInput): Promise<void> {
  try {
    await createAuditLog(input);
  } catch {
    // Audit failures must not block the primary admin workflow.
  }
}

export function buildAuditMetadata(metadata: Record<string, unknown>): Prisma.InputJsonObject {
  return metadata as Prisma.InputJsonObject;
}

export function formatAuditAction(action: AuditAction): string {
  const labels: Record<AuditAction, string> = {
    LOGIN: "Login",
    LOGOUT: "Logout",
    CREATE: "Criacao",
    UPDATE: "Edicao",
    DELETE: "Exclusao"
  };

  return labels[action];
}
