const metricSessionStorageKey = "palma-da-mao-session-id";

export function getOrCreateMetricSessionId(): string {
  const existingSessionId = window.localStorage.getItem(metricSessionStorageKey);
  const sessionId = existingSessionId ?? crypto.randomUUID();

  if (!existingSessionId) {
    window.localStorage.setItem(metricSessionStorageKey, sessionId);
  }

  return sessionId;
}
