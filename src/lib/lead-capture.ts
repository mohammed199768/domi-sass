export type LeadKind = "consultation" | "contact";
export type LeadLanguage = "ar" | "en";
export type LeadContext = {
  originPath:string; originType:string; ctaLocation:string; language:LeadLanguage; referrer:string; landingPath:string;
  utmSource:string; utmMedium:string; utmCampaign:string; utmContent:string; utmTerm:string;
};
export type LeadSubmission = {
  kind:LeadKind; submissionId:string; name:string; phone:string; email:string; company:string; service:string;
  objective:string; note:string; currentState:string; context:LeadContext; websiteUrl?:string;
};

const ATTRIBUTION_KEY = "dominase:lead-attribution:v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

type StoredAttribution = { landingPath:string; referrer:string; utmSource:string; utmMedium:string; utmCampaign:string; utmContent:string; utmTerm:string };

export function captureLandingAttribution() {
  try {
    if (window.sessionStorage.getItem(ATTRIBUTION_KEY)) return;
    const query = new URLSearchParams(window.location.search);
    const stored:StoredAttribution = {
      landingPath:`${window.location.pathname}${window.location.search}`.slice(0, 500),
      referrer:document.referrer.slice(0, 700),
      utmSource:query.get("utm_source") || "", utmMedium:query.get("utm_medium") || "",
      utmCampaign:query.get("utm_campaign") || "", utmContent:query.get("utm_content") || "",
      utmTerm:query.get("utm_term") || "",
    };
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(stored));
  } catch {
    // Attribution is helpful context, never a prerequisite for submitting a lead.
  }
}

export function getLeadContext(input:{ originPath:string; originType:string; ctaLocation:string; language:LeadLanguage }):LeadContext {
  captureLandingAttribution();
  let stored:Partial<StoredAttribution> = {};
  try { stored = JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) || "{}") as Partial<StoredAttribution>; } catch { stored = {}; }
  const query = new URLSearchParams(window.location.search);
  const current = Object.fromEntries(UTM_KEYS.map((key) => [key, query.get(key) || ""]));
  return {
    ...input,
    referrer:String(stored.referrer || document.referrer || "").slice(0, 700),
    landingPath:String(stored.landingPath || window.location.pathname).slice(0, 500),
    utmSource:String(current.utm_source || stored.utmSource || ""),
    utmMedium:String(current.utm_medium || stored.utmMedium || ""),
    utmCampaign:String(current.utm_campaign || stored.utmCampaign || ""),
    utmContent:String(current.utm_content || stored.utmContent || ""),
    utmTerm:String(current.utm_term || stored.utmTerm || ""),
  };
}

export const createSubmissionId = () => globalThis.crypto.randomUUID();

export async function submitLead(submission:LeadSubmission) {
  const response = await fetch("/api/leads", {
    method:"POST", headers:{ "Content-Type":"application/json", Accept:"application/json" },
    body:JSON.stringify(submission), credentials:"same-origin",
  });
  const body = await response.json().catch(() => ({})) as { ok?:boolean };
  if (!response.ok || !body.ok) throw new Error("LEAD_SUBMISSION_FAILED");
  return body;
}
