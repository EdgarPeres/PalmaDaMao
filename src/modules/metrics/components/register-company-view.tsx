"use client";

import { useEffect } from "react";
import { getOrCreateMetricSessionId } from "@/modules/metrics/utils/metric-session";

type RegisterCompanyViewProps = {
  companyId: string;
};

export function RegisterCompanyView({ companyId }: RegisterCompanyViewProps): null {
  useEffect(() => {
    const sessionId = getOrCreateMetricSessionId();

    fetch("/api/metrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        companyId,
        type: "VIEW",
        sessionId
      })
    }).catch(() => undefined);
  }, [companyId]);

  return null;
}
