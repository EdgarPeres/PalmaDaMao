import { prisma } from "@/lib/prisma/client";

export type AuthAdminUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  active: boolean;
};

export async function findActiveAdminByEmail(email: string): Promise<AuthAdminUser | null> {
  return prisma.userAdmin.findUnique({
    where: {
      email
    },
    select: {
      id: true,
      name: true,
      email: true,
      passwordHash: true,
      active: true
    }
  });
}
