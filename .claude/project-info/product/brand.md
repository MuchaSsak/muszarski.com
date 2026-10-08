# Brand

> Owns: identity facts, positioning, voice and tone per locale, microcopy rules, words to avoid, claims never
> to make. Who reads it: `audience.md`. Look: `design/design.md`. Legal pages use a separate formal register (§ Legal tone).

## Identity (facts only)

| Fact | Value | Source |
| --- | --- | --- |
| Display name | **Mateusz Muszarski** everywhere; `alternateName` MuchaSsak; drop "Matt"/"Matthew" | [research: seo], pending owner OK (Q26) |
| Role words | "Full-stack" always present (searchable); "product engineer" as the positioning | [research: hiring § 2] |
| Location line | Unknown → placeholder "Pomorskie, Poland" (Q27) | — |
| Seniority line | "Building software since 2022" (~4 years); years of paid work still open (Q25) | [user] 2026-10-05 |
| Business | JDG "MATEUSZ MUSZARSKI - ENROLLO" in public registers; how to present it: Q28 | [research: seo § 1.3] |

## Positioning (default = option A; options B and C in `research/2026-10-05-software-house-hiring.md` § 7.1)

- **Role line** (under the fitted-name H1): "Full-stack product engineer".
- **Author box bio** (under every post, `pages/[locale]/blog/[slug].astro`) [user 2026-10-08, his draft "Always thinking
  about the users, business, conversions and psychology behind my visuals ... results, not just for code to work",
  rewritten positive per rule 1]: "Full-stack product engineer from Poland. I always think about the users, the business,
  conversions and the psychology behind my visuals. I measure my work by the results it brings."
- **Hero line** (2026-10-06, `home/Hero.astro`; P6, waits for the owner's OK): "Code is the tool. I build products
  that solve real business problems, at a cost that makes sense." (pl "Kod to narzędzie. Buduję produkty, które
  rozwiązują prawdziwe problemy firm, w rozsądnym budżecie.", es translated, unreviewed). A positive rewrite of the
  owner's draft "I don't simply code. I build businesses and solutions to problems affordably." [user 2026-10-06],
  because rule 1 below bans "I don't just…" phrasing. It replaced the earlier draft "I turn a business problem into a
  shipped web or mobile product, and I tell you early what it will cost and what can wait."
- **Proof line** (above the fold, pending the Cetuspro OK; public info only, `content/projects/pstrykweb.md`):
  "Built PstrykWeb for Cetuspro: bespoke websites for local businesses, ordered through one online form."
- **Titles elsewhere:**
  - SEO / CV: "Full-Stack Developer (React, Node.js, TypeScript)"
  - LinkedIn headline mirrors the H1 + stack
  - Never: "Senior", "AI Engineer", "Creative Developer" as the primary title

## Four proof pillars (each maps to a site section; evidence per pillar: `audience.md`)

1. **I build for the business result:** Linkoglot monetisation (free trial → subscription), PstrykWeb as client work.
2. **I build the whole thing:** PstrykWeb built for Cetuspro (never "solo" or "team" [user 2026-10-06]), Linkoglot on both stores.
3. **I use AI as leverage, and I verify it:** Clockful AI-only at Neoteric (118 tests), this site's public Claude Code setup,
   `lingui-translate-ai`.
4. **I make the work visible and predictable:** decisions with rejected options, "cut from v1", estimate vs actual.

## Voice and tone

- **Three words:** precise, candid, warm. An engineer explaining a drawing, not a marketer.
- **Do:**
  - short declaratives
  - a number, date, scope or status instead of an adjective
  - name the context every time (client work / internship / own product / personal)
  - honesty markers ("pre-traction", "not measured yet", a plain "Limits" list)
- **Don't:** hype, exclamation marks, "passionate", "crafting digital experiences", "seamless / robust /
  scalable" without a number, LLM-sounding filler, self-review sections in posts ("What would I do differently?",
  "Takeaways": they sound like an AI answering "what would you change?" [user] 2026-10-07).
- **Per locale:**
  - en: casual "you"
  - pl: informal "Ty" with courtesy capitals ("Twój", "Ci"), the pstryk convention
  - es: "tú" [assumption]
  - Each is written natively, not translated literally (`site/i18n.md`)

## Microcopy rules

1. **Positive evidence only.** Banned anywhere in copy: "ticket executor", "klepacz", "code monkey", "not just a
   coder", "more than a developer", "I don't just…" [user] 2026-10-05.
2. **Templates for memo ideas, filled only with true details:**
   - "Cut from v1: [X]. Shipped in [N] weeks instead of [M]."
   - "Shortcut on purpose: [A] instead of [B]; revisit when [trigger]."
3. **CTAs are verbs plus object:** "See the work", "Download CV (PDF, 70 KB)", "Copy email", "Read the case study".
   Never "Click here" or "Let's build something amazing together!".
   - The header's primary says **"Hire me"** (pl "Zatrudnij mnie", es "Contrátame") [user 2026-10-06]; the menu, the
     footer and other pages keep "Contact".
   - **"CV", never "Resume"**, in every locale [decided 2026-10-06]: the primary audience is Polish / EU software
     houses, whose English job ads say "CV"; "resume" is US usage. Switching is a catalog change only: the Lingui message `CV` (header, footer, page title) plus
     the few phrases that contain it ("Download CV", "Details on the CV").
4. **AI wording:** the employers' verbs: delegate, verify, explain every line, gates. Never: "10×",
   "AI-powered developer", "prompt engineer", "AI wrote 90% of my code", or defensive denials.
5. **Same words on the site, LinkedIn and the CV** for the role, years and flagship names.
6. **Punctuation:** no em/en dashes or raw no-break spaces in catalogs (escapes test, `site/i18n.md`).

## Claims never to make

User or revenue numbers that don't exist · "Senior" by self-title · that Udemy certificates are accredited ·
endorsement by instructors, Erasmus+/ESC or the EU (no EU flag next to his name) · anything internal about
PstrykWeb: AI generation, the pipeline, internal tools, counts (owner rule 2026-10-05, Q32) · any metric without a source.

## Legal tone

`/privacy` and `/terms` are formal and precise, numbered clauses, statute references, no brand voice and no
humour [user] 2026-10-05. Facts: `legal/compliance-and-data.md`.
