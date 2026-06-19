import { NextResponse } from "next/server";
import { registerMetric } from "@/modules/metrics/repositories/metric.repository";
import { registerMetricSchema } from "@/modules/metrics/schemas/metric.schema";

export async function POST(request: Request): Promise<NextResponse> {
  const body: unknown = await request.json().catch(() => null);
  const parsed = registerMetricSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Dados inválidos." }, { status: 400 });
  }

  try {
    await registerMetric(parsed.data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Não foi possível registrar métrica." }, { status: 500 });
  }
}
