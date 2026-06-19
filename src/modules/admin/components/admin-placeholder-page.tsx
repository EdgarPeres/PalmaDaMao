import { AdminShell } from "@/components/layout/admin-shell";

type AdminPlaceholderPageProps = {
  title: string;
  description: string;
  userEmail: string | null | undefined;
};

export function AdminPlaceholderPage({
  description,
  title,
  userEmail
}: AdminPlaceholderPageProps): React.ReactElement {
  return (
    <AdminShell userEmail={userEmail}>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
      </section>
    </AdminShell>
  );
}
