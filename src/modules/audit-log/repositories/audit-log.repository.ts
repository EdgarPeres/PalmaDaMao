import type { AuditAction, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma/client";

export type AdminAuditLog = {
  id: string;
  action: AuditAction;
  entity: string;
  entityId: string | null;
  metadata: Prisma.JsonValue;
  createdAt: Date;
  admin: {
    name: string;
    email: string;
  } | null;
};

export type CreateAuditLogInput = {
  adminId?: string | null;
  action: AuditAction;
  entity: string;
  entityId?: string | null;
  metadata?: Prisma.InputJsonValue;
};

export async function listAuditLogs(limit = 100): Promise<AdminAuditLog[]> {
  return prisma.auditLog.findMany({
    orderBy: {
      createdAt: "desc"
    },
    take: limit,
    select: {
      id: true,
      action: true,
      entity: true,
      entityId: true,
      metadata: true,
      createdAt: true,
      admin: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });
}

export async function createAuditLog(input: CreateAuditLogInput): Promise<void> {
  await prisma.auditLog.create({
    data: {
      adminId: input.adminId || null,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId || null,
      metadata: input.metadata ?? undefined
    }
  });
}
