/**
 * The contact form's rules (requirements.md F09, structure.md § Home 7), shared by the browser script and the
 * `/api/contact/` function so both validate the same way. Message first [round 3, Q44 default]: one text box, then
 * "where do I reply" (an email, a phone number or a LinkedIn profile), which the script fills from the message when
 * it finds one. Plain module: relative imports only (the Vercel function bundles it).
 */
export const TOPICS = ["job", "project", "question"] as const;
export type Topic = (typeof TOPICS)[number];

export const LIMITS = { messageMin: 2, messageMax: 4000, replyMax: 200 } as const;

export type ContactError =
  | "message-empty"
  | "message-long"
  | "reply-missing"
  | "reply-invalid"
  | "spam"
  | "turnstile"
  | "rate"
  | "unavailable"
  | "network";

export type ReplyKind = "email" | "phone" | "linkedin";

const EMAIL = /[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*\.[a-z]{2,}/i;
const LINKEDIN = /(?:https?:\/\/)?(?:[a-z]{2,3}\.)?linkedin\.com\/in\/[\w%-]+\/?/i;
// A phone number: optional +, then 7-15 digits with spaces, dots, dashes or brackets between them.
const PHONE = /(?:\+|00)?\d[\d\s().-]{5,18}\d/;

const digits = (value: string) => value.replace(/\D/g, "").length;

/** What kind of reply address a value is, or null. */
export function replyKind(value: string): ReplyKind | null {
  const v = value.trim();
  if (!v || v.length > LIMITS.replyMax) return null;
  if (new RegExp(`^${EMAIL.source}$`, "i").test(v)) return "email";
  if (new RegExp(`^${LINKEDIN.source}$`, "i").test(v)) return "linkedin";
  if (new RegExp(`^${PHONE.source}$`).test(v) && digits(v) >= 7 && digits(v) <= 15) return "phone";
  return null;
}

/** The first reply address written inside a message ("…mail me at a@b.co"), if any. Email wins, then LinkedIn, then phone. */
export function findReply(message: string): { kind: ReplyKind; value: string } | null {
  const email = message.match(EMAIL)?.[0];
  if (email) return { kind: "email", value: email };
  const linkedin = message.match(LINKEDIN)?.[0];
  if (linkedin) return { kind: "linkedin", value: linkedin };
  for (const match of message.matchAll(new RegExp(PHONE.source, "g"))) {
    const value = match[0].trim();
    if (digits(value) >= 7 && digits(value) <= 15) return { kind: "phone", value };
  }
  return null;
}

export interface ContactInput {
  message: string;
  reply: string;
  topic?: string | undefined;
}

/** The first problem with an input, or null when it can be sent. */
export function validateContact(input: ContactInput): ContactError | null {
  const message = input.message.trim();
  if (message.length < LIMITS.messageMin) return "message-empty";
  if (message.length > LIMITS.messageMax) return "message-long";
  if (!input.reply.trim()) return "reply-missing";
  if (!replyKind(input.reply)) return "reply-invalid";
  return null;
}

export const isTopic = (value: unknown): value is Topic => TOPICS.includes(value as Topic);
