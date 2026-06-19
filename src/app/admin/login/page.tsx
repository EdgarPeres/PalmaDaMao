import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { LoginForm } from "@/modules/auth/components/login-form";
import { authOptions } from "@/lib/auth/options";

export default async function AdminLoginPage(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 text-slate-950">
      <section className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-primary">Palma da Mão</p>
        <h1 className="mt-2 text-2xl font-bold">Entrar no painel</h1>
        <p className="mt-2 text-sm text-slate-600">Acesso restrito aos administradores.</p>
        <LoginForm />
      </section>
    </main>
  );
}
