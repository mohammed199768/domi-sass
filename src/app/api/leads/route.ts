import { createHash } from "node:crypto";
import { notifyFormspree, sendLeadToCrm, validateLeadSubmission } from "@/lib/server/crm-lead-integration";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 8;
const attempts = new Map<string, { count:number; resetAt:number }>();
const json = (body:Record<string,unknown>, status=200) => Response.json(body, { status, headers:{ "Cache-Control":"no-store" } });
const isRecord = (value:unknown):value is Record<string,unknown> => Boolean(value) && typeof value === "object" && !Array.isArray(value);

function assertExpectedBrowserRequest(req:Request) {
  const site = req.headers.get("sec-fetch-site");
  if (site === "cross-site") throw new Error("CROSS_SITE_REQUEST_BLOCKED");
  const origin = req.headers.get("origin");
  const requestOrigin = new URL(req.url).origin;
  const configured = (process.env.DOMINASE_WEBSITE_ALLOWED_ORIGINS || "").split(",").map((item) => item.trim()).filter(Boolean);
  const allowed = new Set(["https://dominase.art", "https://www.dominase.art", ...configured]);
  if (process.env.NODE_ENV !== "production") allowed.add(requestOrigin);
  if (origin && !allowed.has(origin)) throw new Error("CROSS_SITE_REQUEST_BLOCKED");
  if (!origin && site !== "same-origin" && process.env.NODE_ENV === "production") throw new Error("CROSS_SITE_REQUEST_BLOCKED");
}

function rateLimitKey(req:Request) {
  const forwarded = req.headers.get("x-nf-client-connection-ip") || req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return createHash("sha256").update(forwarded).digest("hex");
}

function enforceRateLimit(req:Request) {
  const now = Date.now();
  if (attempts.size > 10_000) for (const [key, value] of attempts) if (value.resetAt <= now) attempts.delete(key);
  const key = rateLimitKey(req);
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) { attempts.set(key, { count:1, resetAt:now + WINDOW_MS }); return; }
  current.count += 1;
  if (current.count > MAX_PER_WINDOW) throw new Error("RATE_LIMITED");
}

export async function POST(req:Request) {
  const length = Number(req.headers.get("content-length") || 0);
  if (length > 24 * 1024) return json({ error:"REQUEST_TOO_LARGE" }, 413);
  if (!(req.headers.get("content-type") || "").toLowerCase().startsWith("application/json")) return json({ error:"UNSUPPORTED_MEDIA_TYPE" }, 415);
  try {
    assertExpectedBrowserRequest(req);
    enforceRateLimit(req);
    const raw = await req.text();
    if (Buffer.byteLength(raw, "utf8") > 24 * 1024) return json({ error:"REQUEST_TOO_LARGE" }, 413);
    const parsed:unknown = JSON.parse(raw);
    if (!isRecord(parsed)) throw new Error("INVALID_PAYLOAD");
    if (typeof parsed.websiteUrl === "string" && parsed.websiteUrl.trim()) return json({ ok:true });
    const candidate = { ...parsed };
    delete candidate.websiteUrl;
    const input = validateLeadSubmission(candidate);
    await sendLeadToCrm(input);
    await notifyFormspree(input);
    return json({ ok:true });
  } catch (error) {
    const code = error instanceof SyntaxError ? "INVALID_JSON" : error instanceof Error ? error.message : "INTERNAL_ERROR";
    const status = code === "CROSS_SITE_REQUEST_BLOCKED" ? 403 : code === "RATE_LIMITED" ? 429 : code === "SUBMISSION_IN_PROGRESS" ? 409 : code.startsWith("INVALID_") || code === "CONTACT_REQUIRED" ? 400 : 503;
    if (status === 503) console.error("[website-lead-proxy] CRM submission failed", { code });
    return json({ error:status === 503 ? "SERVICE_UNAVAILABLE" : code }, status);
  }
}
