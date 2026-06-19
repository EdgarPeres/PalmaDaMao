export default function MaintenancePage(): React.ReactElement {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-950">
      <section className="w-full max-w-md text-center">
        <p className="text-sm font-semibold text-primary">Palma da Mão</p>
        <h1 className="mt-3 text-2xl font-bold">Sistema em manutenção</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Estamos fazendo ajustes para melhorar sua experiência. Volte em breve.
        </p>
      </section>
    </main>
  );
}
