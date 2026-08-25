import "server-only";
import { createHmac } from "node:crypto";
import type { LeadSubmission } from "@/lib/lead-capture";

const isRecord = (value:unknown):value is Record<string,unknown> => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const allowedServices = new Set(["website","platform","system","education","clinic","ux","unsure","other"]);
const allowedInput = new Set(["kind","submissionId","name","phone","email","company","service","objective","note","currentState","context"]);
const allowedContext = new Set(["originPath","originType","ctaLocation","language","referrer","landingPath","utmSource","utmMedium","utmCampaign","utmContent","utmTerm"]);

function clean(value:unknown, name:string, max:number, required=false) {
  if (typeof value !== "string") { if (!required && value == null) return ""; throw new Error(`INVALID_${name}`); }
  const result = value.trim();
  if ((required && !result) || result.length > max || result.includes("\0")) throw new Error(`INVALID_${name}`);
  return result;
}
function path(value:unknown, name:string) {
  const result = clean(value, name, 500);
  if (result && (!result.startsWith("/") || result.startsWith("//"))) throw new Error(`INVALID_${name}`);
  return result;
}
function referrer(value:unknown) {
  const result = clean(value, "REFERRER", 700);
  if (!result) return "";
  try { const url = new URL(result); if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error(); }
  catch { throw new Error("INVALID_REFERRER"); }
  return result;
}

export function validateLeadSubmission(value:unknown):LeadSubmission {
  if (!isRecord(value) || Object.keys(value).some((key) => !allowedInput.has(key))) throw new Error("INVALID_PAYLOAD");
  if (value.kind !== "consultation" && value.kind !== "contact") throw new Error("INVALID_KIND");
  const submissionId = clean(value.submissionId, "SUBMISSION_ID", 100, true);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) throw new Error("INVALID_SUBMISSION_ID");
  const name = clean(value.name, "NAME", 120, true);
  const phone = clean(value.phone, "PHONE", 30);
  const email = clean(value.email, "EMAIL", 254).toLowerCase();
  const digits = phone.replace(/\D/g, "");
  if (!digits && !email) throw new Error("CONTACT_REQUIRED");
  if (digits && (digits.length < 7 || digits.length > 18)) throw new Error("INVALID_PHONE");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("INVALID_EMAIL");
  const service = clean(value.service, "SERVICE", 40, true);
  if (!allowedServices.has(service)) throw new Error("INVALID_SERVICE");
  const context = value.context;
  if (!isRecord(context) || Object.keys(context).some((key) => !allowedContext.has(key))) throw new Error("INVALID_CONTEXT");
  if (context.language !== "ar" && context.language !== "en") throw new Error("INVALID_LANGUAGE");
  return {
    kind:value.kind, submissionId, name, phone, email, company:clean(value.company, "COMPANY", 160), service,
    objective:clean(value.objective, "OBJECTIVE", 1200, true), note:clean(value.note, "NOTE", 2000),
    currentState:clean(value.currentState, "CURRENT_STATE", 1200),
    context:{
      originPath:path(context.originPath, "ORIGIN_PATH"), originType:clean(context.originType, "ORIGIN_TYPE", 80, true),
      ctaLocation:clean(context.ctaLocation, "CTA_LOCATION", 120, true), language:context.language,
      referrer:referrer(context.referrer), landingPath:path(context.landingPath, "LANDING_PATH"),
      utmSource:clean(context.utmSource, "UTM_SOURCE", 120), utmMedium:clean(context.utmMedium, "UTM_MEDIUM", 120),
      utmCampaign:clean(context.utmCampaign, "UTM_CAMPAIGN", 160), utmContent:clean(context.utmContent, "UTM_CONTENT", 160),
      utmTerm:clean(context.utmTerm, "UTM_TERM", 160),
    },
  };
}

function crmEndpoint() {
  const configured = process.env.DOMINASE_CRM_BASE_URL?.trim();
  if (!configured) throw new Error("INTEGRATION_NOT_CONFIGURED");
  const base = new URL(configured);
  const local = base.hostname === "localhost" || base.hostname === "127.0.0.1";
  if (base.protocol !== "https:" && !(local && base.protocol === "http:")) throw new Error("INTEGRATION_NOT_CONFIGURED");
  return new URL("/api/integrations/website/leads", base).toString();
}

export async function sendLeadToCrm(input:LeadSubmission) {
  const secret = process.env.DOMINASE_CRM_INGEST_SECRET?.trim();
  if (!secret || secret.length < 32) throw new Error("INTEGRATION_NOT_CONFIGURED");
  const body = JSON.stringify(input);
  const timestamp = String(Date.now());
  const signature = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
  const response = await fetch(crmEndpoint(), {
    method:"POST", redirect:"error", cache:"no-store", signal:AbortSignal.timeout(10_000),
    headers:{ "Content-Type":"application/json", Accept:"application/json", "x-dominase-timestamp":timestamp, "x-dominase-signature":signature },
    body,
  });
  const result = await response.json().catch(() => ({})) as { ok?:boolean; error?:string };
  if (!response.ok || !result.ok) {
    if (response.status === 429) throw new Error("RATE_LIMITED");
    if (response.status === 409) throw new Error("SUBMISSION_IN_PROGRESS");
    throw new Error("CRM_UNAVAILABLE");
  }
  return result;
}

export async function notifyFormspree(input:LeadSubmission) {
  const endpoint = process.env.FORMSPREE_ENDPOINT?.trim();
  if (!endpoint) return;
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:" || url.hostname !== "formspree.io") throw new Error("invalid endpoint");
    const response = await fetch(url, {
      method:"POST", redirect:"error", signal:AbortSignal.timeout(5_000),
      headers:{ "Content-Type":"application/json", Accept:"application/json" },
      body:JSON.stringify({ name:input.name, phone:input.phone, email:input.email, company:input.company, service:input.service, objective:input.objective, note:input.note, current_state:input.currentState, origin_page:input.context.originPath, cta_location:input.context.ctaLocation, _subject:`DOMINASE ${input.kind} — ${input.service}` }),
    });
    if (!response.ok) throw new Error("notification rejected");
  } catch {
    console.warn("[lead-notification] Formspree notification failed");
  }
}
