import {
  Building2,
  Images,
  LayoutDashboard,
  ListTree,
  Logs,
  LogOut,
  Megaphone,
  Settings,
  Sparkles,
  Tags,
  UserCog
} from "lucide-react";

type AdminShellProps = {
  children: React.ReactNode;
  userEmail: string | null | undefined;
};

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Empresas", href: "/admin/empresas", icon: Building2 },
  { label: "Categorias", href: "/admin/categorias", icon: Tags },
  { label: "Grupos", href: "/admin/grupos", icon: ListTree },
  { label: "Banners", href: "/admin/banners", icon: Images },
  { label: "Destaques", href: "/admin/destaques", icon: Sparkles },
  { label: "Sugestoes", href: "/admin/sugestoes", icon: Megaphone },
  { label: "Usuarios", href: "/admin/usuarios", icon: UserCog },
  { label: "Logs", href: "/admin/logs", icon: Logs },
  { label: "Configuracoes", href: "/admin/configuracoes", icon: Settings }
];

export function AdminShell({ children, userEmail }: AdminShellProps): React.ReactElement {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-16 w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Painel administrativo</p>
              <h1 className="text-lg font-bold">Palma da Mao</h1>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className="hidden sm:inline">{userEmail}</span>
              <a className="inline-flex items-center gap-2 font-semibold text-primary" href="/api/auth/signout">
                <LogOut aria-hidden="true" className="h-4 w-4" />
                Sair
              </a>
            </div>
          </div>
          <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" aria-label="Admin">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md bg-slate-100 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                  href={item.href}
                  key={item.href}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>
      <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">{children}</section>
    </main>
  );
}
