/**
 * POST /api/contact/ (requirements.md F09, tech/technologies.md § Stack, Contact). A Vercel Function next to the
 * static site: validates with the same rules as the browser (`src/lib/contact.ts`), stops bots (honeypot, minimum fill
 * time, Turnstile when its secret is set, a best-effort per-instance rate limit; the real limit is a Vercel WAF rule),
 * then sends the message to the owner through Resend. Answers JSON to the page script, or a 303 to a result page for
 * a plain form post without JavaScript. Secrets come from the host env (names only: technologies.md § Environment).
 * Region: fra1 (vercel.json). No database: nothing is stored here.
 */
import { findReply, isTopic, LIMITS, replyKind, validateContact, type ContactError } from "../src/lib/contact";

const LOCALES = ["en", "pl", "es"] as const;
type Locale = (typeof LOCALES)[number];

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function answer(request: Request, locale: Locale, result: { ok: true } | { ok: false; error: ContactError }, status: number): Response {
  if (request.headers.get("accept")?.includes("application/json")) {
    return new Response(JSON.stringify(result), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
  }
  const target = result.ok ? `/${locale}/contact/sent/` : `/${locale}/contact/error/?e=${result.error}`;
  return new Response(null, { status: 303, headers: { Location: new URL(target, request.url).href, "Cache-Control": "no-store" } });
}

async function turnstileOk(token: string, ip: string, secret: string): Promise<boolean> {
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const data = (await response.json().catch(() => ({ success: false }))) as { success?: boolean };
  return data.success === true;
}

export async function POST(request: Request): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return answer(request, "en", { ok: false, error: "message-empty" }, 400);
  }
  const field = (name: string) => String(form.get(name) ?? "");
  const locale: Locale = (LOCALES as readonly string[]).includes(field("locale")) ? (field("locale") as Locale) : "en";
  const ip = (request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown").split(",")[0]!.trim();

  // Bots: a filled honeypot or a form sent faster than a person types.
  const started = Number(field("started"));
  if (field("website") || (started && Date.now() - started < LIMITS.minFillMs)) return answer(request, locale, { ok: false, error: "spam" }, 400);
  if (limited(ip)) return answer(request, locale, { ok: false, error: "rate" }, 429);

  const message = field("message").trim();
  let reply = field("reply").trim();
  // Without JavaScript nobody filled the reply field from the message: do it here.
  if (!reply) reply = findReply(message)?.value ?? "";
  const problem = validateContact({ message, reply });
  if (problem) return answer(request, locale, { ok: false, error: problem }, 400);
  const topic = isTopic(field("topic")) ? field("topic") : "none";

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret && !(await turnstileOk(field("cf-turnstile-response"), ip, turnstileSecret))) {
    return answer(request, locale, { ok: false, error: "turnstile" }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return answer(request, locale, { ok: false, error: "unavailable" }, 503);

  const kind = replyKind(reply);
  const text = [
    message,
    "",
    "---",
    `Reply to (${kind}): ${reply}`,
    `Topic: ${topic}`,
    `Page language: ${locale}`,
    `Sent: ${new Date().toISOString()}`,
  ].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Portfolio message (${topic}): ${message.slice(0, 60).replace(/\s+/g, " ")}`,
        text,
        ...(kind === "email" ? { reply_to: reply } : {}),
      }),
    });
    if (!response.ok) return answer(request, locale, { ok: false, error: "unavailable" }, 502);
  } catch {
    return answer(request, locale, { ok: false, error: "unavailable" }, 502);
  }
  return answer(request, locale, { ok: true }, 200);
}

export function GET(request: Request): Response {
  return Response.redirect(new URL("/en/#contact", request.url).href, 303);
}
