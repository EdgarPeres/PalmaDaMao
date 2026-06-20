"use client";

import { useEffect } from "react";

type RegisterCompanyViewProps = {
  companyId: string;
};

const sessionStorageKey = "palma-da-mao-session-id";

export function RegisterCompanyView({ companyId }: RegisterCompanyViewProps): null {
  useEffect(() => {
    const existingSessionId = window.localStorage.getItem(sessionStorageKey);
    const sessionId = existingSessionId ?? crypto.randomUUID();

    if (!existingSessionId) {
      window.localStorage.setItem(sessionStorageKey, sessionId);
    }

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
