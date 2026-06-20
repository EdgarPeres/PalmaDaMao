import type { PublicCompanyDetail } from "@/modules/company/types/public-company";

type CompanyScheduleListProps = {
  schedules: PublicCompanyDetail["schedules"];
};

const dayLabels = ["Domingo", "Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado"];

export function CompanyScheduleList({ schedules }: CompanyScheduleListProps): React.ReactElement | null {
  if (schedules.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="schedule-title" className="space-y-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-primary">Atendimento</p>
        <h2 id="schedule-title" className="mt-1 text-xl font-black text-slate-950">
          Horarios
        </h2>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm shadow-sm">
        {schedules.map((schedule) => (
          <div className="flex justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0" key={schedule.id}>
            <span className="font-semibold text-slate-800">
              {dayLabels[schedule.dayOfWeek] ?? `Dia ${schedule.dayOfWeek}`}
            </span>
            <span className="text-right text-slate-600">
              {schedule.closed ? "Fechado" : [schedule.openTime, schedule.closeTime].filter(Boolean).join(" as ")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
