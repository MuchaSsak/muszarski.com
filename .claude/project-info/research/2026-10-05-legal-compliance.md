# Legal & compliance research: personal portfolio (PL/EU)

Date: 2026-10-05 · Track: legal-compliance (1 of 7 parallel research agents)

> **Facts, not legal advice, and no compliance claim.** Every row cites a source with URL and the
> date read (all read 2026-10-05 unless marked). Primary sources first (ISAP / Sejm ELI API, EUR-Lex,
> CJEU, EDPB, UODO, official vendor pages). Secondary sources (law-firm blogs) are labelled
> **[secondary]**. Facts reused from the PstrykWeb repo are labelled **[baseline]** with the file they
> come from; that project is a company (CETUSPRO sp. z o.o.), this one is a natural person, so only the
> law and vendor facts carry over, never the company facts. Where a fact could not be verified it says
> **Unknown** and why.

## TL;DR (facts, not advice)

1. **Privacy policy: needed.** GDPR applies: a public job-seeking site with a contact form is not
   "purely personal" (art. 2(2)(c), recital 18, CJEU Lindqvist para 47, Ryneš paras 29-33). He is the
   controller. Outline in § 9(b).
2. **Regulamin: not required for a job-seeker-only site** on the UŚUDE text (duties bind a
   "usługodawca" with "działalność zarobkowa lub zawodowa", art. 2 pkt 6). **Required if he freelances
   through the site and it provides an e-service** (newsletter, comments, booking); then UŚUDE art. 5
   also asks for his name, address and e-mail. Outline in § 9(c).
3. **Cookie banner: not needed for anything except client-side analytics.** Turnstile (form only) and
   an opt-out flag fit PKE art. 399 ust. 3 pkt 2. Cookieless Umami still reads device data via JS
   (EDPB 2/2023 §33), and art. 399 has no analytics exemption. Banner-less Umami is a risk decision
   (UODO itself runs Plausible without consent; the art. 399 enforcer is Prezes UKE; fine cap 15 000 zł
   for a person without revenue).
4. **Instructor photos: not without permission** from the person (PrAut art. 81) **and** the
   photographer (copyright). Use text credit + certificate links instead.
5. **New facts vs the PstrykWeb baseline:** Vercel's DPA (eff. 31.03.2026) covers **only Pro and
   Enterprise**, and Hobby is non-commercial only. Umami Cloud now lists **data-region selection** and
   is **not DPF-certified** (SCCs). Resend, Cloudflare and Cal.com DPF entries: see § 1.4.
6. Coordinator extras (PstrykWeb under umowa zlecenia, Neoteric internship, store badges): § E.

## 1. GDPR: does it apply, who is the controller, what the policy must say

### 1.1 Household exemption vs a job-seeking portfolio

| Point | Finding | Source |
|---|---|---|
| The exemption | GDPR does not apply to processing "by a natural person in the course of a purely personal or household activity" (art. 2(2)(c)). Recital 18 adds: "and thus with no connection to a professional or commercial activity" and gives "correspondence and the holding of addresses, or social networking and online activity undertaken within the context of such activities" as examples | GDPR, EUR-Lex/Cellar `http://publications.europa.eu/resource/celex/32016R0679` (same text as https://eur-lex.europa.eu/eli/reg/2016/679/oj) |
| Narrow reading | CJEU, Lindqvist C-101/01, para 47: the exception covers "only [...] activities which are carried out in the course of private or family life of individuals, which is clearly not the case with the processing of personal data consisting in publication on the internet so that those data are made accessible to an indefinite number of people" | `http://publications.europa.eu/resource/celex/62001CJ0101` |
| "Purely" | CJEU, Ryneš C-212/13, paras 29-33: the exception "must be narrowly construed"; it applies "only where it is carried out in the purely personal or household setting"; an activity "directed outwards from the private setting" is not covered | `http://publications.europa.eu/resource/celex/62013CJ0212` |
| Applied to this site | A public site that publishes to anyone, exists to get a job (a professional purpose, recital 18) and runs a contact form, logs, analytics and anti-spam is outside the "purely personal" setting on the text of art. 2(2)(c), recital 18 and the two judgments. No source found that treats a job-seeker's public portfolio as household activity | inference from the sources above (not a ruling on this site) |
| Controller | "the natural or legal person [...] which, alone or jointly with others, determines the purposes and means of the processing" (art. 4(7)). Mateusz Muszarski as a natural person decides why and how the form, logs, analytics and anti-spam run, so he is the controller; the vendors are processors where their terms say so (§ 1.4) | GDPR art. 4(7), 28 |
| Supervisory authority | Prezes Urzędu Ochrony Danych Osobowych (UODO), ul. Stawki 2, 00-193 Warszawa | [baseline] PstrykWeb policy § 13 (`apps/pstrykweb.pl/src/content/legal/pl/polityka-prywatnosci.md`) |
| DPO | No source found that requires a DPO for this processing; art. 37(1) ties the duty to public bodies or core activities of large-scale monitoring / special-category processing. Not required on that text | GDPR art. 37(1) (text not re-quoted here) |
| Records of processing (art. 30) | Art. 30(5): the duty does not apply to an organisation with fewer than 250 persons "unless the processing [...] is likely to result in a risk [...], the processing is not occasional, or the processing includes special categories". A permanently open contact form may be "not occasional". Whether art. 30 binds a natural person here: **Unknown** (no authority found); a short internal record costs little | GDPR art. 30(5) |
| Own sensitive data | See § 5 | - |

### 1.2 What the policy must contain (GDPR art. 13, verified text)

Art. 13(1): (a) identity and contact details of the controller; (b) DPO contact, where applicable; (c)
purposes and legal basis; (d) the legitimate interests, where art. 6(1)(f) is used; (e) recipients or
categories of recipients; (f) intended third-country transfers and the adequacy decision or the
safeguards and how to get a copy. Art. 13(2): (a) storage period or the criteria; (b) rights of access,
rectification, erasure, restriction, objection, portability; (c) right to withdraw consent where the
basis is consent; (d) right to complain to a supervisory authority; (e) whether providing data is a
statutory or contractual requirement and the consequences of not providing it; (f) automated
decision-making incl. profiling. Art. 12(1): "concise, transparent, intelligible and easily accessible
form, using clear and plain language". Source: GDPR (Cellar URL above).

- **Postal address.** Art. 13(1)(a) says "contact details" and does not name a postal address. The
  WP29/EDPB transparency guidelines (WP260 rev.01) do not add a postal-address rule in the parts read.
  A postal address becomes a statutory duty only under UŚUDE art. 5 ust. 2 pkt 2 ("imię, nazwisko,
  miejsce zamieszkania i adres"), which binds a **usługodawca** (§ 3). So: job-seeker only = an e-mail
  address satisfies the GDPR text; freelance = UŚUDE art. 5 asks for a residential/business address
  (a business address registered in CEIDG or a correspondence address are options he would have to
  check with counsel). Status: **Unknown which address he will publish** (owner decision).
- **Where the link must sit.** WP260 rev.01 para 11, example: "A direct link to this privacy statement/
  notice should be clearly visible on each page of this website under a commonly used term (such as
  'Privacy', 'Privacy Policy' or 'Data Protection Notice')." Source:
  https://ec.europa.eu/newsroom/article29/redirection/document/51025 (WP260 rev.01, endorsed by the
  EDPB on 25.05.2018). Footer link on every page + a short notice next to the contact form matches this.

### 1.3 Legal bases per processing (facts for the policy; the choice is the owner's/counsel's)

| Processing | Data | Basis the sources support | Retention fact | Source |
|---|---|---|---|---|
| Contact form → e-mail (Resend) | e-mail, message, optional name, timestamp; IP at the function | Art. 6(1)(f) (answering a message the person chose to send) or, where the message is about a contract (freelance), art. 6(1)(b) "steps at the request of the data subject prior to entering into a contract". No consent needed for either | Resend keeps "email and log data [...] for 30 days on Free, Pro, and Scale plans"; deleted within 90 days after account termination; backups 7 days. His own mailbox: his choice (criteria: until the matter is closed + limitation period for claims, as the PstrykWeb text does) | GDPR art. 6(1)(b),(f); https://resend.com/security/gdpr; [baseline] PstrykWeb policy § 3.5 |
| Server / CDN logs (Vercel) | IP, time, path, referrer, User-Agent | Art. 6(1)(f); recital 49 names "ensuring network and information security" as a legitimate interest | Runtime logs: "Hobby 1 hour of logs; Pro 1 day; Pro with Observability Plus 30 days; Enterprise 3 days" (page updated 2026-08-28) | GDPR recital 49; https://vercel.com/docs/logs/runtime |
| Analytics (Umami Cloud) | page path, referrer, screen size, language, browser/OS/device, approximate location from IP (transient), a visitor hash (website ID + IP + UA + monthly salt), click events | Art. 6(1)(f) for the GDPR side; the terminal-equipment rule is separate (§ 2) | "Data retention: Hobby 6 months, Pro 2 years, Business 5 years" | https://umami.is/pricing; [baseline] LEGAL.md § 6.1 (hash formula from docs.umami.is metric definitions) |
| Anti-spam (Cloudflare Turnstile) | "client IP address, TLS Fingerprint, User-Agent Header and Sitekey and associated origin" | Art. 6(1)(f) (security, recital 49). Cloudflare is processor for protecting the site and **independent controller** "in improving the effectiveness of Turnstile's bot detection" | Unknown (not stated in the addendum) | https://www.cloudflare.com/turnstile-privacy-policy/ (last updated 18.06.2025) |
| Booking (Cal.com, if used) | attendee name, e-mail, answers, time zone, meeting data | Art. 6(1)(b) (arranging a call the person asks for) | Unknown (Cal.com retention not read) | https://cal.com/privacy (effective 1.10.2026): for bookings "You (or your organization)" = controller, Cal.com = "Processor [...] under our DPA" |
| Links to Discord / Messenger / LinkedIn / GitHub | none until clicked (plain links) | No processing by him before a click; after a click the platform is its own controller | - | [baseline] LEGAL.md § 6.13 pattern; GDPR art. 4(7) |
| Blog (no comments) | none beyond logs/analytics | - | - | - |
| Photo of himself, /my-life content | his own data | see § 5 | - | - |

### 1.4 Processors and international transfers (vendor documents read 2026-10-05)

DPF status from the official list (`https://www.dataprivacyframework.gov/list`, queried through its own
search API `dpfapi.azurewebsites.net/api/participants` on 2026-10-05). Adequacy decision: Commission
Implementing Decision (EU) 2023/1795 of 10.07.2023; SCCs: Decision (EU) 2021/914 [baseline LEGAL.md § 8.2].

| Vendor | Role | Where data is stored | DPA: exists, how concluded, **which plans** | EU-US DPF (official list) | Source |
|---|---|---|---|---|---|
| **Vercel Inc.** (hosting, CDN, the one serverless function, logs) | Processor for "Customer Data"; **Vercel is controller** for "Service-Generated Data" (usage data and metadata) and "Contact Data" | Static files from the CDN edge nearest the visitor; functions run by default in **Washington, D.C. (iad1)** "for all new projects"; region configurable per project or in `vercel.json` (e.g. fra1) | DPA last updated 17.03.2026, effective 31.03.2026: "This Addendum applies to Vercel's Processing of Personal Data as a Processor under the Agreement for Customers who are on **Enterprise and Pro plans**." **No DPA is offered for Hobby on that text** | "Vercel Inc.": EU-US, UK, Swiss certifications **Active** | https://vercel.com/legal/dpa; https://vercel.com/docs/functions/configuring-functions/region; https://vercel.com/legal/privacy-policy (updated 1.06.2026) |
| Vercel Hobby terms | - | - | "Hobby teams are restricted to non-commercial personal use only. All commercial usage of the platform requires either a Pro or Enterprise plan. Commercial usage is defined as any Deployment that is used for the purpose of financial gain of anyone involved in any part of the production of the project, including a paid employee or consultant writing the code." Examples include "Any method of requesting or processing payment". (Synthesis C4 already flags this) | - | https://vercel.com/docs/limits/fair-use-guidelines |
| **Resend** (Plus Five Five, Inc.) | Processor (Module Two SCCs when he is controller) | "Resend stores customer data in the United States [...]. The region you select when adding a sending domain (for example, eu-west-1) controls where email is routed and sent from. It does not control where data is stored" | "A GDPR Article 28 Data Processing Addendum is in force for **every Resend account**. It is pre-signed by Resend and fully executed once you sign up"; signed copy downloadable in the dashboard (Documents) | "Resend": EU-US + UK Extension "**Active - Re-certification under Review**" (non-HR data). Resend: "The SCCs stand on their own and are not conditioned on DPF certification status" | https://resend.com/security/gdpr; https://resend.com/legal/dpa (last update 31.12.2025) |
| **Cloudflare, Inc.** (Turnstile) | Processor for protecting the site; own controller for improving bot detection | "global network" (no region stated for Turnstile) | DPA "forms part of" the Enterprise Subscription Agreement, **Self-Serve Subscription Agreement** or other agreement | "Cloudflare, Inc.": EU-US, UK, Swiss "**Active - Re-certification under Review**"; Cloudflare relies on DPF, SCCs as fallback | https://www.cloudflare.com/cloudflare-customer-dpa/; https://www.cloudflare.com/privacypolicy/ |
| Turnstile condition | - | - | "As a condition of enabling invisible mode, you must reference Cloudflare's Turnstile Privacy Addendum in your own privacy policy" (same for "offlabel") | - | https://developers.cloudflare.com/turnstile/llms-full.txt |
| **Umami Software, Inc.** (Umami Cloud) | Processor | Pricing FAQ: "Umami Cloud servers are located in the US and EU". **New since the baseline:** the security page (last updated 29.07.2026) lists "Geographic data-region selection for Umami Cloud accounts" and "Data-region selection: Available for Umami Cloud" (the baseline of 2026-10-02 said no region choice was documented). How to pick the region and whether an EU-only account keeps all data in the EU: **Unknown** (not described on the pages read) | DPA (last updated 2.08.2026) "is incorporated into the Agreement by reference and applies automatically [...] By [...] creating or using an account [...] Customer enters into and agrees to this DPA" (all plans; the text has no plan restriction). Transfers: § 10.2 "the EU SCCs are incorporated into this DPA" | **Not on the active list** (search "Umami": 0 results) → transfers rest on the SCCs | https://umami.is/security; https://umami.is/pricing; https://umami.is/dpa |
| **Cal.com, Inc.** (optional booking) | Processor for bookings | "We're a US company and data is processed in the United States [...] If you need EU data residency, contact us at privacy@cal.com" | Referred to as "our DPA" (DPA URL not found at /dpa or /legal/dpa: 404) | "Cal.com, Inc": EU-US + UK **Active** | https://cal.com/privacy |
| Mailbox provider (where form e-mails land) | Processor | Unknown (provider not chosen/known) | Unknown | Unknown | - |

Facts that matter for the policy text:
- Umami's tracker code (open source) reads `screen.width/height`, `navigator.language`, Do Not Track,
  and one localStorage key `umami.disabled` (opt-out); it keeps a server "cache" token **in memory**
  (a JS variable), sends requests with `credentials: 'omit'` by default, and sets no cookie. It also
  has an `identify()` API (a distinct ID per visitor), which would change the analysis if used.
  Source: https://raw.githubusercontent.com/umami-software/umami/master/src/tracker/index.ts and the
  live `https://cloud.umami.is/script.js` (both read 2026-10-05).
- Vercel on Hobby: since no DPA covers Hobby, the art. 28(3) contract that GDPR requires between a
  controller and its processor is **not available from Vercel's published terms on that plan**.
  Whether Vercel would treat a Hobby customer's visitor data as its own controller data, and whether
  the Hobby terms contain other data-protection terms: **Unknown** (Hobby terms not read). Options the
  facts point to: Vercel Pro (DPA applies), or a host whose DPA covers free/self-serve plans (e.g.
  Cloudflare's DPA covers the Self-Serve Subscription Agreement).

## 2. Cookies and terminal equipment (PKE art. 399): banner or no banner?

| Point | Finding | Source |
|---|---|---|
| The Polish rule | PKE art. 399 ust. 1 (text in Appendix A): storing **or accessing** information on the device needs prior information + consent; ust. 3 pkt 2 exempts what is "konieczne do [...] dostarczania [...] usługi świadczonej drogą elektroniczną, żądanej przez abonenta lub użytkownika końcowego". No analytics or audience-measurement exemption in the text | PKE (ELI, Appendix A) |
| What it replaced | Art. 173 Prawo telekomunikacyjne; PT repealed by PKE-wpr art. 68 ust. 1; PKE in force 10.11.2024 | PKE-wpr art. 68; PKE art. 450 |
| Who enforces | **Prezes UKE** (art. 444 ust. 1 pkt 82, ust. 2 pkt 8; art. 446), not UODO. For an entity with no revenue or ≤ 500 000 zł: a fine up to 15 000 zł (art. 446 ust. 3) | PKE |
| Who is bound | Any entity storing/accessing; no "usługodawca" or business condition in art. 399 | PKE art. 399 text |
| Technical scope (EDPB 2/2023 v2.0, adopted 7.10.2024) | §33: JavaScript "where the accessing entity instructs the browser of the user to send asynchronous requests with the targeted information [...] clearly falls within the scope of Article 5(3)". §55: IP addresses are in scope "unless the entity can ensure that the IP address does not originate from the terminal equipment". §56: being in scope "does not systematically mean that consent needs to be collected". §40: exemptions are left to national law and national authorities | https://www.edpb.europa.eu/system/files/documents/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf |
| Older EU guidance on exemptions (WP194, 2012) | Analytics: "not strictly necessary to provide a functionality explicitly requested by the user [...] these cookies do not fall under the exemption", although "not likely to create a privacy risk when [...] strictly limited to first party aggregated statistical purposes" with clear information, "a user friendly mechanism to opt-out" and anonymisation of IPs; WP29 suggested the legislator "might appropriately add a third exemption criterion" (it has not, in PKE). Security: "user centric security cookies" set "for the specific task of increasing the security of the service that has been explicitly requested by the user" fall under the strictly-necessary exemption; "would not however cover [...] security of websites or third party services that have not been explicitly requested" | WP29 Opinion 04/2012 (WP194), https://ec.europa.eu/justice/article-29/documentation/opinion-recommendation/files/2012/wp194_en.pdf |
| **Umami (cookieless)** | Sets no cookie, but its JS reads screen size, language, DNT and localStorage and makes the browser send them (EDPB §33 → in scope of art. 5(3) / PKE art. 399). Analytics is not "necessary for the requested service" on the WP194 reading. So, on the letter of art. 399, Umami is **not consent-exempt**; the vendor's own claim "you can use Umami without needing to display a cookie consent banner" (pricing FAQ) is a vendor statement, not a legal source | sources above; https://umami.is/pricing |
| Polish practice | UODO's own site runs Plausible (cookieless) "nie wykorzystuje plików cookie i nie zbiera danych osobowych" with **no consent mechanism** [baseline: compliance.md § 4, https://uodo.gov.pl/pl/1/255, read 2026-09-27]. UODO is not the art. 399 enforcer. No UKE decision or guidance on cookieless analytics under art. 399 was found in this run (not searched exhaustively: search budget) → **Unknown** | [baseline] |
| France (contrast) | CNIL exempts audience measurement from consent when first-party only, strictly anonymous statistics, no cross-site tracking, trackers ≤ 13 months, data ≤ 25 months, users informed and able to object. This is a French-law position (CNIL), not binding in Poland | [baseline] compliance.md § 4, https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications |
| EU reform | Proposed GDPR art. 88a (Digital Omnibus) for first-party aggregate measurement: **not adopted** as of the baseline check (24.09.2026) | [baseline] compliance.md § 4 |
| **Turnstile** | Cloudflare's docs: "Cookies and local storage [...] Turnstile [...] relies on these mechanisms to maintain state and track visitor behavior" (mobile WebView section); "Ephemeral IDs [...] No cookies or local storage is required"; the `cf_clearance` cookie only in "pre-clearance" mode. So Turnstile reads/stores on the device → art. 399 applies; the security exemption (ust. 3 pkt 2 + WP194 "user centric security") fits only where the widget protects the service the visitor asked for (sending the form). Loading it **only on the contact form** (not site-wide) keeps it inside that reading | https://developers.cloudflare.com/turnstile/llms-full.txt; WP194 |
| Cal.com embed | The embedded app uses "cookies for logging you in, remembering preferences, and security" (Cal.com privacy, "In the app"). Exact cookies set inside an embed on his page: **Unknown** (not tested). A plain link to the booking page, or loading the embed only after a click, avoids third-party storage before the visitor asks for it | https://cal.com/privacy |
| Own opt-out flag | Storing `umami.disabled` when the visitor asks not to be counted = storage the visitor requested (ust. 3 pkt 2 reading) | [baseline] compliance.md § 4 |

**What the facts add up to (not a compliance claim):**
- No cookies of his own + Turnstile only on the form + plain social links = nothing in the setup that
  is clearly outside the art. 399 ust. 3 exemption **except analytics**.
- For Umami there are exactly three positions the sources support: (a) a minimal consent prompt for
  statistics only; (b) banner-less with disclosure + opt-out + DNT/GPC honoured (UODO's own practice,
  the WP194 "low risk" profile, the CNIL model), accepting a non-zero residual risk under a literal art.
  399 (fine ceiling 15 000 zł for a person without revenue, art. 446 ust. 3); (c) no client-side
  analytics at all (e.g. only server-side aggregate counts that read nothing from the device). The
  PstrykWeb project chose (b) with "Lawyer: Y" [baseline compliance.md § 4, D5]. **The choice is the
  owner's**; the policy must describe whichever is built.
- "Cookie banner needed?" therefore = **No for everything except client-side analytics; for Umami it is
  a risk decision**, not settled by any Polish authority found.

## Extra (coordinator, 2026-10-05): rights in PstrykWeb, Neoteric Clockful, store badges

### E.1 PstrykWeb, built under an umowa zlecenia for CETUSPRO

| Point | Finding | Source |
|---|---|---|
| Who owns rights by default | "Prawo autorskie przysługuje twórcy, o ile ustawa nie stanowi inaczej" (PrAut art. 8 ust. 1); the creator has the exclusive right to use and dispose of the work "na wszystkich polach eksploatacji" (art. 17) | PrAut (Appendix A) |
| Employee-work rules do not reach a zlecenie | Art. 12 ust. 1 and art. 74 ust. 3 speak only of a work/program created by a **pracownik** "w wyniku wykonywania obowiązków ze stosunku pracy". An umowa zlecenia is a civil-law contract (KC art. 734 § 1; services: art. 750). **Caveat:** KP art. 22 § 1¹: work done under the features of employment (under direction, at a set place and time, for pay) "jest zatrudnieniem na podstawie stosunku pracy, bez względu na nazwę zawartej przez strony umowy" | PrAut art. 12, 74 ust. 3; KC art. 734, 750 (t.j. Dz.U. 2026 poz. 795, https://api.sejm.gov.pl/eli/acts/DU/2026/795/text.pdf); KP art. 22 § 1¹ |
| How rights move under a zlecenie | Only by contract: art. 41 ust. 1 pkt 1. **Art. 41 ust. 2**: "Umowa o przeniesienie autorskich praw majątkowych lub licencja obejmują pola eksploatacji wyraźnie w nich wymienione." Art. 41 ust. 4: only fields known when signed. **Art. 53**: "Umowa o przeniesienie autorskich praw majątkowych wymaga zachowania formy pisemnej pod rygorem nieważności." Art. 50 lists separate fields (reproduction, distribution, public making available online). Art. 74 ust. 4: for programs, reproduction, modification and distribution | PrAut |
| No express transfer = licence | **Art. 65**: "W braku wyraźnego postanowienia o przeniesieniu prawa, uważa się, że twórca udzielił licencji." Art. 67 ust. 2: a licence is non-exclusive unless exclusivity is reserved; art. 67 ust. 5: an exclusive licence needs written form under pain of nullity. Art. 66 ust. 1: a licence lasts 5 years in the licensee's country unless agreed otherwise; art. 68 ust. 2: a licence for more than 5 years becomes indefinite after 5 years | PrAut |
| The sentence in his contract | "Zleceniobiorca oświadcza, że przysługują mu lub będą mu przysługiwać wszelkie majątkowe prawa autorskie do Utworów wytworzonych w związku z realizacją Umowy." Read alone, this is a **statement of fact about who holds the rights** (a warranty of title); it transfers nothing. In Polish IT contracts such a warranty usually **precedes** a transfer clause ("przenosi na Zleceniodawcę [...] na polach eksploatacji [...]") or a licence clause, which would then decide who holds the rights now. Whether such a clause exists, its fields of exploitation, the moment of transfer (on payment / on acceptance) and any confidentiality clause: **Unknown: the full contract text decides** | PrAut art. 41 ust. 2, 53, 64, 65; contract wording as quoted by the owner; Polish drafting practice = [secondary, general knowledge, not verified in this run] |
| Moral rights stay with him | Art. 16: authorship and being named are unlimited in time and cannot be waived or sold. **For programs, art. 77 ust. 1 disapplies art. 16 pkt 3-5**, so for code the moral rights are mainly authorship (pkt 1) and being named or anonymous (pkt 2). Saying "I built X" is an exercise of authorship; publishing the material is a separate question (economic rights, confidentiality, trade secret) | PrAut art. 16, 77 ust. 1; synthesis § 6a ([expert] Klisz) |
| Trade secret | UZNK art. 11 ust. 1-2: disclosure of "tajemnica przedsiębiorstwa" (information not publicly known with value, which the holder took steps to keep confidential) is an act of unfair competition. What is public on pstrykweb.pl is not secret; internal architecture, code, metrics, client data may be | UZNK t.j. Dz.U. 2026 poz. 85, https://api.sejm.gov.pl/eli/acts/DU/2026/85/text.pdf |

**What he may publish, by contract scenario** (facts → consequence; counsel confirms):

| Item | No transfer, no licence, no confidentiality clause | Transfer or exclusive licence to CETUSPRO | Confidentiality / NDA clause (any scenario) |
|---|---|---|---|
| Naming CETUSPRO / PstrykWeb + "built by me" | Authorship (art. 16 pkt 1-2). Naming the company is a fact; check the company did not forbid it | Still authorship; naming the client is not an exploitation of the work | Depends on whether the client's identity is defined as confidential |
| Describing his role, decisions, stack (own words) | Ideas and principles are not protected (art. 74 ust. 2); own text is his work | Same | Check scope: "informacje poufne" often covers technical/organisational know-how |
| Screenshots / video of the **public** site | Reproduction of the work (art. 50 pkt 1, 3) is his right | The holder's right on the transferred fields; showing it needs their OK unless a quotation/right-of-quotation reading (art. 29) applies: **Unknown**, ask | Public site is not secret (UZNK art. 11 ust. 2); the contract may still restrict |
| Architecture diagrams | His own new drawing of ideas (art. 74 ust. 2) | Same, but internal details may be confidential | Likely covered if internal |
| Metrics (traffic, conversions, revenue) | Not a work; may be the company's trade secret | Same | Likely covered |
| **Code** (repo, snippets) | His economic rights | Needs the holder's licence (art. 74 ust. 4) | Likely covered; "a textbook trade-secret breach" per [expert] Klisz in synthesis § 6a |
| His blog byline on pstrykweb.pl | Already public, with his consent [baseline LEGAL.md § 6.14] | - | - |

**Exact words to look for in the contract:** "przenosi", "przeniesienie autorskich praw majątkowych",
"z chwilą (przyjęcia / zapłaty / wydania)", "pola eksploatacji" and the list after it ("utrwalanie",
"zwielokrotnianie", "publiczne udostępnianie", "wprowadzanie do pamięci komputera", "modyfikacja",
"kod źródłowy"), "licencja" / "licencji wyłącznej" / "niewyłącznej", "zależne prawo autorskie" (art.
46), "wykonywanie autorskich praw osobistych" / "nie będzie wykonywał" (a promise not to exercise moral
rights, the usual workaround since art. 16 rights cannot be sold), "informacje poufne" / "tajemnica" /
"poufność" and its duration, "portfolio" / "referencje" (some contracts allow it expressly), "kara
umowna", and any annex ("załącznik") with a protocol of acceptance ("protokół odbioru").

**Permission e-mail (PL, short):**

> Temat: Zgoda na pokazanie PstrykWeb w moim portfolio
>
> Dzień dobry,
>
> buduję portfolio zawodowe (adres: …). Chciałbym pokazać w nim PstrykWeb jako projekt, który
> realizowałem dla CETUSPRO na podstawie umowy zlecenia z dnia …. Proszę o potwierdzenie, że mogę
> opublikować:
> 1. nazwę CETUSPRO i PstrykWeb oraz informację, że byłem autorem/głównym deweloperem,
> 2. opis mojej roli, decyzji technicznych i stosu technologicznego (własnymi słowami),
> 3. zrzuty ekranu i krótkie nagranie publicznej strony pstrykweb.pl,
> 4. uproszczony diagram architektury bez danych wewnętrznych,
> 5. [opcjonalnie] wybrane wskaźniki: …, [opcjonalnie] fragmenty kodu: ….
>
> Nie opublikuję danych klientów, haseł, kodu ani informacji poufnych poza tym, na co Państwo się
> zgodzą. Przed publikacją mogę przesłać tekst do akceptacji. Wystarczy odpowiedź e-mailem.
>
> Pozdrawiam, Mateusz Muszarski

### E.2 Neoteric Clockful (internship project; repo public on his GitHub)

| Point | Finding | Source |
|---|---|---|
| What decides ownership | The legal form of the internship and its text: (a) **umowa o pracę** → PrAut art. 12 / 74 ust. 3 give the employer the economic rights to work done in the course of duties; (b) **umowa o praktykę absolwencką** → the act says "Do praktyki nie mają zastosowania przepisy prawa pracy" (art. 4, with listed exceptions) and requires a written contract (art. 5 ust. 1) whose minimum content (art. 5 ust. 2) has no copyright clause → rights follow the contract text, else stay with the author (art. 8 ust. 1), with a possible implied licence (art. 65); (c) **zlecenie / o dzieło** → as E.1; (d) **student or school internship** (praktyki under a university/school agreement) or **no contract** → no statutory transfer found; art. 53 requires writing for any transfer. Re-characterisation risk under KP art. 22 § 1¹ as in E.1 | ustawa o praktykach absolwenckich t.j. Dz.U. 2025 poz. 1578, https://api.sejm.gov.pl/eli/acts/DU/2025/1578/text.pdf; PrAut art. 8, 12, 53, 65, 74 ust. 3 |
| Public repo | A public repo under his account shows he published it; it does not prove he holds the rights, and if Neoteric holds them, the repo itself would need their licence. Whether Neoteric made the brief, design, assets or data, and whether an NDA was signed: **Unknown** | inference from PrAut art. 17, 74 ust. 4 |
| Confirm with Neoteric before naming them | (1) the legal form of the internship and any signed document; (2) whether they claim rights in the code/design and whether the public repo is OK; (3) whether he may name Neoteric and use their logo (trademark use needs their OK, see § 4); (4) whether the brief/design/data were confidential; (5) the wording they prefer ("internship project at Neoteric"). Same e-mail pattern as E.1 | - |

### E.3 His own app (Linkoglot): store screenshots, recordings, badges

- His own screenshots and recordings of his own app: his own works; the only third-party elements are
  the store chrome (if he screenshots the store page itself) and device frames.
- **Apple "Download on the App Store" badge** (App Store Marketing Guidelines): "Use only the badge
  artwork provided in these guidelines"; "Don't modify, angle, or animate the App Store badge"; "Use one
  App Store badge per layout or video"; "Place the App Store badge first in the lineup of badges";
  minimum clear space = one quarter of the badge height; minimum height "40 px for use onscreen"; when
  the badge is used, "credit both Apple and the Apple Logo" in the credit lines, placed where legal
  notices are; images may not "falsely suggest an association with Apple". The badge is licensed under
  Apple's "App Store Marketing Artwork License Agreement" on the same page.
  Source: https://developer.apple.com/app-store/marketing/guidelines/
- **Google Play "Get it on Google Play" badge**: use the badge (not the logo lockup) to drive
  downloads; minimum digital height 28 px; "make sure the Google Play badge is the same size or larger
  than the other badges"; clear space one quarter of the height; localized badge for non-English pages;
  don't change colour, rearrange, rescale elements or use outdated artwork (download from Partner
  Marketing Hub). Source: https://play.google.com/intl/en_us/badges/
- Note the two rules pull in opposite directions on order and size (Apple first; Google same size or
  larger): equal sizes with Apple first satisfies both texts.

## 3. Terms ("regulamin"): required or not

### 3.1 The statutory trigger

- UŚUDE duties (art. 5 information, art. 8 regulamin) bind a **usługodawca**, defined as a person who
  "prowadząc, chociażby ubocznie, działalność zarobkową lub zawodową świadczy usługi drogą
  elektroniczną" (art. 2 pkt 6). Two conditions: (1) gainful or professional activity, even as a side
  activity; (2) providing an e-service ("na indywidualne żądanie usługobiorcy", art. 2 pkt 4).
- Art. 8 ust. 2: a recipient is not bound by regulamin terms not made available as ust. 1 pkt 2 says.
  There is no separate fine for a missing regulamin in the UŚUDE text read; the consequence is that
  unpublished terms do not bind (sanctions elsewhere in the act concern unsolicited commercial
  information, not read in full).

### 3.2 The three scenarios

| Scenario | Usługodawca? | Regulamin (art. 8)? | Art. 5 info (name, address, e-mail)? | Basis |
|---|---|---|---|---|
| **(a) Job-seeker portfolio + contact form**, no paid work offered | On the text, **no**: seeking employment is not "działalność zarobkowa"; whether a job-seeker's self-promotion counts as "działalność zawodowa" is not settled by any source read (**Unknown**, interpretive) | **Not required on the statute's text.** Separately, whether a contact form is an e-service at all is disputed: [secondary] r. pr. W. Habrowski (9.09.2024): a contact form "nie stanowi usługi a jedynie punkt kontaktowy" and a newsletter "nie jest usługą tylko formą reklamy" (https://blog.habrowski.pl/sude-czyli-o-usludze-spoleczenstwa-informacyjnego/); the PstrykWeb baseline relied on sources saying forms and newsletters are e-services (compliance.md § 5, citing arslege and RPMS) | Not required | UŚUDE art. 2 pkt 4, 6; art. 5; art. 8 |
| **(b) Same site + freelance offer** (registered JDG or unregistered activity) | **Yes, if the site serves that gainful activity** ("chociażby ubocznie") | Required **for whatever e-services the site provides** (newsletter, comments, a booking tool he operates; the contact form alone: disputed, see (a)). Minimum content: art. 8 ust. 3 pkt 1-4 | **Required**: "imię, nazwisko, miejsce zamieszkania i adres", e-mail (art. 5 ust. 2); NIP in offers if he has one (art. 5 ust. 4 → Prawo przedsiębiorców art. 20 ust. 3, not re-read) | UŚUDE art. 2 pkt 6, 5, 8 |
| **(c) + newsletter or blog comments** | as (a)/(b) | Newsletter: an e-service on the majority reading used in the baseline; contested by Habrowski [secondary]. Marketing e-mails need prior consent under PKE art. 398 regardless [baseline compliance.md § 3.1]. Comments: storing visitors' content = "hosting" (DSA art. 3(g)(iii)); the DSA applies only to an "information society service", i.e. one "normally provided for remuneration" (DSA art. 3(a) → Directive (EU) 2015/1535 art. 1(1)(b)); for a non-commercial personal blog: **Unknown**; for a business site the hosting duties apply: art. 12 single point of contact, art. 14 terms on content moderation, art. 16 notice and action (art. 19's micro/small exclusion covers only the online-platform section) | as (b) | DSA, Cellar `32022R2065`; Directive 2015/1535, Cellar `32015L1535` |

**Consumer-law duties if freelance B2C services are sold at a distance** (UPK t.j. Dz.U. 2026 poz. 1244):
- A "distance contract" = concluded "w ramach zorganizowanego systemu zawierania umów na odległość"
  using only distance means (art. 2 pkt 1). Whether e-mail/call negotiation of a one-off freelance job
  is an "organised system": **Unknown** (interpretive).
- If it is: art. 12 ust. 1 information before the contract (main characteristics; identity data incl.
  registration; "adresie przedsiębiorstwa, adresie poczty elektronicznej oraz numerze telefonu";
  complaints address; total price incl. taxes; withdrawal right and more). The 14-day withdrawal right,
  express-start consent and the model form: [baseline] compliance.md § 7 (art. 27-38 UPK, not re-read).
- Language: offers and consumer information to consumers living in Poland must exist in Polish (UJP
  art. 7 ust. 1, art. 7a ust. 1-2).
- B2B only: UPK duties do not apply, except that a sole trader buying outside his professional profile
  gets consumer-like protection (art. 7aa UPK, art. 385⁵ KC) [baseline compliance.md § 7].

## 4. Images, names and logos

| Item | Facts | Consequence / safe alternative | Source |
|---|---|---|---|
| **Photos of instructors (Jonas Schmedtmann, Bruno Simon)** | Two separate rights: (1) **the person's image**: "Rozpowszechnianie wizerunku wymaga zezwolenia osoby na nim przedstawionej" (PrAut art. 81 ust. 1); the "osoba powszechnie znana" exception needs the image to have been made "w związku z pełnieniem przez nią funkcji publicznych, w szczególności [...] zawodowych" (ust. 2 pkt 1); image and name are also personal rights (KC art. 23) with remedies (KC art. 24). (2) **the photographer's copyright**: a photo is a work (PrAut art. 1 ust. 2 pkt 3); the quotation right covers purposes "takimi jak wyjaśnianie, polemika, analiza krytyczna lub naukowa, nauczanie lub prawami gatunku twórczości" (art. 29), and decorative "social proof" is not among them (inference). Which law governs a foreigner's personal rights: Rome II excludes "violations of privacy and rights relating to personality" (art. 1(2)(g)); Polish PIL art. 16: the person's national law, or at the victim's choice the law where the event or its effects occurred (Bruno Simon is "a French creative developer" per threejs-journey.com) | Using their photos to signal "taught by the best" is a use their permission would cover; without it, both the image right and the photo's copyright are open questions. If he freelances, implying an endorsement can also be misleading advertising between businesses (UZNK art. 3, 16 ust. 1 pkt 2; UZNK applies to "przedsiębiorcy", art. 2). **Safe:** text credit ("Learned from: The Ultimate React Course by Jonas Schmedtmann (Udemy) · Three.js Journey by Bruno Simon") + a link to each verifiable certificate; or a written (e-mail) permission from each instructor naming the photo and the use | PrAut art. 1, 29, 81; KC art. 23-24 (t.j. Dz.U. 2026 poz. 795); Rome II, Cellar `32007R0864`; ustawa Prawo prywatne międzynarodowe art. 16 (t.j. Dz.U. 2023 poz. 503, https://api.sejm.gov.pl/eli/acts/DU/2023/503/text.html); UZNK (t.j. Dz.U. 2026 poz. 85) |
| **Certificate images (Udemy, Three.js Journey)** | Udemy: the certificate "you can share with your friends, relatives, co-workers, and potential employers"; each has a shareable URL; "Udemy is not an accredited institution. Certificates demonstrate skills and accomplishments, but they cannot be used for formal accreditation." Three.js Journey: "a public certificate that you can print or share with the world" | Showing his own certificate (image or link) matches both providers' own wording. Do not present Udemy certificates as accredited qualifications (contrast with INF.0x state certificates, § 6) | https://support.udemy.com/hc/en-us/articles/229603868-Certificate-of-Completion; https://threejs-journey.com/ |
| **Provider logos (Udemy etc.)** | EU trade mark law: infringement requires use "in the course of trade" (EUTMR art. 9(2)); referential use "for the purpose of identifying or referring to goods or services as those of the proprietor" is allowed if "in accordance with honest practices" (art. 14(1)(c), 14(2)). Whether a job-seeker's portfolio is "in the course of trade": **Unknown**; a freelance site is closer to it. Udemy's own brand guidelines: **Unknown** (about.udemy.com/brand/ returned 404; udemy.com/terms/ rendered no text) | Plain text names + links are the referential use the article describes; a wall of logos adds trademark questions for no hiring gain (the synthesis already rejects logo walls, § 7) | EUTMR (EU) 2017/1001, Cellar `32017R1001` |
| **Erasmus+ / European Solidarity Corps** | EU emblem, third-party use: "Any natural or legal person ('user') may use the EU emblem [...] irrespective of whether the use is of a non-profit or a commercial nature, unless: the use creates the incorrect impression [...] that there is a connection between the user and any of the institutions [...]; the use leads the public to erroneously believe that the user benefits from the support, sponsorship, approval or consent [...]; the use is in connection with any objective or activity which is incompatible with the aims and principles of the European Union". For funded projects: "Apart from the emblem, no other visual identity or logo may be used to highlight the EU support." These rules address beneficiaries (organisations) and third parties; no rule for individual participants' CVs was found. ESC-specific logo rules: **Unknown** (not read). Youthpass is the certificate used in both programmes (Youthpass FAQ lists "Youthpass in the new Erasmus+ and European Solidarity Corps programmes in 2021-2027"); public online verification of a Youthpass: **Unknown** (`/en/validate/` returned 404 without a code) | **Safe:** text ("Erasmus+ youth exchange, <country>, <year>, <role>"; "European Solidarity Corps volunteer, <org>, <dates>") + Youthpass on request or as a PDF. Placing the EU flag next to his own name invites the "connection / endorsement" reading the rule forbids | "The use of the EU emblem in the context of EU programmes 2021-2027" (March 2021), https://commission.europa.eu/document/download/3192a0ef-6bda-4e1a-81ca-65ade2ffad73_en?filename=eu_emblem_rules.pdf; https://www.youthpass.eu/en/help/faqs/ |
| **Client logos and screenshots** | Client site design and code are works (PrAut art. 1, 74); employee works go to the employer (art. 12, 74 ust. 3); civil-law contracts decide case by case (§ E.1); client logos are the clients' trade marks (EUTMR art. 9, 14 as above); internal information may be a trade secret (UZNK art. 11); screenshots can contain real people's personal data (GDPR). NDA practice: synthesis § 4 and showcase § 6 (not repeated) | **Safe:** written permission per project (template § E.1), anonymised case study, or a rebuild of the hard part on fake data (the NDA ladder L0-L5 in `2026-10-05-project-showcase-patterns.md` § 6b); blur any real user data | sources in the cells |
| **His own photo** | His own image; no third-party permission needed unless the photographer kept rights (PrAut art. 1, 17: a photo taken by someone else is that person's work) | Use a photo he took or one whose photographer agreed to the use | PrAut |

## 5. Publishing his own sensitive data (faith) on /my-life

| Point | Finding | Source |
|---|---|---|
| Category | "religious or philosophical beliefs" are special-category data; processing is prohibited unless art. 9(2) applies (art. 9(1)) | GDPR art. 9 |
| "Manifestly made public by the data subject" (art. 9(2)(e)) | CJEU C-252/21 Meta v Bundeskartellamt (4.07.2023), para 75: the derogation covers only data made public "by the data subject"; para 76: art. 9(2) "must be interpreted strictly"; **para 77: "it is important to ascertain whether the data subject had intended, explicitly and by a clear affirmative action, to make the personal data in question accessible to the general public"** | `http://publications.europa.eu/resource/celex/62021CJ0252` |
| Limits | CJEU C-446/21 Schrems v Meta (4.10.2024), paras 79-83: a public statement can amount to manifestly making the data public; but (para 80) the data may then be processed only "in accordance with the requirements deriving from the other provisions of that regulation", and this "does not [...] authorise the processing of other personal data relating to" that category; (para 82) it is not consent under art. 9(2)(a) | `http://publications.europa.eu/resource/celex/62021CJ0446` |
| Applied | Writing about his faith on his own public page is his own deliberate act of publication, which matches the para 77 test (inference). It does not let others process further data about his beliefs, and others still need an art. 6 basis | inference |
| Employer side (Poland) | KP art. 22¹ § 1: what an employer may ask a candidate (name, date of birth, contact data, education, qualifications, employment history) does not include religion. Art. 22¹ᵇ § 1: art. 9 data may be processed on consent "wyłącznie w przypadku, gdy przekazanie tych danych osobowych następuje z inicjatywy osoby ubiegającej się o zatrudnienie"; art. 22¹ᵃ § 2 (applied): no unfavourable treatment, in particular no refusal to hire, for not consenting. Art. 11³ and 18³ᵃ § 1: no discrimination on "religię" or "wyznanie", including in "nawiązania [...] stosunku pracy". Constitution art. 53 ust. 7: "Nikt nie może być obowiązany przez organy władzy publicznej do ujawnienia swojego światopoglądu, przekonań religijnych lub wyznania" (public authorities only) | KP t.j. Dz.U. 2026 poz. 1245; Konstytucja RP, Dz.U. 1997 nr 78 poz. 483, https://api.sejm.gov.pl/eli/acts/DU/1997/483/text.pdf |
| Open | Whether a recruiter who reads /my-life and notes his faith in an ATS processes it lawfully (art. 9(2)(e) + KP art. 22¹ᵇ "z inicjatywy"): **Unknown**, not decided by any source found. What the facts do settle: using it in the hiring decision is prohibited discrimination (KP art. 18³ᵃ) | - |
| Practical facts | The page is his choice to publish. The privacy policy needs no special section for his own data. Showing third persons (friends, church community, other volunteers) in photos on /my-life brings back the art. 81 PrAut permission and, for faith-related context, art. 9 GDPR for **them** | PrAut art. 81; GDPR art. 9 |

## 6. INF.02 / INF.03 / INF.04: official names, levels, English rendering

Official source: Obwieszczenie MEN z 19.03.2024, t.j. rozporządzenia MEN w sprawie ogólnych celów i
zadań kształcenia w zawodach szkolnictwa branżowego oraz klasyfikacji zawodów szkolnictwa branżowego,
**Dz.U. 2024 poz. 611**, branża teleinformatyczna (INF), https://api.sejm.gov.pl/eli/acts/DU/2024/611/text.pdf
(later amendments Dz.U. 2025 poz. 230, 2025 poz. 771, 2026 poz. 404 were searched: none mentions INF.02-04,
technik informatyk or technik programista). In the table, a Roman numeral = PRK level of the full
qualification (the occupation diploma), an Arabic numeral = PRK level of the partial qualification
(explanatory notes, items 2 and 6).

| Code | Official Polish name | PRK level | Occupation(s) it belongs to | English rendering (**own translation**: no official English name was found) |
|---|---|---|---|---|
| INF.02 | Administracja i eksploatacja systemów komputerowych, urządzeń peryferyjnych i lokalnych sieci komputerowych | 4 | technik informatyk | Administration and operation of computer systems, peripheral devices and local area networks |
| INF.03 | Tworzenie i administrowanie stronami i aplikacjami internetowymi oraz bazami danych | 5 | technik informatyk **and** technik programista | Development and administration of websites, web applications and databases |
| INF.04 | Projektowanie, programowanie i testowanie aplikacji | 5 | technik programista | Design, programming and testing of applications |
| Occupation | **Technik informatyk**, code 351203, PRK V, school types: technikum | V | qualifications INF.02 + INF.03 | e.g. "IT Technician" (own translation) |
| Occupation | **Technik programista**, code 351406, PRK V, technikum | V | qualifications INF.03 + INF.04 | e.g. "Programming Technician" / "Software Development Technician" (own translation) |

- **Certificate vs diploma.** "Zdający, który zdał egzamin zawodowy, otrzymuje certyfikat kwalifikacji
  zawodowej wydany przez okręgową komisję egzaminacyjną"; the pass marks are ≥ 50 % in the written part
  and ≥ 75 % in the practical part (ustawa o systemie oświaty art. 44zzzo ust. 2 and 4, t.j. Dz.U. 2025
  poz. 881, https://api.sejm.gov.pl/eli/acts/DU/2025/881/text.pdf). A **dyplom zawodowy** (the
  occupation title) needs certificates in **all** qualifications of the occupation plus the required
  general education (extern route: art. 10 ust. 3 pkt 2 lit. d "wykształcenie średnie"; the school
  route is in Prawo oświatowe, not read). With INF.02 + INF.03 + INF.04 he holds the qualification set
  of **both** occupations; whether he holds the diplomas (technik informatyk / technik programista):
  **Unknown** (owner checks his documents).
- **EQF.** The ZSK act defines PRK levels 1-8 (art. 5-8, t.j. Dz.U. 2024 poz. 1606) and refers to the EQF
  Recommendation of 22.05.2017; Poland referenced the PRK to the EQF in 2013 with levels that correspond
  one to one [summary of Cedefop https://www.cedefop.europa.eu/en/tools/nqfs-online-tool/countries/poland-2024
  and https://prk.men.gov.pl/en/1en/, not read in full] → INF.03/INF.04 = EQF level 5, INF.02 = EQF 4.
- **Issuers in English:** CKE = Central Examination Board (Centralna Komisja Egzaminacyjna); the
  certificate itself is issued by the regional board (OKE, okręgowa komisja egzaminacyjna) per art.
  44zzzo ust. 4. Online verification of OKE certificates: **Unknown**.
- **Suggested line (facts only):** "Polish State Vocational Qualification INF.04 – Design, programming and
  testing of applications (certificate issued by the Regional Examination Board, OKE <city>, <year>;
  PRK/EQF level 5)." Keep the Polish code and name visible for Polish employers.

## 7. Language of the legal documents (en / pl / es)

| Point | Finding | Source |
|---|---|---|
| Standard | Art. 12(1): "concise, transparent, intelligible and easily accessible form, using clear and plain language"; recital 58 | GDPR |
| Translations | WP260 rev.01 para 13: "Where the information is translated into one or more other languages, the data controller should ensure that all the translations are accurate and that the phraseology and syntax makes sense in the second language(s) so that the translated text does not have to be deciphered or re-interpreted. (A translation in one or more other languages should be provided where the controller targets data subjects speaking those languages.)" Footnote 15: operating "a website in the language in question" may indicate targeting | WP260 rev.01 (URL in § 1.2) |
| So for es | A Spanish version of the site is the "targeting" signal in footnote 15 → a Spanish policy is expected. No rule forbids machine/AI translation; the duty is **accuracy** → a human check by a fluent Spanish reader before publishing | inference from WP260 para 13 |
| Prevailing-language clause | Practice in the baseline: Polish binds, en/uk say "the Polish version prevails" [baseline legal/README.md; PstrykWeb en policy last line]. For a **privacy notice** (information, not a contract) such a clause cannot cure an inaccurate translation, since para 13 requires each translation to be accurate (inference). For **consumer** documents in Poland: UJP art. 8 ust. 1a ("Podstawą ich wykładni jest wersja w języku polskim, jeżeli [...] konsument [jest] obywatel[em] Rzeczypospolitej Polskiej") | UJP t.j. Dz.U. 2026 poz. 81 |
| Which version to make primary | Job-seeking only: no statute found that requires Polish for his privacy notice (UJP art. 7 covers consumer trade and labour-law performance). Freelance B2C in Poland: Polish versions of offers and consumer information are mandatory (UJP art. 7a ust. 2). Owner decision: EN primary (EN-first site) or PL primary (matches UJP if B2C) | UJP art. 7, 7a, 8 |

## 8. noindex for legal pages; accessibility law

- **noindex.** No provision found in GDPR, PKE, UŚUDE or UPK that requires legal pages to be indexed by
  search engines. What the sources require is accessibility to the visitor: a link "clearly visible on
  each page of this website" (WP260 para 11), and for a regulamin availability "przed zawarciem umowy"
  in a form that can be saved and reproduced (UŚUDE art. 8 ust. 1 pkt 2). noindex + footer link on
  every page + a link next to the contact form is consistent with both.
- **Ustawa o dostępności cyfrowej** (t.j. Dz.U. 2023 poz. 1440): applies to the entities in art. 2
  (public-finance sector units, state organisational units, public-law bodies...). A private individual
  is not among them.
- **EAA / Polish implementing act** (ustawa z 26.04.2024 o zapewnianiu spełniania wymagań dostępności
  niektórych produktów i usług przez podmioty gospodarcze, Dz.U. 2024 poz. 731,
  https://api.sejm.gov.pl/eli/acts/DU/2024/731/text.html): obligations for services bind "usługodawców"
  (art. 2 pkt 2) for listed services, incl. "usługi handlu elektronicznego - usługi oferowane lub
  świadczone na odległość przez strony internetowe [...] na indywidualne żądanie konsumenta w celu
  zawarcia umowy" (art. 5 pkt 32 definition list); **art. 4 pkt 1: the act does not apply to "usług
  oferowanych lub świadczonych przez mikroprzedsiębiorców"**. EAA: "microenterprise" = fewer than 10
  persons and turnover or balance sheet ≤ EUR 2 million (art. 3(23)); "Microenterprises providing
  services shall be exempt" (art. 4(5)); "e-commerce services" = at a consumer's request "with a view to
  concluding a consumer contract" (art. 3(30)) (Directive (EU) 2019/882, Cellar `32019L0882`).
  → A job-seeker's portfolio is not an e-commerce service; a one-person freelance business is a
  microenterprise and its services are exempt on the text. WCAG remains a quality goal the synthesis
  already sets (§ 1 row 9), not a legal duty here.

## 9. Deliverables

### 9(a) Facts table

| Topic | Finding | Source |
|---|---|---|
| GDPR applies? | Yes on the text: a public, job-seeking site with a form is not "purely personal"; publication to an indefinite audience is outside the exemption | GDPR art. 2(2)(c), recital 18; CJEU C-101/01 para 47; C-212/13 paras 29-33 |
| Controller | Mateusz Muszarski (natural person) | GDPR art. 4(7) |
| Policy content | Art. 13(1)(a)-(f), 13(2)(a)-(f); clear and plain language | GDPR art. 12-13 |
| Postal address | Not named by GDPR art. 13; required by UŚUDE art. 5 only for a usługodawca (freelance) | GDPR art. 13(1)(a); UŚUDE art. 2 pkt 6, 5 ust. 2 |
| Contact form basis | Art. 6(1)(f), or 6(1)(b) for pre-contract requests; no consent needed | GDPR art. 6 |
| Logs basis | Art. 6(1)(f), recital 49 | GDPR |
| Vercel DPA | Pro and Enterprise only; none on Hobby; Hobby is non-commercial only | vercel.com/legal/dpa (eff. 31.03.2026); fair-use guidelines |
| Vercel functions region | Default iad1 (Washington, D.C.); configurable | Vercel docs |
| Vercel log retention | Hobby 1 h, Pro 1 day, Observability Plus 30 days, Enterprise 3 days | Vercel docs (updated 28.08.2026) |
| Resend | Data stored in the US; pre-signed DPA for every account; 30-day data retention on Free/Pro/Scale; DPF "Active - Re-certification under Review" | resend.com/security/gdpr; DPF list |
| Cloudflare Turnstile | Signals: IP, TLS fingerprint, UA, sitekey/origin; processor + own controller; must reference the Turnstile Privacy Addendum (invisible/offlabel); DPF "Active - Re-certification under Review" | Turnstile addendum 18.06.2025; Turnstile docs; DPF list |
| Umami Cloud | Servers "US and EU"; data-region selection "Available" (security page 29.07.2026); DPA automatic on account use, SCCs; **not DPF-certified**; retention Hobby 6 months / Pro 2 years | umami.is/security, /pricing, /dpa; DPF list |
| Cal.com | Processor for bookings under its DPA; data in the US; EU residency on request; DPF Active | cal.com/privacy (1.10.2026); DPF list |
| DPF validity | General Court upheld the DPF (T-553/23 Latombe, 3.09.2025); appeal C-703/25 P pending [secondary: summaries of streamlex.eu / secureprivacy.ai, 2026] | search summary, not the judgment text |
| Cookie rule | PKE art. 399 (replaced art. 173 PT on 10.11.2024); consent unless strictly necessary for the requested service; enforced by Prezes UKE; fine up to 15 000 zł if no revenue | PKE art. 399, 444, 446; PKE-wpr art. 68 |
| Cookieless JS | In scope of art. 5(3) when JS makes the browser send device information | EDPB 2/2023 §33, §55-56 |
| Analytics exemption | None in PKE; WP29 called first-party aggregate analytics low-risk but not exempt; CNIL exempts under conditions (France only) | WP194; [baseline] CNIL sheet 16 |
| Polish regulator practice | UODO's site uses Plausible without consent; no UKE position on cookieless analytics found | [baseline] uodo.gov.pl/pl/1/255 |
| Turnstile and art. 399 | Uses cookies/local storage per Cloudflare docs; fits the security / requested-service exemption when limited to the form | Turnstile docs; WP194 § 3.3; PKE art. 399 ust. 3 pkt 2 |
| Regulamin | Only for a usługodawca (gainful/professional activity) providing e-services; contact form's status disputed | UŚUDE art. 2 pkt 6, 8; [secondary] Habrowski 2024 |
| Comments | Hosting under DSA only if an information society service (normally for remuneration) | DSA art. 3; Dir. 2015/1535 art. 1(1)(b) |
| Instructor photos | Need the person's permission (art. 81) and the photographer's licence; public-figure exception narrow | PrAut art. 81, 29, 1; KC art. 23-24 |
| Certificates | Udemy and Three.js Journey both say their certificates may be shared; Udemy is "not an accredited institution" | provider pages |
| EU emblem | Usable by anyone unless it suggests a connection, sponsorship or approval | EU emblem rules 2021-2027 § II |
| Employee code | Employer owns economic rights (art. 12 ust. 1, 74 ust. 3); not for umowa zlecenia / praktyka absolwencka | PrAut; ustawa o praktykach absolwenckich art. 4 |
| Transfer form | Written form, fields named expressly; without an express transfer = licence | PrAut art. 41 ust. 2, 53, 65 |
| Religion | Art. 9(2)(e) test: intended, explicit, clear affirmative act of publication; employers may not ask for it or discriminate on it | C-252/21 para 77; C-446/21 paras 80-82; KP art. 22¹, 22¹ᵇ, 11³, 18³ᵃ |
| INF names/levels | INF.02 (PRK 4), INF.03 (5), INF.04 (5); technik informatyk 351203, technik programista 351406 (PRK V) | Dz.U. 2024 poz. 611 |
| Translations | Must be accurate; expected for each targeted language | WP260 para 13 |
| noindex | No indexing duty found; link on every page required | WP260 para 11 |
| Accessibility | Public-entity act n/a; EAA act exempts microenterprise services; a portfolio is not e-commerce | Dz.U. 2023 poz. 1440 art. 2; Dz.U. 2024 poz. 731 art. 4 pkt 1; EAA art. 3(23),(30), 4(5) |

### 9(b) Privacy Policy: outline (PL / EN), what feeds each section, what is Unknown

**Needed? Yes**, on every scenario (GDPR applies, § 1.1).

| # | PL heading | EN heading | Facts that feed it | Unknown / owner input |
|---|---|---|---|---|
| 0 | W skrócie | In short | 4-5 lines: who, what is collected, no cookies of his own, statistics + how to switch off, contact | final analytics choice (§ 2) |
| 1 | Administrator danych | Who is the controller | his full name; e-mail; scope (domain(s), en/pl/es) | **postal address**: not required by GDPR; required by UŚUDE art. 5 if he freelances; which address (home, CEIDG business address, correspondence address) is his decision |
| 2 | Kontakt w sprawach danych osobowych | How to contact me about your data | e-mail; reply time per art. 12(3) (one month, + two with notice) | whether he adds a postal route |
| 3 | Jakie dane przetwarzam, w jakim celu i na jakiej podstawie | What data I process, why, and on what legal basis | sub-sections 3.1 logs (Vercel, 6(1)(f), recital 49); 3.2 contact form (6(1)(f) / 6(1)(b), Resend); 3.3 statistics (Umami, 6(1)(f)); 3.4 anti-spam (Turnstile, 6(1)(f)); 3.5 booking (Cal.com, 6(1)(b)) only if used; 3.6 e-mail/direct correspondence; 3.7 claims and legal duties (6(1)(f), 6(1)(c)) | whether booking, newsletter or comments exist; his mailbox provider |
| 4 | Statystyki odwiedzin | Visit statistics | Umami data points (§ 1.3), no cookies, the in-memory token, localStorage opt-out key, DNT/GPC, retention per plan, region | **Umami plan and region** (EU selection exists: confirm in the dashboard) |
| 5 | Pliki cookie i pamięć przeglądarki | Cookies and browser storage | art. 399 PKE notice; table of every key (e.g. `umami.disabled`, Turnstile storage on the form page, theme/language preference if stored) with purpose and duration | the final list from the built code; Turnstile's exact keys |
| 6 | Ochrona przed spamem (Cloudflare Turnstile) | Spam protection (Cloudflare Turnstile) | signals, roles, link to the Turnstile Privacy Addendum (mandatory if invisible/offlabel) | widget mode |
| 7 | Odbiorcy danych (podmioty przetwarzające) | Who receives the data (processors) | table: Vercel, Resend, Cloudflare, Umami, (Cal.com), mailbox provider; location column | Vercel plan (Hobby has no DPA); mailbox provider |
| 8 | Przekazywanie danych poza EOG | Transfers outside the EEA | DPF (Decision 2023/1795) for Vercel, Cloudflare, Resend, Cal.com; SCCs (Decision 2021/914) for Umami and as fallback; how to get a copy | none, once vendors are fixed |
| 9 | Jak długo przechowuję dane | How long I keep data | Vercel logs per plan; Resend 30 days; Umami 6 months / 2 years; his mailbox: until the matter is closed + limitation period (criteria, art. 13(2)(a)) | his own mailbox period (owner decision) |
| 10 | Twoje prawa | Your rights | art. 15-21, 7(3), art. 12(3)-(6) timings | - |
| 11 | Prawo sprzeciwu | Right to object | art. 21(1) for 6(1)(f) incl. statistics, highlighted | - |
| 12 | Skarga do organu nadzorczego | Complaint to a supervisory authority | Prezes UODO, ul. Stawki 2, 00-193 Warszawa; art. 77 | - |
| 13 | Czy musisz podać dane | Do you have to provide data | voluntary; without an e-mail no reply; logs automatic | - |
| 14 | Zautomatyzowane decyzje | Automated decision-making | none (art. 22); Turnstile may block a submission → contact by e-mail | - |
| 15 | Linki do innych serwisów | Links to other services | GitHub/LinkedIn/Discord/Messenger are plain links; those platforms are separate controllers | which links exist |
| 16 | Zmiany polityki; wersje językowe | Changes; language versions | version + date; which language prevails (if any); translations checked for accuracy | primary language (owner, § 7) |

Not needed in the policy: a DPO section (none required, § 1.1), a profiling section beyond one line, a
section on his own /my-life data.

### 9(c) Regulamin: outline, **only if** the condition is met

**Condition:** he offers paid work through the site (freelance) **and** the site provides at least one
e-service (newsletter, comments, a booking or download tool he operates; the contact form alone is
disputed). If he is only job-seeking, no regulamin is required on the UŚUDE text (§ 3.2). If freelance
B2C contracts are concluded at a distance, the UPK information (art. 12) also has to be given, in the
regulamin or in a separate offer/terms document.

| § | PL heading | EN heading | Feeds from |
|---|---|---|---|
| 1 | Postanowienia ogólne; usługodawca | General; service provider | UŚUDE art. 5 ust. 2 (name, address, e-mail), NIP if any; reference to art. 8 UŚUDE |
| 2 | Definicje | Definitions | Serwis, Użytkownik, Konsument (art. 22¹ KC), przedsiębiorca na prawach konsumenta (art. 385⁵ KC) [baseline regulamin § 2] |
| 3 | Rodzaje i zakres usług | Types and scope of services | art. 8 ust. 3 pkt 1: list the actual e-services (content, newsletter, comments, booking) |
| 4 | Wymagania techniczne | Technical requirements | art. 8 ust. 3 pkt 2 lit. a; browser, JS, e-mail; storage per the policy |
| 5 | Zakaz treści bezprawnych | Prohibition of unlawful content | art. 8 ust. 3 pkt 2 lit. b; for comments also DSA art. 14 moderation rules |
| 6 | Zawarcie i rozwiązanie umowy | Conclusion and termination | art. 8 ust. 3 pkt 3 (e.g. starts on subscribing/commenting; ends on unsubscribing/deleting) |
| 7 | Reklamacje | Complaints | art. 8 ust. 3 pkt 4; response time (the baseline uses 14 days, = UPK art. 7a for consumers) |
| 8 | Zgłaszanie treści bezprawnych; punkt kontaktowy | Notices of illegal content; point of contact | DSA art. 12, 16, 17, **only if comments exist and the DSA applies** |
| 9 | Usługi płatne | Paid services | pointer to separate offer/contract; UPK art. 12 information if B2C at a distance; withdrawal right (UPK art. 27 ff.) [baseline compliance.md § 7] |
| 10 | Dane osobowe | Personal data | link to the privacy policy |
| 11 | Zmiany i postanowienia końcowe | Changes and final provisions | version/date; language rule (UJP art. 8 ust. 1a for consumers); savable/printable (art. 8 ust. 1 pkt 2) |

### 9(d) Owner actions

1. **Decide the role of the site**: job-seeking only, or also freelance. It decides UŚUDE (address,
   regulamin), UPK, UZNK, Vercel plan and the trademark analysis.
2. **Vercel plan**: on Hobby there is no DPA and commercial use is not allowed. Move to Pro before the
   site carries personal data under GDPR expectations (art. 28) or any freelance offer, or choose a host
   whose DPA covers its free tier. Set the serverless function region to an EU region (e.g. fra1).
3. **Umami**: create the account in the **EU data region** (the option now exists, security page
   29.07.2026), record the plan (retention 6 months / 2 years), keep the DPA (automatic) and its date;
   do not use `identify()`; decide the analytics position (§ 2: consent prompt / banner-less with
   opt-out / no client-side analytics).
4. **Resend**: download the signed DPA from the dashboard (Documents); note that data is stored in the
   US whatever sending region is chosen.
5. **Turnstile**: load it only on the contact form; if invisible/offlabel, link the Turnstile Privacy
   Addendum in the policy.
6. **Cal.com**: prefer a plain link to the booking page, or load the embed only after a click; if used,
   accept its DPA and consider asking for EU residency.
7. **Instructors**: no photos without written permission from each instructor **and** the
   photographer; otherwise text credit + certificate links.
8. **Certificates**: show own certificates (Udemy, Three.js Journey) with their share URLs; label Udemy
   as a course certificate, not an accredited qualification; check his OKE certificates and whether he
   holds the dyplom zawodowy for technik informatyk / technik programista.
9. **Erasmus+ / ESC**: text entries + Youthpass; no EU flag next to his name.
10. **PstrykWeb / CETUSPRO**: read the full umowa zlecenia for the words listed in § E.1; send the
    permission e-mail; label the case study with what was agreed.
11. **Neoteric Clockful**: find the internship document; ask Neoteric the five questions in § E.2
    before naming them or keeping the repo public.
12. **Software-house client projects**: written permission per project (synthesis next step 4).
13. **Address**: decide which postal address to publish if he freelances (UŚUDE art. 5); none is needed
    on GDPR grounds alone.
14. **Spanish legal pages**: have the AI translation checked by a fluent Spanish reader; decide the
    primary language and say it in each version.
15. **Mailbox**: name the provider that receives form e-mails and accept its DPA; add it to the
    processor table.
16. **Store badges (Linkoglot)**: official badge artwork only, unmodified, Apple first, equal sizes,
    Apple credit line in the legal notice.
17. **/my-life**: no third persons in faith-related photos without their consent.
18. Optional: a one-page internal record of processing (art. 30(5) "not occasional" question).

Not covered: a review by a Polish attorney (nothing here is legal advice or a compliance claim); the
Vercel Hobby terms of service and Umami's region-selection mechanics (not documented on the pages
read); Turnstile's exact cookie/localStorage keys and Cal.com embed cookies (not tested in a browser);
any UKE decision or guidance on cookieless analytics under PKE art. 399 (one search, nothing found);
the CJEU judgment text in Latombe (T-553/23) and the appeal C-703/25 P (status from secondary
summaries); Polish case law on art. 81 PrAut for commercial use of public figures' images; French and
Portuguese image-right law for the two instructors; Udemy's and the European Solidarity Corps' own
brand/logo guidelines (pages unavailable or not read); Youthpass and OKE certificate verification;
the school route to the dyplom zawodowy (Prawo oświatowe); whether e-mail-negotiated freelance work is
an "organised system" of distance contracting (UPK art. 2 pkt 1); Prawo przedsiębiorców (CEIDG,
działalność nierejestrowana limits) and tax; KC art. 66¹ e-commerce information duties; the text of
the owner's CETUSPRO contract and the Neoteric internship document (both decide § E.1-E.2); trade mark
registrations of Udemy, Three.js Journey, Neoteric or CETUSPRO (not searched).

## Appendix A. Polish statutes: verified text (Sejm ELI API, read 2026-10-05)

All texts pulled from the Sejm ELI API (the machine interface to the same Dziennik Ustaw that ISAP
shows), consolidated text (tekst jednolity, t.j.) in force on 2026-10-05. ISAP page for any act:
`https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU<year><pos padded to 7>` (e.g. WDU20240001221).

| Short | Act | Consolidated text | ELI URL |
|---|---|---|---|
| PKE | ustawa z 12.07.2024 - Prawo komunikacji elektronicznej | Dz.U. 2024 poz. 1221 (amended 2025-2026 by acts on other topics; none touches art. 399) | https://api.sejm.gov.pl/eli/acts/DU/2024/1221/text.html |
| PKE-wpr | Przepisy wprowadzające PKE | Dz.U. 2024 poz. 1222 | https://api.sejm.gov.pl/eli/acts/DU/2024/1222/text.html |
| UŚUDE | ustawa z 18.07.2002 o świadczeniu usług drogą elektroniczną | t.j. Dz.U. 2024 poz. 1513 (last amendment listed by ELI: PKE-wpr, in force 10.11.2024) | https://api.sejm.gov.pl/eli/acts/DU/2024/1513/text.html |
| PrAut | ustawa z 4.02.1994 o prawie autorskim i prawach pokrewnych | t.j. Dz.U. 2025 poz. 24 | https://api.sejm.gov.pl/eli/acts/DU/2025/24/text.pdf |
| KP | ustawa z 26.06.1974 - Kodeks pracy | t.j. Dz.U. 2026 poz. 1245 | https://api.sejm.gov.pl/eli/acts/DU/2026/1245/text.pdf |
| UPK | ustawa z 30.05.2014 o prawach konsumenta | t.j. Dz.U. 2026 poz. 1244 | https://api.sejm.gov.pl/eli/acts/DU/2026/1244/text.pdf |
| UJP | ustawa z 7.10.1999 o języku polskim | t.j. Dz.U. 2026 poz. 81 (later amended by Dz.U. 2026 poz. 676) | https://api.sejm.gov.pl/eli/acts/DU/2026/81/text.pdf |

**PKE art. 399** (verbatim, abridged only where marked [...]): "1. Przechowywanie informacji lub
uzyskiwanie dostępu do informacji już przechowywanej w telekomunikacyjnym urządzeniu końcowym abonenta
lub użytkownika końcowego jest dozwolone, pod warunkiem że: 1) abonent lub użytkownik końcowy zostanie
uprzednio poinformowany w sposób jednoznaczny, łatwy i zrozumiały, o: a) celu przechowywania i
uzyskiwania dostępu do tej informacji, b) możliwości określenia przez niego warunków przechowywania lub
uzyskiwania dostępu do tej informacji za pomocą ustawień oprogramowania [...] lub konfiguracji usługi;
2) abonent lub użytkownik końcowy, po otrzymaniu informacji, o których mowa w pkt 1, wyrazi na to zgodę;
3) przechowywana informacja lub uzyskiwanie do niej dostępu nie powoduje zmian konfiguracyjnych [...].
2. [...] może wyrazić zgodę [...] za pomocą ustawień oprogramowania [...]. 3. Warunków, o których mowa w
ust. 1, nie stosuje się, jeżeli przechowywanie lub uzyskanie dostępu do informacji [...] jest konieczne
do: 1) wykonania transmisji komunikatu elektronicznego za pośrednictwem publicznej sieci
telekomunikacyjnej lub 2) dostarczania usługi telekomunikacyjnej lub usługi świadczonej drogą
elektroniczną, żądanej przez abonenta lub użytkownika końcowego."

- The rule binds anyone who stores or reads information on the device: the text has no
  "usługodawca" or business condition.
- Sanctions: art. 444 ust. 1 pkt 82 (storing / accessing "niezgodnie z art. 399") and ust. 2 pkt 8;
  imposed by Prezes UKE. Art. 446 ust. 1: up to 3 % of the previous year's revenue; art. 446 ust. 3:
  where the entity had no revenue or ≤ 500 000 zł, a fine **up to 15 000 zł**.
- Art. 400: consent under art. 399 follows the data-protection rules (GDPR consent).
- What it replaced: PKE-wpr **art. 68 ust. 1** "Traci moc ustawa z dnia 16 lipca 2004 r. - Prawo
  telekomunikacyjne" (narrow exceptions in ust. 2-3, not art. 173). Art. 173 PT was the previous
  cookie rule. PKE entered into force 10.11.2024 (PKE art. 450 + PKE-wpr; promulgated 9.08.2024). The
  PKE footnote says it implements Directive 2002/58/EC (ePrivacy).

**UŚUDE** (t.j. Dz.U. 2024 poz. 1513):

- Art. 2 pkt 4: "świadczenie usługi drogą elektroniczną - wykonanie usługi świadczonej bez jednoczesnej
  obecności stron (na odległość), poprzez przekaz danych na indywidualne żądanie usługobiorcy [...]".
- **Art. 2 pkt 6: "usługodawca - osobę fizyczną, osobę prawną albo jednostkę organizacyjną
  nieposiadającą osobowości prawnej, która prowadząc, chociażby ubocznie, działalność zarobkową lub
  zawodową świadczy usługi drogą elektroniczną"**.
- Art. 2 pkt 7: "usługobiorca - [...] która korzysta z usługi świadczonej drogą elektroniczną".
- Art. 3 pkt 2: the act does not apply to "używania poczty elektronicznej lub innego równorzędnego
  środka komunikacji elektronicznej między osobami fizycznymi, w celach osobistych niezwiązanych z
  prowadzoną przez te osoby, chociażby ubocznie, działalnością zarobkową lub wykonywanym przez nie
  zawodem".
- **Art. 5 ust. 1-2**: "Usługodawca podaje, w sposób wyraźny, jednoznaczny i bezpośrednio dostępny [...]:
  1) adresy elektroniczne; 2) imię, nazwisko, miejsce zamieszkania i adres albo nazwę lub firmę oraz
  siedzibę i adres." Ust. 3: a przedsiębiorca also gives permit data if a permit is required; ust. 4:
  NIP in offers per art. 20 ust. 3 Prawo przedsiębiorców; ust. 5: regulated professions only.
- **Art. 8**: "1. Usługodawca: 1) określa regulamin świadczenia usług drogą elektroniczną [...]; 2)
  nieodpłatnie udostępnia usługobiorcy regulamin przed zawarciem umowy o świadczenie takich usług, a
  także - na jego żądanie - w taki sposób, który umożliwia pozyskanie, odtwarzanie i utrwalanie treści
  regulaminu [...]. 2. Usługobiorca nie jest związany tymi postanowieniami regulaminu, które nie zostały
  mu udostępnione w sposób, o którym mowa w ust. 1 pkt 2. 3. Regulamin określa w szczególności: 1)
  rodzaje i zakres usług świadczonych drogą elektroniczną; 2) warunki świadczenia usług drogą
  elektroniczną, w tym: a) wymagania techniczne niezbędne do współpracy z systemem teleinformatycznym,
  którym posługuje się usługodawca, b) zakaz dostarczania przez usługobiorcę treści o charakterze
  bezprawnym; 3) warunki zawierania i rozwiązywania umów o świadczenie usług drogą elektroniczną; 4) tryb
  postępowania reklamacyjnego. 4. Usługodawca świadczy usługi drogą elektroniczną zgodnie z regulaminem."
- Art. 4: where the act requires the recipient's consent, data-protection rules apply.
- The ELI amendment list shows no later change: no Polish DSA-implementing amendment of UŚUDE was in
  force on 2026-10-05.

**PrAut** (t.j. Dz.U. 2025 poz. 24):

- Art. 1 ust. 1-2: a work is "każdy przejaw działalności twórczej o indywidualnym charakterze"; works
  include photographic works (pkt 3) and computer programs (pkt 1).
- **Art. 12 ust. 1**: "Jeżeli ustawa lub umowa o pracę nie stanowią inaczej, pracodawca, którego
  pracownik stworzył utwór w wyniku wykonywania obowiązków ze stosunku pracy, nabywa z chwilą przyjęcia
  utworu autorskie prawa majątkowe w granicach wynikających z celu umowy o pracę i zgodnego zamiaru
  stron."
- **Art. 74 ust. 3**: "Prawa majątkowe do programu komputerowego stworzonego przez pracownika w wyniku
  wykonywania obowiązków ze stosunku pracy przysługują pracodawcy, o ile umowa nie stanowi inaczej."
  This confirms from the statute what `2026-10-05-project-showcase-patterns.md` § 6a cited from a
  secondary source. Art. 74 ust. 2: ideas and principles underlying a program are not protected.
- Art. 16: moral rights (authorship, being named) are unlimited in time and cannot be waived or sold.
- Art. 29 (quotation): "Wolno przytaczać w utworach stanowiących samoistną całość urywki
  rozpowszechnionych utworów oraz rozpowszechnione utwory plastyczne, utwory fotograficzne lub drobne
  utwory w całości, w zakresie uzasadnionym celami cytatu, takimi jak wyjaśnianie, polemika, analiza
  krytyczna lub naukowa, nauczanie lub prawami gatunku twórczości."
- **Art. 81**: "1. Rozpowszechnianie wizerunku wymaga zezwolenia osoby na nim przedstawionej. W braku
  wyraźnego zastrzeżenia zezwolenie nie jest wymagane, jeżeli osoba ta otrzymała umówioną zapłatę za
  pozowanie. 2. Zezwolenia nie wymaga rozpowszechnianie wizerunku: 1) osoby powszechnie znanej, jeżeli
  wizerunek wykonano w związku z pełnieniem przez nią funkcji publicznych, w szczególności politycznych,
  społecznych, zawodowych; 2) osoby stanowiącej jedynie szczegół całości takiej jak zgromadzenie,
  krajobraz, publiczna impreza."
- Art. 83: claims for unauthorised dissemination of an image follow art. 78 ust. 1 (moral-rights
  remedies: cessation, removal of effects, redress); barred 20 years after the person's death.

**KP** (t.j. Dz.U. 2026 poz. 1245):

- Art. 11³: "Jakakolwiek dyskryminacja w zatrudnieniu, bezpośrednia lub pośrednia, w szczególności ze
  względu na [...] religię, [...] wyznanie, [...] - jest niedopuszczalna."
- Art. 18³ᵃ § 1: equal treatment "w zakresie nawiązania i rozwiązania stosunku pracy [...] w
  szczególności bez względu na [...] religię, [...] wyznanie [...]", so it covers access to a job.
  (§ 2 gets a new wording from 5.11.2026, Dz.U. 2026 poz. 1046.)
- **Art. 22¹ § 1**: the employer asks a candidate for: "1) imię (imiona) i nazwisko; 2) datę urodzenia;
  3) dane kontaktowe wskazane przez taką osobę; 4) wykształcenie; 5) kwalifikacje zawodowe; 6) przebieg
  dotychczasowego zatrudnienia, z wyłączeniem informacji o wynagrodzeniu w obecnym stosunku pracy oraz w
  poprzednich stosunkach pracy." § 2: points 4-6 only when necessary for the job.
- Art. 22¹ᵃ § 1: the candidate's consent may be the basis for other data (not criminal-record data);
  § 2: refusing or withdrawing consent cannot lead to unfavourable treatment, in particular a refusal to
  hire; § 3: covers data given at the employer's request or "z inicjatywy osoby ubiegającej się o
  zatrudnienie".
- **Art. 22¹ᵇ § 1**: consent may be the basis for processing art. 9(1) GDPR data (religious beliefs are
  among them) "wyłącznie w przypadku, gdy przekazanie tych danych osobowych następuje z inicjatywy osoby
  ubiegającej się o zatrudnienie lub pracownika"; art. 22¹ᵃ § 2 applies accordingly.

**UPK** (t.j. Dz.U. 2026 poz. 1244): art. 2 pkt 1 defines a distance contract (an organised system,
means of distance communication only, up to conclusion). Art. 12 ust. 1 lists the information owed
before a distance contract, starting with: main characteristics; identity data "w szczególności o
firmie, organie, który zarejestrował działalność gospodarczą, a także numerze"; "adresie
przedsiębiorstwa, adresie poczty elektronicznej oraz numerze telefonu"; a complaints address; the total
price incl. taxes; and further points incl. the withdrawal right.

**UJP** (t.j. Dz.U. 2026 poz. 81):

- Art. 7 ust. 1: Polish is used in Poland "w obrocie z udziałem konsumentów oraz przy wykonywaniu
  przepisów z zakresu prawa pracy" if the consumer lives in Poland and the contract is performed in
  Poland. Art. 7 ust. 3: this covers documents and information required by other laws.
- Art. 7a ust. 1-2: covers in particular names of goods and services, offers, invoices, "ostrzeżeń i
  informacji dla konsumentów wymaganych na podstawie innych przepisów"; foreign-language offers and
  consumer information "muszą być jednocześnie sporządzone w polskiej wersji językowej".
- **Art. 8 ust. 1a**: such documents "mogą być jednocześnie sporządzone w wersji lub wersjach
  obcojęzycznych. Podstawą ich wykładni jest wersja w języku polskim, jeżeli osoba świadcząca pracę lub
  konsument są obywatelami Rzeczypospolitej Polskiej."
