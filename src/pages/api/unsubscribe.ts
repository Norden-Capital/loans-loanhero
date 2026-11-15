/* POST /api/unsubscribe — the /unsubscribe form sends here.
   This server route passes the request on to the LMS (api.nordencapital.ca),
   the same way the apply form does. The shared password stays on the server.

   Vercel env vars (same names as the apply form):
     LMS_URL       https://api.nordencapital.ca
     PROXY_SECRET  shared password (set by the owner, never in the code)

   Test mode: when one of them is missing (local work, or before launch),
   nothing is sent anywhere and the page shows "Something went wrong".
   It never pretends the unsubscribe worked.                               */
import type { APIRoute } from "astro";

// Runs on the server (a Vercel function) for every request, never prebuilt.
export const prerender = false;

// LMS contract (from Backend):
//   POST {LMS_URL}/api/public/unsubscribes
//   Headers: X-Proxy-Secret, X-Client-IP
//   Body: { host, email, reason: code | null, otherText (only for OTHER, max 300) }
//   Answers: 200 ok · 400 bad email · 403 wrong secret · 429 too many tries
const HOST = "loanhero.ca";
const LMS_PATH = "/api/public/unsubscribes";
const LMS_TIMEOUT_MS = 10_000;

// The words on the page → the codes the LMS stores.
const REASON_CODES: Record<string, string> = {
  "Too many emails": "TOO_MANY_EMAILS",
  "Not interested anymore": "NOT_INTERESTED",
  "I already got a loan": "ALREADY_GOT_LOAN",
  "I never signed up": "NEVER_SIGNED_UP",
  Other: "OTHER",
};
const LIMITS = { email: 200, otherText: 300, body: 4_000 };

// Best-effort throttle, as in /api/contact. Each serverless instance keeps its
// own map, so this slows floods; the LMS has its own limit too.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clientIp(request: Request) {
  // cf-connecting-ip is the real visitor IP when proxied through Cloudflare.
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  );
}

/** Only this site's own page may send here (blocks other sites posting in a visitor's name). */
function fromOurPage(request: Request) {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  try {
    return new URL(request.headers.get("origin") ?? "").host === host;
  } catch {
    return false;
  }
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

const reply = (status: number, body: Record<string, unknown> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

// Only POST is allowed (other methods: 405), like /api/contact.
export const ALL: APIRoute = () =>
  new Response(null, { status: 405, headers: { Allow: "POST" } });

export const POST: APIRoute = async ({ request }) => {
  if (!fromOurPage(request)) return reply(403);

  const ip = clientIp(request);
  if (rateLimited(ip)) return reply(429);

  const text = await request.text();
  if (text.length > LIMITS.body) return reply(413);
  let body: Record<string, unknown>;
  try {
    body = (JSON.parse(text) ?? {}) as Record<string, unknown>;
  } catch {
    return reply(400);
  }

  // Honeypot: hidden from people, often filled by bots. Answer "ok" so the bot learns nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") return reply(200, { ok: true });

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || email.length > LIMITS.email || !isEmail(email)) return reply(400, { field: "email" });

  // Reason is optional. Only the listed answers are accepted; "Other" may carry a short text.
  const reason =
    typeof body.reason === "string" && Object.hasOwn(REASON_CODES, body.reason)
      ? REASON_CODES[body.reason]
      : null;
  const otherText =
    reason === "OTHER" && typeof body.otherText === "string"
      ? body.otherText.replace(/\s+/g, " ").trim().slice(0, LIMITS.otherText)
      : "";
  const lmsBody = { host: HOST, email, reason, ...(otherText ? { otherText } : {}) };

  const { LMS_URL, PROXY_SECRET } = process.env;
  if (!LMS_URL || !PROXY_SECRET) {
    // Test mode: nothing is sent. No email in the log.
    console.warn("[unsubscribe] test mode: LMS_URL or PROXY_SECRET is not set, nothing was sent");
    return reply(503);
  }

  try {
    const answer = await fetch(`${LMS_URL.replace(/\/$/, "")}${LMS_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Proxy-Secret": PROXY_SECRET,
        "X-Client-IP": ip,
      },
      body: JSON.stringify(lmsBody),
      signal: AbortSignal.timeout(LMS_TIMEOUT_MS),
    });
    if (answer.ok) return reply(200, { ok: true });
    // 400: the LMS refused the email. Show "Please enter a valid email".
    if (answer.status === 400) return reply(400, { field: "email" });
    // 403 / 429 / 5xx: "Something went wrong". Only the status goes to the log.
    console.error(`[unsubscribe] LMS answered HTTP ${answer.status}`);
    return reply(502);
  } catch (error) {
    // Only the kind of failure; no email or answer text in the logs.
    console.error("[unsubscribe] could not reach the LMS:", error instanceof Error ? error.name : "unknown");
    return reply(502);
  }
};
