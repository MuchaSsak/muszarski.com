/**
 * POST /api/contact/ (requirements.md F09, tech/technologies.md § Stack, Contact). A Vercel Function next to the
 * static site: validates with the same rules as the browser (`src/lib/contact.ts`), stops bots (honeypot,
 * Turnstile when its secret is set, a best-effort per-instance rate limit; the real limit is a Vercel WAF rule),
 * then sends the message to the owner through EmailJS (its REST API, called from here, so no key reaches the browser
 * and the bot checks can't be skipped) [owner 2026-10-06: EmailJS on his Gmail, no Resend]. Answers JSON to the page script, or a 303 to a result page for
 * a plain form post without JavaScript. Secrets come from the host env (names only: technologies.md § Environment).
 * Region: fra1 (vercel.json). No database: nothing is stored here.
 */
import { findReply, isTopic, replyKind, validateContact, type ContactError } from "../src/lib/contact.js";

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

function answer(
  request: Request,
  locale: Locale,
  result: { ok: true } | { ok: false; error: ContactError },
  status: number,
): Response {
  if (request.headers.get("accept")?.includes("application/json")) {
    return new Response(JSON.stringify(result), {
      status,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }
  const target = result.ok ? `/${locale}/contact/sent/` : `/${locale}/contact/error/?e=${result.error}`;
  return new Response(null, {
    status: 303,
    headers: { Location: new URL(target, request.url).href, "Cache-Control": "no-store" },
  });
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

  // Bots: a filled honeypot. No minimum fill time: it blocked fast real senders [owner 2026-10-07].
  if (field("website")) return answer(request, locale, { ok: false, error: "spam" }, 400);
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

  const kind = replyKind(reply);
  const subject = `Portfolio message (${topic}): ${message.slice(0, 60).replace(/\s+/g, " ")}`;
  const text = [
    message,
    "",
    "---",
    `Reply to (${kind}): ${reply}`,
    `Topic: ${topic}`,
    `Page language: ${locale}`,
    `Sent: ${new Date().toISOString()}`,
  ].join("\n");
  const send = emailJs({ subject, text, message, reply, kind, topic, locale });
  if (!send) return answer(request, locale, { ok: false, error: "unavailable" }, 503);
  try {
    const response = await send;
    if (!response.ok) {
      // EmailJS says why in plain text (403 "API calls are disabled for non-browser applications", a bad ID...):
      // log it so the Vercel logs show the reason. Never logs the message or the sender.
      console.error(`EmailJS refused: ${response.status} ${(await response.text().catch(() => "")).slice(0, 300)}`);
      return answer(request, locale, { ok: false, error: "unavailable" }, 502);
    }
  } catch (error) {
    console.error("EmailJS unreachable:", error instanceof Error ? error.message : error);
    return answer(request, locale, { ok: false, error: "unavailable" }, 502);
  }
  return answer(request, locale, { ok: true }, 200);
}

type Mail = {
  subject: string;
  text: string;
  message: string;
  reply: string;
  kind: ReturnType<typeof replyKind>;
  topic: string;
  locale: Locale;
};

/**
 * EmailJS (tech/technologies.md § Contact): the template (dashboard) holds the recipient and the layout; it gets
 * `subject`, `text` (the whole message with its details), `message`, `reply`, `reply_kind`, `topic`, `locale` and
 * `reply_to` (the sender's email, or empty). Server calls need "Allow EmailJS API for non-browser applications" on.
 */
function emailJs(mail: Mail): Promise<Response> | undefined {
  const { EMAILJS_SERVICE_ID: service, EMAILJS_TEMPLATE_ID: template, EMAILJS_PUBLIC_KEY: publicKey } = process.env;
  if (!service || !template || !publicKey) return undefined;
  return fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: service,
      template_id: template,
      user_id: publicKey,
      ...(process.env.EMAILJS_PRIVATE_KEY ? { accessToken: process.env.EMAILJS_PRIVATE_KEY } : {}),
      template_params: {
        subject: mail.subject,
        text: mail.text,
        message: mail.message,
        reply: mail.reply,
        reply_kind: mail.kind,
        reply_to: mail.kind === "email" ? mail.reply : "",
        topic: mail.topic,
        locale: mail.locale,
      },
    }),
  });
}

export function GET(request: Request): Response {
  return Response.redirect(new URL("/en/#contact", request.url).href, 303);
}
