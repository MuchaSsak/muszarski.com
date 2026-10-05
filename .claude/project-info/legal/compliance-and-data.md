# Compliance and data (facts, not legal advice)

> Owns: data touchpoints, storage on the device, processors, consent mechanisms, retention, legal pages and
> rights to showcased work, image rights. Evidence (statutes from the Sejm ELI API, EUR-Lex, CJEU, EDPB, vendor
> pages, all read 2026-10-05): `research/2026-10-05-legal-compliance.md`. Nothing here is a compliance claim. A
> Polish lawyer should review the legal pages before launch (open-questions Q15).

## Scope

- **GDPR applies:** a public, job-seeking site with a contact form is not "purely personal" (art. 2(2)(c),
  recital 18, CJEU Lindqvist C-101/01 para 47, Ryneš C-212/13).
- **Controller:** Mateusz Muszarski (natural person; his JDG if the site serves it: Q28).
- **No DPO** required (art. 37(1)). An internal record of processing is optional but cheap (art. 30(5)).
- **Accessibility law:** the public-sector act doesn't apply; EAA services by microenterprises are exempt. WCAG 2.2 AA is
  our quality goal, not a legal duty.

## Data touchpoints

| Surface | Data | Stored | Purpose | Basis (sources support) |
| --- | --- | --- | --- | --- |
| Contact form → Resend → mailbox | email, message, optional name, time; IP at the function | Resend (US, 30-day logs); his mailbox (provider Unknown) | answer the message | art. 6(1)(f); 6(1)(b) for pre-contract requests. No consent needed |
| Hosting logs (Vercel Pro) | IP, time, path, referrer, UA | Vercel (Pro: 1 day runtime logs) | security | art. 6(1)(f), recital 49 |
| Analytics (Umami Cloud, EU region) | path, referrer, screen, language, browser/OS/device, transient location, a monthly visitor hash, events | Umami (Hobby: 6 months) | visit statistics | art. 6(1)(f) (+ PKE art. 399 below) |
| Anti-spam (Turnstile, **form only**) | IP, TLS fingerprint, UA, sitekey/origin | Cloudflare | protect the requested form | art. 6(1)(f); Cloudflare is also its own controller for bot-detection improvement |
| Social links (GitHub, LinkedIn, Discord, Messenger) | none until clicked | — | — | plain links |
| `/my-life` faith | his own special-category data, published by him | — | — | art. 9(2)(e) test: his deliberate public act (CJEU C-252/21 para 77). No third persons in faith-related photos without consent |

## Cookies and browser storage (PKE art. 399; enforced by Prezes UKE)

| Key | Set by | Purpose | Category |
| --- | --- | --- | --- |
| `umami.disabled` | Umami (only on opt-out) | remember the opt-out | requested by the visitor |
| Turnstile storage | Cloudflare, form page only | bot check of the requested form | strictly necessary (art. 399 ust. 3 pkt 2 reading) |
| theme / locale preference (if stored) | site | remember a choice the visitor made | requested by the visitor |

- **Facts:** cookieless Umami still makes the browser send device data via JS (EDPB 2/2023 §33). Art. 399 has **no
  analytics exemption**. UODO's own site runs Plausible without consent. Fine ceiling 15 000 zł for a person
  without revenue.
- **Three supported positions:** (a) a minimal consent prompt for statistics, (b) banner-less with disclosure,
  opt-out and DNT/GPC honoured (the PstrykWeb choice), (c) no client-side analytics.
- **Default:** (b) [assumption]; owner decides (Q34).

## Processors

| Vendor | Role | Region | DPA | Transfers |
| --- | --- | --- | --- | --- |
| Vercel Inc. | processor (customer data); controller for usage metadata | CDN edge; **set functions to an EU region (fra1)** (default iad1) | **Pro and Enterprise only** (eff. 31.03.2026). The owner chose Pro [user] 2026-10-05 | DPF active |
| Resend | processor | data stored in the US whatever the sending region | pre-signed for every account; download from the dashboard | DPF (re-certification under review) + SCCs |
| Cloudflare (Turnstile) | processor + own controller | global | Self-Serve Subscription Agreement | DPF (under review) + SCCs; **link the Turnstile Privacy Addendum** if invisible mode |
| Umami Software | processor | **pick the EU data region** at account creation | automatic on use | **not DPF** → SCCs |
| Mailbox provider | processor | Unknown | Unknown | Unknown (owner) |

## Required legal pages

| Page | Needed? | Basis | Status |
| --- | --- | --- | --- |
| Privacy policy `/privacy/` | **Yes** in every scenario | GDPR art. 12–13; link visible on every page + next to the form (WP260 para 11) | outline in research § 9(b) (16 sections, PL/EN headings); draft in Phase 1 |
| Terms (regulamin) `/terms/` | **Only if** he offers paid work through the site **and** it provides an e-service (newsletter, comments, booking). Whether a contact form alone counts is disputed | UŚUDE art. 2 pkt 6, 8 | With the "open to projects" line + JDG: **recommended as a short, conservative regulamin** [research reading; owner decides, Q16]. Outline: research § 9(c) |
| Service-provider info (name, address, e-mail, NIP) | if he is a usługodawca (freelance) | UŚUDE art. 5 | which address to publish: owner (Q36) |
| Consumer info (UPK art. 12) | only for B2C distance contracts in an "organised system" (Unknown) | UPK | not planned (B2B focus) |

- **Indexing and language:** noindex is fine (no duty to index; the footer link on every page is what counts). Every
  language version must be **accurate** (WP260 para 13). The es version needs a fluent check. A prevailing-language
  clause can't cure an inaccurate notice.

## Rights to showcased work and images

| Item | Fact | Rule for the site |
| --- | --- | --- |
| PstrykWeb (umowa zlecenia, Cetuspro) | The quoted clause alone is a **warranty of title**; it transfers nothing. A transfer needs written form and named fields of exploitation (PrAut art. 41 ust. 2, 53); without one it's a licence (art. 65). Employee rules (art. 12, 74 ust. 3) don't apply to umowa zlecenia. Authorship attribution is inalienable (art. 16) | read the full contract for "przenosi", "pola eksploatacji", "licencja", "poufność". Send the PL permission email (template: research § E.1). Rights status in the dossier |
| Neoteric Clockful (internship) | ownership depends on the internship's legal form (e.g. praktyka absolwencka art. 4) | ask Neoteric the 5 questions in research § E.2 before naming them |
| Linkoglot store media | his own app | official badge artwork only, unmodified, Apple first, equal sizes, Apple credit line in the legal notice |
| Instructor photos | need the person's permission (PrAut art. 81) **and** the photographer's licence | **text credit + certificate links only**, unless written permission |
| Certificates | Udemy and Three.js Journey allow sharing; Udemy is "not an accredited institution" | label as course certificates; INF.0x = state qualifications |
| Erasmus+ / ESC | the EU emblem must not suggest connection or endorsement | text entries + Youthpass; no EU flag next to his name |
| Client logos / screenshots | client works, trademarks, trade secrets, personal data | written permission per project, anonymise, or rebuild the hard part on fake data |
| His own photos | need the photographer's OK if someone else took them | — |

## INF qualifications (official names, Dz.U. 2024 poz. 611)

| Code | Official name (PL) | English (own translation) | PRK/EQF |
| --- | --- | --- | --- |
| INF.02 | Administracja i eksploatacja systemów komputerowych, urządzeń peryferyjnych i lokalnych sieci komputerowych | Administration and operation of computer systems, peripheral devices and LANs | 4 |
| INF.03 | Tworzenie i administrowanie stronami i aplikacjami internetowymi oraz bazami danych | Development and administration of websites, web applications and databases | 5 |
| INF.04 | Projektowanie, programowanie i testowanie aplikacji | Design, programming and testing of applications | 5 |

- **Occupations:** INF.02 + INF.03 = technik informatyk; INF.03 + INF.04 = technik programista.
- **Issuer:** certificates come from the regional board (OKE), under CKE. Whether he holds the diplomas is Unknown (Q10).
