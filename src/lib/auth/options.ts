import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorizeAdmin } from "@/modules/auth/services/auth.service";
import { loginSchema } from "@/modules/auth/schemas/login.schema";
import { recordAuditLog } from "@/modules/audit-log/services/audit-log.service";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin/login"
  },
  providers: [
    CredentialsProvider({
      name: "Administrador",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        return authorizeAdmin(parsed.data);
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = String(token.id);
      }

      return session;
    }
  },
  events: {
    async signIn({ user }) {
      await recordAuditLog({
        adminId: user.id,
        action: "LOGIN",
        entity: "UserAdmin",
        entityId: user.id,
        metadata: {
          email: user.email
        }
      });
    },
    async signOut(message) {
      const adminId = "token" in message ? message.token?.id : undefined;

      await recordAuditLog({
        adminId: adminId ? String(adminId) : null,
        action: "LOGOUT",
        entity: "UserAdmin",
        entityId: adminId ? String(adminId) : null
      });
    }
  }
};
