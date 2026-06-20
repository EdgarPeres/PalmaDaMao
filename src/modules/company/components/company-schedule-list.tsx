import type { PublicCompanyDetail } from "@/modules/company/types/public-company";

type CompanyScheduleListProps = {
  schedules: PublicCompanyDetail["schedules"];
};

const dayLabels = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export function CompanyScheduleList({ schedules }: CompanyScheduleListProps): React.ReactElement | null {
  if (schedules.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="schedule-title" className="space-y-3">
      <h2 id="schedule-title" className="text-lg font-semibold">
        Horários
      </h2>
      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm shadow-sm">
        {schedules.map((schedule) => (
          <div className="flex justify-between gap-4 py-2" key={schedule.id}>
            <span className="font-medium">{dayLabels[schedule.dayOfWeek] ?? `Dia ${schedule.dayOfWeek}`}</span>
            <span className="text-slate-600">
              {schedule.closed ? "Fechado" : [schedule.openTime, schedule.closeTime].filter(Boolean).join(" às ")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
