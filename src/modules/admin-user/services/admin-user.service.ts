import bcrypt from "bcryptjs";
import {
  countActiveAdminUsers,
  createAdminUser,
  findAdminUserStatus,
  listAdminUsers,
  toggleAdminUserActive,
  updateAdminUser
} from "@/modules/admin-user/repositories/admin-user.repository";
import type { AdminUserMutationInput } from "@/modules/admin-user/schemas/admin-user.schema";

export async function getAdminUsers() {
  try {
    return await listAdminUsers();
  } catch {
    return [];
  }
}

export async function saveAdminUser(input: AdminUserMutationInput): Promise<void> {
  const passwordHash = input.password ? await bcrypt.hash(input.password, 12) : undefined;

  if (input.id) {
    await updateAdminUser({
      id: input.id,
      name: input.name,
      email: input.email,
      active: input.active,
      ...(passwordHash ? { passwordHash } : {})
    });
    return;
  }

  if (!passwordHash) {
    throw new Error("Password hash is required for a new admin user.");
  }

  await createAdminUser({
    name: input.name,
    email: input.email,
    active: input.active,
    passwordHash
  });
}

export async function changeAdminUserStatus(id: string): Promise<void> {
  const admin = await findAdminUserStatus(id);

  if (!admin) {
    return;
  }

  if (admin.active) {
    const activeAdmins = await countActiveAdminUsers();

    if (activeAdmins <= 1) {
      return;
    }
  }

  await toggleAdminUserActive(id);
}
