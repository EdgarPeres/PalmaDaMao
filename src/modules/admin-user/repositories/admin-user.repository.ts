import { prisma } from "@/lib/prisma/client";
import type { AdminUserMutationInput } from "@/modules/admin-user/schemas/admin-user.schema";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export async function listAdminUsers(): Promise<AdminUser[]> {
  return prisma.userAdmin.findMany({
    orderBy: [{ active: "desc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      email: true,
      active: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

export async function createAdminUser(
  input: Omit<AdminUserMutationInput, "id" | "password"> & { passwordHash: string }
): Promise<void> {
  await prisma.userAdmin.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash: input.passwordHash,
      active: input.active
    }
  });
}

export async function updateAdminUser(
  input: Omit<AdminUserMutationInput, "password"> & { id: string; passwordHash?: string }
): Promise<void> {
  await prisma.userAdmin.update({
    where: { id: input.id },
    data: {
      name: input.name,
      email: input.email,
      active: input.active,
      ...(input.passwordHash ? { passwordHash: input.passwordHash } : {})
    }
  });
}

export async function findAdminUserStatus(id: string): Promise<{ active: boolean } | null> {
  return prisma.userAdmin.findUnique({
    where: { id },
    select: { active: true }
  });
}

export async function countActiveAdminUsers(): Promise<number> {
  return prisma.userAdmin.count({
    where: {
      active: true
    }
  });
}

export async function toggleAdminUserActive(id: string): Promise<void> {
  const admin = await findAdminUserStatus(id);

  if (!admin) {
    return;
  }

  await prisma.userAdmin.update({
    where: { id },
    data: {
      active: !admin.active
    }
  });
}
