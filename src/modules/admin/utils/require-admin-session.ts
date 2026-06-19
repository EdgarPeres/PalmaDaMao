import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/options";

type RequiredAdminSession = Session & {
  user: NonNullable<Session["user"]>;
};

export async function requireAdminSession(): Promise<RequiredAdminSession> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  return session as RequiredAdminSession;
}
