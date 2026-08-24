export type DominaseEventName =
  | "consultation_open"
  | "consultation_step_1_complete"
  | "consultation_step_2_complete"
  | "consultation_submit"
  | "consultation_success"
  | "related_service_click"
  | "related_work_click"
  | "related_insight_click";

export type DominaseEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: DominaseEventParams) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackDominaseEvent(name: DominaseEventName, params: DominaseEventParams = {}) {
  if (typeof window === "undefined") return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined));
  if (typeof window.gtag === "function") {
    window.gtag("event", name, clean);
    return;
  }
  window.dataLayer?.push({ event: name, ...clean });
}
