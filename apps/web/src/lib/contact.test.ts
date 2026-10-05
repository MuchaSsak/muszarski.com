import { describe, expect, it } from "vitest";

import { findReply, replyKind, validateContact } from "~/lib/contact";

describe("replyKind", () => {
  it("knows emails, phones and LinkedIn profiles", () => {
    expect(replyKind("anna@firma.pl")).toBe("email");
    expect(replyKind("+48 600 700 800")).toBe("phone");
    expect(replyKind("600-700-800")).toBe("phone");
    expect(replyKind("linkedin.com/in/anna-kowalska")).toBe("linkedin");
    expect(replyKind("https://www.linkedin.com/in/anna-kowalska/")).toBe("linkedin");
  });

  it("refuses everything else", () => {
    expect(replyKind("")).toBeNull();
    expect(replyKind("anna@")).toBeNull();
    expect(replyKind("12345")).toBeNull();
    expect(replyKind("call me maybe")).toBeNull();
    expect(replyKind("https://example.com/in/anna")).toBeNull();
  });
});

describe("findReply", () => {
  it("finds a reply address written inside the message, email first", () => {
    expect(findReply("We're hiring. Write to jobs@studio.dev or call +48 600 700 800.")).toEqual({ kind: "email", value: "jobs@studio.dev" });
    expect(findReply("My profile: linkedin.com/in/anna-k, thanks")).toEqual({ kind: "linkedin", value: "linkedin.com/in/anna-k" });
    expect(findReply("Zadzwoń: 600 700 800")).toEqual({ kind: "phone", value: "600 700 800" });
  });

  it("ignores years and short numbers", () => {
    expect(findReply("We started in 2022 with 3 people")).toBeNull();
  });
});

describe("validateContact", () => {
  it("needs a message and a reply address", () => {
    expect(validateContact({ message: " ", reply: "a@b.co" })).toBe("message-empty");
    expect(validateContact({ message: "x".repeat(4001), reply: "a@b.co" })).toBe("message-long");
    expect(validateContact({ message: "Hello", reply: "" })).toBe("reply-missing");
    expect(validateContact({ message: "Hello", reply: "nope" })).toBe("reply-invalid");
    expect(validateContact({ message: "Hello", reply: "a@b.co" })).toBeNull();
  });
});
