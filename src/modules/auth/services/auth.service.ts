import bcrypt from "bcryptjs";
import { findActiveAdminByEmail } from "@/modules/auth/repositories/admin-user.repository";
import type { LoginInput } from "@/modules/auth/schemas/login.schema";

export type AuthorizedAdmin = {
  id: string;
  name: string;
  email: string;
};

export async function authorizeAdmin(input: LoginInput): Promise<AuthorizedAdmin | null> {
  const admin = await findActiveAdminByEmail(input.email);

  if (!admin?.active) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(input.password, admin.passwordHash);

  if (!passwordMatches) {
    return null;
  }

  return {
    id: admin.id,
    name: admin.name,
    email: admin.email
  };
}
