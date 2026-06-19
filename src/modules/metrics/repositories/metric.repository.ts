import { prisma } from "@/lib/prisma/client";
import type { RegisterMetricInput } from "@/modules/metrics/schemas/metric.schema";

export async function registerMetric(input: RegisterMetricInput): Promise<void> {
  await prisma.clickEvent.create({
    data: input
  });
}
