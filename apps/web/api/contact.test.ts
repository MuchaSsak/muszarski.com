/**
 * The contact function end to end, with the network mocked: bot checks, validation, Turnstile, EmailJS, both answer
 * shapes (JSON for the page script, 303 for a plain form post). Env names only (technologies.md § Environment).
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let ipCounter = 0;

function post(fields: Record<string, string>, { json = true, ip }: { json?: boolean; ip?: string } = {}): Request {
  const body = new FormData();
  for (const [key, value] of Object.entries(fields)) body.set(key, value);
  return new Request("https://matmuszarski.space/api/contact/", {
    method: "POST",
    body,
    headers: { ...(json ? { accept: "application/json" } : {}), "x-forwarded-for": ip ?? `10.0.0.${++ipCounter}` },
  });
}

const valid = () => ({
  message: "Hi, we are hiring a full-stack developer. Can we talk?",
  reply: "recruiter@example.com",
  locale: "pl",
  topic: "job",
  started: String(Date.now() - 10_000),
});

async function load() {
  vi.resetModules();
  return import("./contact");
}

describe("POST /api/contact/", () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("EMAILJS_SERVICE_ID", "service_test");
    vi.stubEnv("EMAILJS_TEMPLATE_ID", "template_test");
    vi.stubEnv("EMAILJS_PUBLIC_KEY", "public-test");
    vi.stubEnv("EMAILJS_PRIVATE_KEY", "private-test");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    fetchMock.mockReset();
    fetchMock.mockResolvedValue(new Response("OK", { status: 200 }));
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("sends a valid message through EmailJS, server-side, with the private key and the reply address", async () => {
    const { POST } = await load();
    const response = await POST(post(valid()));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://api.emailjs.com/api/v1.0/email/send");
    const payload = JSON.parse(String(init?.body));
    expect(payload).toMatchObject({ service_id: "service_test", template_id: "template_test", user_id: "public-test", accessToken: "private-test" });
    expect(payload.template_params).toMatchObject({ reply_to: "recruiter@example.com", reply_kind: "email", locale: "pl" });
    expect(payload.template_params.subject).toContain("(job)");
    expect(payload.template_params.text).toContain("Page language: pl");
  });

  it("answers a plain form post with a 303 to the localized result page", async () => {
    const { POST } = await load();
    const ok = await POST(post(valid(), { json: false }));
    expect(ok.status).toBe(303);
    expect(ok.headers.get("location")).toBe("https://matmuszarski.space/pl/contact/sent/");
    const bad = await POST(post({ ...valid(), message: "" }, { json: false }));
    expect(bad.headers.get("location")).toBe("https://matmuszarski.space/pl/contact/error/?e=message-empty");
  });

  it("finds the reply address in the message when the field is empty (no JavaScript)", async () => {
    const { POST } = await load();
    const response = await POST(post({ ...valid(), reply: "", message: "Hello! Write to me at anna@example.com please." }));
    expect(response.status).toBe(200);
    expect(JSON.parse(String(fetchMock.mock.calls[0]![1]?.body)).template_params.reply_to).toBe("anna@example.com");
  });

  it("rejects bots: a filled honeypot or a form sent too fast", async () => {
    const { POST } = await load();
    expect(await (await POST(post({ ...valid(), website: "http://spam.example" }))).json()).toEqual({ ok: false, error: "spam" });
    expect(await (await POST(post({ ...valid(), started: String(Date.now()) }))).json()).toEqual({ ok: false, error: "spam" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("validates like the browser", async () => {
    const { POST } = await load();
    const missing = await POST(post({ ...valid(), reply: "", message: "No contact details in here at all." }));
    expect(missing.status).toBe(400);
    expect(await missing.json()).toEqual({ ok: false, error: "reply-missing" });
    const invalid = await POST(post({ ...valid(), reply: "not a way to reach anyone" }));
    expect(await invalid.json()).toEqual({ ok: false, error: "reply-invalid" });
  });

  it("limits one address to 5 messages per window", async () => {
    const { POST } = await load();
    const statuses = [];
    for (let i = 0; i < 6; i++) statuses.push((await POST(post(valid(), { ip: "192.0.2.7" }))).status);
    expect(statuses).toEqual([200, 200, 200, 200, 200, 429]);
  });

  it("checks Turnstile when its secret is set", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "turnstile-secret");
    const { POST } = await load();
    const noToken = await POST(post(valid()));
    expect(await noToken.json()).toEqual({ ok: false, error: "turnstile" });
    expect(fetchMock).not.toHaveBeenCalled();

    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ success: true })));
    const passed = await POST(post({ ...valid(), "cf-turnstile-response": "token" }));
    expect(passed.status).toBe(200);
    expect(fetchMock.mock.calls[0]![0]).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify");
    expect(fetchMock.mock.calls[1]![0]).toBe("https://api.emailjs.com/api/v1.0/email/send");
  });

  it("says unavailable when the mail settings are missing or EmailJS fails", async () => {
    vi.stubEnv("EMAILJS_PUBLIC_KEY", "");
    const { POST } = await load();
    const unset = await POST(post(valid()));
    expect(unset.status).toBe(503);
    expect(await unset.json()).toEqual({ ok: false, error: "unavailable" });

    vi.stubEnv("EMAILJS_PUBLIC_KEY", "public-test");
    fetchMock.mockResolvedValueOnce(new Response("The Public Key is invalid", { status: 400 }));
    const failed = await POST(post(valid()));
    expect(failed.status).toBe(502);
    fetchMock.mockRejectedValueOnce(new Error("network"));
    expect((await POST(post(valid()))).status).toBe(502);
  });

  it("sends GET visitors to the form", async () => {
    const { GET } = await load();
    const response = GET(new Request("https://matmuszarski.space/api/contact/"));
    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toBe("https://matmuszarski.space/en/#contact");
  });
});
