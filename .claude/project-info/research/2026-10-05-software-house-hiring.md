# Software-House Hiring: What Polish Software Houses Want in 2026, and How a Solo Developer Should Position for It
Date: 2026-10-05 (all sources accessed 2026-10-05)

Tags: [web] = read on a live page or document today · [measured] = counted by me, method stated · [assumption] = my inference, not sourced. Survey lines give sample size, year and who ran or paid for the survey. Builds on `2026-10-05-hiring-perspective.md` (H-S# = its sources) and `2026-10-05-synthesis.md`; facts already there are not repeated.

## TL;DR

1. **The CEO memo's "kept" profile is now literal Polish job-ad text, and so is the instruction to *show* it.** Across 31 current full-stack and product-engineer offers read in full:
   - ownership / end-to-end: 21
   - stakeholder or client contact: 21
   - communication as a named skill: 16
   - risks / ask early: 7 ("bad news comes from you first", STX Next; "dopytać, zanim przepalisz dwa dni" (ask before you burn two days), Droplabs)
   - trade-offs: 5
   - Publink, Profitroom and Droplabs explicitly ask candidates to *show* a workflow, a feature they dropped, or a product owned "through to production outcomes"

   Case studies and an AI-workflow write-up are the direct answer [measured, §1].
2. **AI-assisted development is required in 16/31 offers, a plus in 2, restricted in 0.** The strong versions always pair it with accountability, e.g. "hands-on coding experience without AI" (Memcare), "explain code written with AI" (Droplabs), "read diffs, test generated code" (Iteamly). Present AI as *verified leverage*: the gates, one measured number, IP hygiene, and dated pre-AI work [measured §1, §4].
3. **Process ceremony barely appears** (Agile 3/31, Jira 0, Scrum 0) and **degrees never do (0/31)**. Code review (11), tests (16) and CI/CD (16) are the process signals worth proving. Don't argue about the degree; one credentials line [measured].
4. **"Product Engineer" is rare as a title** (about 20 titled offers on JJIT, mostly product companies and small AI-native houses; the big software houses say "Fullstack Developer" / "Software Engineer"). **Use "Full-stack product engineer" as the H1**, with "Full-Stack Developer (React, Node.js, TypeScript)" in the SEO title, the CV and LinkedIn [measured §2].
5. **Seniority:** senior ads ask for 5+ years (10 of 11), mid ads 2–3+, with inconsistent labels. Programmers in a PL survey average 6.8 years (Bulldogjob 2025). Don't self-title "Senior". Show scope (PstrykWeb: API → pipeline → AI → landing → admin, built alone) and apply to Mid and Senior roles [§5].
6. **The biggest objections and their counters:**
   - **"Always solo"** → Neoteric internship (inside a PL software house) + Cetuspro contract with its marketing team + a credits table on every project.
   - **"Others' codebases"** → this is the weakest point; get 1–2 merged OSS PRs and write up any maintenance or takeover work.
   - **"AI-dependent"** → Clockful's AI-only build *with* verification + pre-AI repos.
   - **"Will he leave for his startup?"** → honest status lines + a "looking for a long-term team" line [§3].
7. **Recruiter workflow:**
   - ATS on 7 of 11 reachable software-house career pages (15 checked, 4 URLs returned 404) (Workable ×2, Traffit, Breezy, Recruitee, Ashby, Teamtailor-like).
   - JJIT collects consent itself; NFJ runs an AI CV analysis widget.
   - Software houses often add a **client interview**.

   So: an ATS-safe EN CV plus a PL variant; photo optional on the PL CV only. The RODO clause isn't legally needed for standard data, but a one-line "future recruitments" consent on the PL CV is a cheap courtesy [§6].

## 1. What Polish software-house offers ask for (sample of current offers)

### Method [measured]
- **Sample: 31 live offers, read in full**: 26 from Just Join IT (JJIT) and 5 from No Fluff Jobs (NFJ). I rendered each offer with Playwright on 2026-10-05 and read the whole description. Raw text is in the session scratchpad (`sh-offers/`, `sh-nfj/`).
- **How offers were picked:** JJIT keyword searches `fullstack` (JavaScript category), `node.js react`, `product engineer` and `software house`, plus company-name searches for Netguru, STX Next, 10Clouds, Software Mansion, Callstack, Monterail, Boldare, Miquido, Spyrosoft and The Software House. NFJ: `fullstack` + React, and keyword `product engineer`.
- **Mix:** 17 software houses or consultancies, 4 outsourcing or body-leasing firms, 7 product companies or startups. The other 3 were an EOR/startup-hub, an agency, and one anonymous "Klient justjoin.it".
- **Not a random sample.** It is weighted towards JS full-stack and towards roles titled "product engineer", so read the shares as "in the relevant slice", not "in the whole market".
- **Exclusion:** one extra offer was read but not counted: Code & Pepper "AI Product Engineer (NY)". It is a Polish software house, but the job is Manhattan-based and needs US work authorisation.
- **Keyword counts** are a regex over each offer's own text (company boilerplate and "similar offers" removed). The AI stance and seniority columns were then checked by hand.
- **Company-name searches found no JS full-stack openings** today on JJIT for 10Clouds, Boldare, Monterail or Callstack. Netguru's JJIT listings were almost all titled "– Freelance": B2B, per-project, the client interviews the candidate, e.g. React Native "up to 31 EUR/h", "Project duration: 1 month" (O6).

### The 31 offers

| # | Company (type) | Title | Level | Contract | Mode | Pay shown | Yrs asked | AI-assisted dev stance | Signals worth copying (quote) |
|---|---|---|---|---|---|---|---|---|---|
| O1 | The Software House (SH) | Senior Fullstack Developer (Node.js & Blockchain) | Senior | B2B | Remote | 17–26k PLN/mo | 5+ | **Required**: "doświadczenie w pracy z narzędziami AI (Copilot, Cursor itp.)" (experience with AI tools) | "samodzielności, proaktywności oraz odpowiedzialności za projekt" (independence, proactivity, ownership of the project); "rekrutacja pod projekt" (hiring for one specific project) |
| O2 | Silk Software House (SH) | Senior Fullstack Developer | Senior | B2B | Office | 120–180 PLN/h | 5+ | Not mentioned | "2 years of experience in maintaining production applications"; "mentoring mid/junior" |
| O3 | BlockyDevs (SH, Web3) | Senior Fullstack Developer | Senior | B2B | Office | 120–180 PLN/h | 5+ | Not mentioned | Same text and address as O2 |
| O4 | Blazity (SH, Next.js) | Mid Full Stack Developer | Mid | B2B | Remote | 75–120 PLN/h | 2+ | **Required** ("AI Mindset" section) | "Ability to use AI tools while maintaining good engineering judgement"; "Direct contact with international clients" |
| O5 | Software Mansion (SH) | Staff Software Engineer | Senior | B2B / UoP | Hybrid | 27–35k B2B; 21.6–28k gross UoP | — | Not mentioned | "engineering mindset and versatility"; English "daily communication with clients" plus Polish |
| O6 | Netguru (SH) | React Native Developer – Freelance | Senior | B2B (freelance) | Remote | ≤31 EUR/h | — | Not mentioned | "meet with the client during online interviews" |
| O7 | STX Next (SH) | Forward Deployed Engineer | Senior | B2B | Remote + ~4 days/mo at client | not shown | — | **Required**: "Working command of AI... Not prompt literacy" | "technical option framed as a commercial decision. Cost, risk, payback"; "bad news comes from you first"; "standing to advise a client against work we could have sold" |
| O8 | Altimi (SH, DACH nearshore) | FullStack Developer (React + Node.js) | Mid | B2B | Remote | 100–140 PLN/h | 3+ | **Required** (Cursor, Copilot) | "Collaborate with product and business stakeholders"; "rapid prototyping" |
| O9 | Marska (SH) | FullStack Engineer React/Node.js | Mid | B2B / UoP | Hybrid | 109–153 PLN/h | — | Nice-to-have | "Agile ceremonies, code reviews" |
| O10 | Cloudfide (consultancy) | Fullstack Engineer (Node.js/React) [really agent building] | Mid | B2B | Remote | not shown | — | Role *builds* agents/MCP | "Translating business requirements into well-structured technical tasks" |
| O11 | Hiberus Poland (consultancy) | Fullstack Developer (Node.js+React) | Senior | B2B | Remote | not shown | — | Not mentioned | "UX/UI design with a good sense of aesthetics" |
| O12 | RemoDevs (software services) | Senior Fullstack Developer | Senior | B2B | Remote | 21.8–25.3k PLN/mo | 5+ | Company uses agents (context only) | "we do not only build what clients ask for... understand how their business works"; "reading and understanding existing codebases quickly"; Core Web Vitals, a11y; video-recorded pre-screen |
| O13 | On The Spot Dev (EOR for startups) | Senior Full Stack Developer (React + Node.js) | Senior | B2B | Hybrid 3/2 | not shown | 5+ | **Required**: "MCP servers, instructions with MD files" | "Work with the UX team" |
| O14 | SoftBlue / InTechHouse (SH) | **Regular** Fullstack Developer – React & Python | Mid | B2B / UoP | Remote | 75–135 PLN/h | **6+** | Not mentioned | Regulated industries |
| O15 | Upvanta (outsourcing) | Fullstack Developer (TS/React) | Mid | B2B | Hybrid | 130–140 PLN/h | **7+** | Not mentioned | "bardzo dobre umiejętności komunikacyjne" (very good communication skills); "przejmowanie ownershipu" (taking ownership) |
| O16 | 7N (consultancy) | Fullstack Developer (React & Node.js) | Mid | B2B | Hybrid | 23.5–26.9k PLN/mo | 3+ commercial | Nice-to-have ("dużym atutem", a big plus) | "od analizy wymagań po wdrożenie produkcyjne" (from requirements analysis to production rollout); Agile |
| O17 | Web Impact (agency/product) | Fullstack Engineer (AI, Distributed, Automation) | Mid | B2B | Remote | 14–20k PLN/mo | 2.5+ | **Required** | "Prioritizing execution over perfection - speed is key"; MVPs/POCs |
| O18 | zeroToOne (AI-native SH) | AI Product Engineer | Mid | B2B | Remote | 7–13k PLN/mo | 3+ | **Required** + verify | "prowadzisz agenta, czytasz i weryfikujesz" (you drive the agent, read and verify its output); "bez harmonogramów w Gantcie i sprintów w Jirze" (no Gantt schedules, no Jira sprints); client workshops/demos, "co warto odpuścić" (what is worth dropping) |
| O19 | Klient justjoin.it (anon.) | AI-Native Product Engineer | Mid | UoP | Hybrid (Poznań) | not shown | — | **Required** daily | The interview covers "wykorzystaniu AI w codziennej pracy" (your everyday use of AI) |
| O20 | Profitroom (hotel SaaS) | Product Engineer / Product Builder | Senior | B2B | Remote | 15–30k PLN/mo | — | **Required** (Claude Code "daily driver"; MCP, agents, skills) | Bonus: "built and shipped a side project for yourself or real users", "built an MCP server, agent or another tool that solved a real problem" |
| O21 | Shelf (AI SaaS) | Senior Full Stack Product Engineer | Senior | B2B | Office | 30.5–45.8k PLN/mo | — | **Required** (AI-native, "harness engineering through skills, CLIs") | "Titles matter less than the scope you can carry" |
| O22 | Publink (GovTech SaaS) | Senior Product Engineer (React+TS; .NET) | Senior | B2B | Remote/hybrid | 25–30k PLN/mo | 6+ commercial | **Required**: "Pokażesz workflow, w którym AI realnie zmienia Twoje tempo lub jakość" (you will show a workflow where AI really changes your pace or quality) | "realnym współwłaścicielem produktu, a nie wykonawcą backlogu" (a real co-owner of the product, not a backlog executor); "Pokażesz konkretny przykład, kiedy świadomie odpuścił_ś feature" (you will show a concrete example of consciously dropping a feature); ADRs, DORA |
| O23 | Droplabs (ticketing SaaS) | **Junior** Product Engineer | Junior | B2B / UoP | Office | 8–11k B2B; 7–9.5k gross UoP | none (must "mieć co pokazać", have something to show) | **Required** (Claude Code) + explain | "Umiesz powiedzieć 'nie rozumiem' i dopytać, zanim przepalisz dwa dni" (you can say "I don't understand" and ask before burning two days); "Wrzucasz na PR kod wygenerowany przez AI, którego nie umiesz wytłumaczyć" (you submit AI code you can't explain) listed as a reason the role is *not* for you |
| O24 | Memcare AS (NO SaaS, Warsaw team) | Senior Product Engineer | Senior | B2B | Remote | 28–37k PLN/mo | 5+ commercial | **Required** + "hands-on coding experience without AI" | "communicate technical and domain risks early"; "pragmatic approach to architecture and technical debt"; "We do not measure work by ticket count" |
| O25 | PhotoAiD (product) | AI-First Senior Fullstack Developer | Senior | B2B | Remote/hybrid | 23–30k PLN/mo | 5+ | **Required** ("power usera", power user) | Process: screening → paid task → CTO/founder |
| O26 | Juo (B2B SaaS startup) | Fullstack Engineer | Senior | B2B | Remote | 20–30k PLN/mo | 5+ | **Required** | "co-creator, not only an executor"; "looking for a longer commitment... not driven by opportunism" |
| O27 | Tooploox (SH) [NFJ] | Senior AI NodeJS Engineer | Senior | B2B | Remote | 18–28k PLN/mo | 1+ AI | Role builds agents | "Openness to client collaboration" |
| O28 | Tooploox (SH) [NFJ] | Forward Deployed Engineer – Agentic AI | Expert | B2B | Remote | 25.5–37k PLN/mo | 8+ | Role builds agents | Presales, "effort estimates", "cost modeling for AI workloads" |
| O29 | Link Group (body leasing) [NFJ] | Senior Fullstack Engineer – Node, React, TS | Senior | UoP | Remote | 25–37k gross UoP | 5+ | Not mentioned | "Algorithmic thinking, Data structures" as must-haves |
| O30 | Iteamly (outsourcing) [NFJ] | Senior AI Engineer – Node.js & React | Senior | B2B / UoP | Remote | 18–25.5k PLN/mo | — | **Required** + verify | "you read diffs, test generated code, and understand its edge cases before merging" |
| O31 | DNA Technology (SH) [NFJ] | Senior Product Engineer – Agentic AI (Python/React) | Senior | B2B | Remote, 12–20h + on-call | 150–180 PLN/h | 5+ commercial | AI product (no dev-tool line) | "not a role focused on implementing predefined tickets"; "balance it with speed and business impact" |

Sources O1–O31 are listed under Sources.

### Distribution [measured, n=31]

**Seniority**

| Junior | Mid | Senior | Expert |
|---|---|---|---|
| 1 | 10 | 19 | 1 |

**Contract**

| Contract | Offers | Detail |
|---|---|---|
| B2B available | 29 / 31 | — |
| UoP available | 7 / 31 | Two offers are UoP-only |

**Mode**

| Remote | Hybrid | Office |
|---|---|---|
| 21 | 6 | 4 |

Remote includes STX's "remote + client premises".

**Pay transparency**

| Salary shown | Hidden |
|---|---|
| 26 / 31 | 5 (Cloudfide, Hiberus, On The Spot, STX, Klient) |

**Pay bands among JS/TS full-stack offers** (B2B net; 1 PLN/h ≈ 168 PLN/mo, so 120 PLN/h ≈ 20k/mo [assumption: full-time]):

| Level | Range | Offers |
|---|---|---|
| Mid | 75–153 PLN/h, or 14–27k/mo | zeroToOne is an outlier at 7–13k |
| Senior | ~17–37k/mo; Shelf up to 45.8k | Typical senior software-house band: 120–180 PLN/h |
| Junior product engineer | 8–11k/mo | Droplabs |

**Years asked (21 offers state them):**
- **Senior: 10 of 11 offers say 5+, 1 says 6+.**
- Mid: 2–3+ years.
- But "Regular"/"Mid" labels reach 6+ (O14) and 7+ (O15). Titles and year counts are inconsistent across companies.
- At least 6 offers say "commercial" or "professional" years explicitly.

### Recurring keywords [measured, regex over n=31; see method]

| Signal | Offers | Notes |
|---|---|---|
| English mentioned/required | 26 | Mostly B2/B2+ for product/mid roles, C1 for consultancies (7N, Altimi, STX, Tooploox, Iteamly) |
| React | 26 | |
| TypeScript | 25 | |
| **Any AI-assisted-development mention** | **22** | See the AI breakdown below |
| Ownership / end-to-end | 21 | "end-to-end", "ownership", "odpowiedzialność" (responsibility), "from idea to production" |
| Stakeholder / client contact | 21 | |
| Node.js | 20 | |
| Communication named as a skill | 16 | |
| Tests | 16 | |
| CI/CD | 16 | |
| SQL/PostgreSQL | 14 | |
| AI tool named (Claude/Cursor/Copilot/Codex/ChatGPT) | 14 | Claude 11, Cursor 9, Copilot 6, MCP 4 |
| Independence / autonomy ("samodzielność") | 13 | |
| Performance / CWV / accessibility | 13 | |
| Polish required | ~12 | Polish-language ad or Polish level listed: an advantage for a Polish candidate |
| AWS | 12 | GCP/Azure: 12 |
| Code review | 11 | |
| Verify/understand AI output | 11 (regex) | **≥ 6 say it explicitly**: O4, O18, O22, O23, O24, O30 |
| Show-proof language | 10 | "pokażesz" (you will show), "co pokazać" (something to show), "side project", "shipped software used by real customers", "can show a product or feature you owned" |
| Docker/K8s | 10 | |
| UX/UI or design collaboration | 9 | |
| Next.js | 8 | NestJS: 8 |
| "Product mindset/sense/thinking" (literal) | 7 | All in product-engineer-titled or product-company offers |
| Risks / ask early | 7 | "communicate risks early", "bad news comes from you first", "dopytać zanim przepalisz dwa dni" (ask before you burn two days) |
| Trade-offs (literal) | 5 | |
| Mentoring | 5 | All senior |
| Agile / Scrum | **3** | |
| Jira | **0** | One offer brags about having *no* Jira sprints (O18) |
| **Degree / studies** | **0** | Not one offer asks for a degree |

### AI-assisted development: how offers treat it [measured, hand-classified, n=31]

| Stance | Count | Who |
|---|---|---|
| **Required / expected** (a must-have or "we expect" line) | **16** | O1 TSH, O4, O7 STX, O8, O13, O17, O18, O19, O20, O21, O22, O23, O24, O25, O26, O30 |
| Encouraged / nice-to-have | 2 | O9, O16 |
| Role *builds* AI agents (tool fluency implied) | 4 | O10, O27, O28, O31 |
| Mentioned only as company context | 1 | O12 |
| Not mentioned | 8 | O2, O3, O5 Software Mansion, O6 Netguru, O11, O14, O15, O29 |
| **Restricted / banned** | **0** | No offer limits AI tools. Client-IP limits may still exist inside contracts; see §4 |

How the "required" offers phrase it, from weakest to strongest:
1. "experience with AI tools (Copilot, Cursor)" (O1, O8)
2. "daily use" (O19, O25)
3. "MCP servers, instructions with MD files" (O13)
4. "Claude Code is our daily driver; MCP servers, custom agents, skills" (O20)
5. "harness engineering through skills, CLIs, logs, traces" (O21)
6. "Break down complex work into tasks that AI agents can execute... run multiple workstreams in parallel" (O30)

**Every strong version pairs AI with accountability:**
- "AI is not a way to delegate responsibility" (O24)
- "hands-on coding experience without AI" (O24)
- "potrafisz wyjaśnić kod, który powstał z ich pomocą" (you can explain code written with their help) (O23)
- "Umiesz odróżnić kod, który działa, od kodu, który tylko wygląda na działający" (you can tell code that works from code that only looks like it works) (O18)
- "Not prompt literacy" (O7)

### What this means for the candidate
- **The memo's "kept" profile is now literal job-ad text in PL**:
  - **business context:** "technical option framed as a commercial decision" (O7); "is this worth building?" (O20)
  - **trade-offs:** O18, O20, O21, O24
  - **early escalation:** "bad news comes from you first" (O7); "communicate risks before they become problems" (O24); "dopytać, zanim przepalisz dwa dni" (ask before you burn two days) (O23)
  - **cheap/reversible tech debt:** "pragmatic approach to architecture and technical debt" (O24); "Czasem najlepszym rozwiązaniem jest mniej kodu" (sometimes the best solution is less code) (O18)
  - **must vs nice-to-have:** "co warto odpuścić" (what is worth dropping) (O18); "świadomie odpuścił_ś feature" (consciously dropped a feature) (O22)
  - **outcomes:** "metryka sukcesu zdefiniowana przed startem prac" (success metric defined before work starts) (O22)
- **The offers that want this profile ask to *see* it:**
  - Publink: "Pokażesz workflow" (you will show a workflow) and "Pokażesz konkretny przykład" (you will show a concrete example)
  - Profitroom: "You can show a product or feature you owned from the initial problem through to production outcomes"
  - Droplabs: "Rozwijasz własne workflow oparte na AI i potrafisz opowiedzieć, co się w nich sprawdziło, a co nie" (you develop your own AI-based workflows and can say what worked and what didn't)

  These are near-exact specs for case-study pages and a public AI-workflow write-up.
- **Employers write "not a ticket/backlog executor" themselves** ("a nie wykonawcą backlogu", not a backlog executor: O22; "co-creator, not only an executor": O26; "not a role focused on implementing predefined tickets": O31). The candidate should answer with the *positive* evidence those lines imply, and never repeat the negative framing.
- **Ceremony keywords are rare** (Agile 3, Jira 0, Scrum 0). Solo developers need not over-invest in proving Scrum. **Code review (11) and tests/CI (16) matter more.** Those are the process signals to prove.
- **Solo-friendly language is everywhere:** "samodzielność" (independence), "end-to-end", "MVP/POC", "rapid prototyping", "from 0 to 1" (O31 bonus). So are signals that work against solo developers: "mentoring mid/junior" (5 senior ads), "2 years maintaining production applications" (O2/O3), "reading and understanding existing codebases quickly" (O12). §3 covers these.

## 2. "Product engineer" as a title in PL/EU, 2026

### Who uses it [measured]
- **On JJIT the title is rare.** I deep-scrolled the JJIT results for "product engineer" (relevance-sorted; the list virtualises, so I collected 50 offers). **20 had "Product Engineer"/"Product Builder" in the title, from about 11 employers:**

  | Employer | Offers | Type |
  |---|---|---|
  | HelloFresh | 7 | Uses "Backend/Mobile/Data/ML Product Engineer" as its standard ladder |
  | Publink | 2 | Product company |
  | Klient JJIT | 2 | Anonymous employer |
  | Memcare | 1 | Product company |
  | Profitroom | 1 | Product company |
  | Shelf | 1 | Product company |
  | Droplabs | 1 | Product company |
  | zeroToOne | 1 | AI-native software house |
  | Code & Pepper | 1 | Software house |
  | SimCorp | 1 | A financial-product meaning, not this one |
  | itmatch | 1 | — |

  For comparison, the keyword `fullstack` returns 723 offers and `react` 1,314, out of 19,547 total. JJIT keyword matching is fuzzy and also searches descriptions, so treat all of these as orders of magnitude.
- **The large PL software houses in the sample don't use the title.** TSH, STX Next, Netguru, Software Mansion, Tooploox and Spyrosoft advertise "Fullstack Developer", "Software Engineer", "Staff Software Engineer", "AI Engineer" or "Forward Deployed Engineer" (O1, O5, O6, O7, O27, O28). The only software houses using "Product Engineer" are small, AI-native ones: zeroToOne, DNA Technology, Code & Pepper (O18, O31).

### What it signals [web]
- **PostHog's Product Engineer Handbook** (undated living document) says:
  - "Unlike a traditionally defined full stack engineer, a product engineer's job goes beyond shipping code."
  - "Product engineers talk to users. They decide what to build. They own pricing, revenue, and user experience."
  - A product engineer is someone who "Builds products for real users · Writes full stack code · Cares deeply about solving the 'hair on fire' problems."
  - It quotes incident.io: "Care more about outcomes and impact than the exact implementation, or the tools used."
  - It quotes Lee Robinson (Cursor): "They don't need to understand every part deeply, a common misconception of 'fullstack'" (W1).
- **Gergely Orosz's "product-minded engineer"** has nine traits (2019, updated 2022). Among them: "Interest in the business, user behavior and data", "Offering product/engineering tradeoffs upfront", "Pragmatic handling of edge cases", "Quick product validation cycles", "End-to-end product feature ownership" (W2). These map almost one-to-one onto the CEO memo's "kept" list.
- **In PL ads the title comes with a recognisable bundle:**
  - end-to-end ownership
  - the PM owns "what/why" and the engineer owns "how": "The builder drives; the PM steers" (O20)
  - metrics and trade-offs
  - heavy Claude Code use

  The juniors' version (O23, Droplabs) spells it out: "prowadzić funkcję od początku do końca... i sprawdzenie, czy rzeczywiście zadziałała" (run a feature end to end... and check whether it actually worked).

### Which title to use where [assumption, reasoned from the counts above]
| Slot | Recommendation | Why |
|---|---|---|
| `<title>` / SEO | **"Mateusz Muszarski — Full-Stack Developer (React, Node.js, TypeScript)"**, optionally "· Product Engineer" at the end | Recruiters and ATSs search stack and role keywords ("fullstack" is ~36× more common than "product engineer" titles on JJIT). Name-first wins branded searches; the role phrase matches recruiter queries |
| H1 | **"Full-stack product engineer"** (the Shelf wording, O21) or "Full-stack developer" + a product-minded subline | Keeps the searchable "full-stack" token and adds the signal software-house product teams now write into ads. Bare "Product Engineer" alone is ambiguous in PL (HelloFresh, SimCorp and hardware use it differently) and less searchable |
| LinkedIn headline | "Full-Stack Developer · React / Next.js / Node / Expo · Product-minded, AI-assisted delivery" | LinkedIn search matches headline keywords [assumption]. The same words on the site and on LinkedIn reinforce one identity (H-S33) |
| CV title | "Full-Stack Developer (Product Engineer)" | ATS parsing and keyword match |
| Avoid as primary | "Software Engineer" (too generic for a portfolio H1), "AI Engineer" (in PL ads this means *building* LLM systems, O10/O27), "Senior" (see §5), "Creative Developer" (10 three.js offers, H-S45) | — |

## 3. Recruiter / tech-lead objections to a solo freelancer-founder, and the counter-evidence

Owner facts used (from the coordinator, 2026-10-05). The four flagships:

| Flagship | What it is | What it shows |
|---|---|---|
| **PstrykWeb** | Commercial work for the Rzeszów software house **Cetuspro** under a civil contract. He built the whole system alone: Deno API + Supabase + a Docker generation pipeline, an AI system calibrated to generate websites for local businesses, an Astro conversion landing page with form flow, Resend email, and an admin panel for the marketing team | Business and conversion thinking; working with a company's marketing team |
| **Linkoglot** | His own Expo RN app: Supabase, RevenueCat subscriptions + trial, Lingui with many locales. Live on the App Store and Google Play; **no users yet** | Shipping and monetisation setup, not traction |
| **3D space portfolio** | three.js / R3F / GSAP | Creative/WebGL craft |
| **Neoteric Clockful** | **Internship at Neoteric** (a PL software house), tight deadline, instructed to build **only with AI**. Next.js + shadcn + Supabase time-tracking dashboard with role permissions | Direct evidence of working inside a software house and of disciplined AI-only delivery |

Rows marked [assumption] are reasoning, not sourced. "Where" refers to the site map in §7.

| Objection (what the reviewer thinks) | How real it is in PL ads | Evidence that counters it | Where on the site |
|---|---|---|---|
| **"Always solo: can he work in a team, take code review, follow conventions?"** | Code review appears in 11/31 offers; "mentoring mid/junior" in 5 senior offers; "collaborate with design, product, stakeholders" is common [measured] | **Neoteric Clockful**: built inside a Polish software house under its deadline and rules. **PstrykWeb**: built for and with Cetuspro's marketing team. Erasmus+/ESC and hackathons (team, international, English). Show PR-based flow even on solo repos: PR descriptions, CI checks, conventional commits. Name a reviewer or lead if one exists, with LinkedIn | Per-project **credits table** ("Context: Internship at Neoteric · Team/lead: … · My part: …"); a "How I work" block with a screenshot of a real PR + CI run |
| **"Process: Scrum, Jira, estimates?"** | Weak: Agile 3/31, Jira 0/31, Scrum 0/31. One AI-native house boasts of *no* Jira sprints (O18) [measured] | Show **project hygiene, not ceremonies**: one real (anonymised) scope page with must/nice-to-have, an estimate vs actual, a risk list, one ADR. Clockful (a time-tracking product) and PstrykWeb milestones are natural carriers | "How I work" section + one artifact per flagship case study |
| **"Never worked in someone else's codebase"** | Explicit in O12: "reading and understanding existing codebases quickly"; O2/O3: "2 years maintaining production applications" [measured] | This is the weakest point. Use anything that fits: integrating with Cetuspro's existing infrastructure/processes; taking over freelance clients' existing sites; **1–2 merged PRs to others' OSS repos**, which are cheap to obtain before applying [assumption]; maintaining PstrykWeb after launch. AI-assisted codebase exploration is now an employer-cited onboarding advantage (Yahoo via CoderPad 2026: AI-proficient hires "navigate large codebases more quickly", W8) | Case-study section "Working in an existing system"; GitHub "Contributions" row |
| **"Client-facing communication?"** | 21/31 mention stakeholders or clients; STX wants someone who can "hold a room with a CTO and a CFO"; English 26/31 [measured] | PstrykWeb (product for local businesses, plus the marketing team as internal client). Website-builder startup for small businesses (he talked to SMB owners). Freelance clients. Short courses in marketing, psychology and UX (one line only). **Best proof: a short quote from Cetuspro or a client with name + LinkedIn**, plus one anonymised trade-off message ("Option A costs X, B costs Y, I recommend…") | Case study "What they asked for vs what they needed"; one testimonial line near the PstrykWeb card |
| **"Will he leave for his own startup?"** | Real: Juo wants "a longer commitment... not driven by opportunism" (O26) [measured] | Present the startups as finished learning that makes him cheaper to manage: "I've paid for my own servers and ads, so I think about cost per feature." State Linkoglot's status honestly ("live, in maintenance"). Add an explicit "What I'm looking for" line: a long-term product team, from [date] [assumption: owner confirms] | "Now / looking for" line in the hero/availability block; About |
| **"How senior is he really? No employer titles."** | Senior = 5+ years in 10/11 senior ads; mid = 2–3+; titles are inconsistent ("Regular" 6+, "Mid" 7+) [measured]. Shelf: "Titles matter less than the scope you can carry" (O21) | **Scope instead of titles**: PstrykWeb alone spans API, pipeline, AI, landing/conversion, email and admin. Show dates, the production status of each system and who used it. Don't claim "Senior" on the site; let the interview calibrate (see §5) | Hero proof line; flagship cards show "Scope: API · pipeline · AI · admin"; CV |
| **"No degree"** | **0/31 offers mention a degree** [measured] | Don't raise it. Put INF.02/INF.03/INF.04 (Polish technician-programmer qualifications; INF.04 = designing, programming and testing applications) and Three.js Journey on one compact credentials line (H-S37/S38) | CV + one-line "Credentials" row; never a section |
| **"AI-dependent: can he code without it, and does he understand what ships?"** | Memcare requires "hands-on coding experience without AI" (O24). Droplabs disqualifies people who submit "kod wygenerowany przez AI, którego nie umiesz wytłumaczyć" (AI-generated code you can't explain) (O23) [measured] | (1) **Dated pre-agent work**: GitHub history from before roughly 2023 (26 public repos), shader/three.js maths, and the INF.04 exam, which is hand-coded under exam conditions. (2) **Clockful at Neoteric**: AI-only *by instruction*, plus what he verified and where the AI was wrong. (3) A public repo of the Claude Code setup (skills, hooks, MCP, verification gates) with a README explaining *why each gate exists*. (4) One "hard part" code excerpt per case study that he explains line by line | "AI workflow" page; Clockful case study; "hard part" block in each case study |
| **"Client IP / NDA: will he paste our client's code into random AI tools?"** [assumption: no offer says so, but see §4] | 10Clouds advertises "approved repositories under strict access controls" and "zero-retention options" (W9); SO 2025: 13.8% cite strict IT/InfoSec rules as a barrier (W3) | A visible line on the AI page: "I follow the client's AI policy: approved tools only, no secrets in context, .env blocked by a hook." Show the actual hook | AI workflow page |
| **"Freelancer = B2B rate expectations / flight risk"** [assumption] | B2B is offered in 29/31, so no conflict | State "Open to B2B or UoP" (H-S18) | Availability line |

## 4. Attitudes to AI-heavy developers in hiring, 2026

### Surveys (with sample, year, sponsor)
| Finding | Source | Tag |
|---|---|---|
| 85% of pro devs use or plan to use AI tools; **50.6% use them daily**; trust: 46% distrust accuracy vs 33% trust; top frustration "AI solutions that are almost right, but not quite" (66%); daily agent use only 14.9%; 13.8% cite strict IT/InfoSec rules (barrier question; base not verified) | Stack Overflow Developer Survey 2025, 49k+ respondents (26,004 pro devs on this section), Stack Overflow (W3). **No 2026 edition found**: survey.stackoverflow.co/2026 returned 404 today (W4) | [web] |
| 85% regularly use AI for coding; 62% rely on at least one AI coding assistant/agent/editor; **68% expect employers to require AI-tool proficiency**; top concerns: inconsistent quality, limited understanding of complex logic, privacy/security, harm to own skills, lack of context; ~90% save ≥1 h/week, 20% ≥8 h | JetBrains State of Developer Ecosystem 2025, n=24,534, 194 countries, Apr–Jun 2025, JetBrains (W5). The interactive page didn't render numbers for me; figures are from JetBrains' own blog summary | [web] |
| Interviews: **34% ban AI, 46% allow it, 20% case by case**. "From writing code to... debugging AI, explaining architectural decisions, and iterating and improving on AI output." Four dimensions: Prompting Skill · Workflow Integration · **Judgment & Verification** ("Can they evaluate, edit, and fact-check AI output?") · Creativity & Adaptability | CoderPad State of Tech Hiring 2026, ~650 participants, Feb 2026, vendor (W8) | [web] |
| **62% of organisations prohibit AI in technical interviews** (US 38% allow, China 68%) | Karat Engineering Interview Trends 2026, n=400 engineering leaders, US/India/China, 2026-01-07, vendor (W7) | [web] |
| Canva replaced its CS-fundamentals screen with an "AI-Assisted Coding" interview and *expects* Copilot/Cursor/Claude. It evaluates: "Can they identify and fix issues in AI-generated code?", "Can they ensure AI-generated solutions meet production standards?" "The most successful candidates didn't just prompt AI and accept whatever it generated" | Canva Engineering blog, 2025-06-11 (W6) | [web] |
| PL demand: in Hays' contracting report, firms name AI/ML as the most sought competency (75%) | Hays Poland IT Contracting Salary Report 2026, via wnp.pl, 2026-01-17. Methodology as summarised: based on 2025 projects / >15,000 contractors; primary not read (W10) | [web] |
| PL job ads: AI-assisted development **required in 16/31, nice-to-have 2/31, restricted 0/31**; ≥6 explicitly demand you verify/explain AI output | This file §1 | [measured] |

### Software-house policies (client IP, approved tools)
- **No offer in the sample restricts AI**, and 16 require it. Restrictions live in client contracts, not ads [assumption].
- **10Clouds**, the only PL software house I found with a public statement, says:
  - "Your code is never used for training. Zero-retention options available"
  - "Claude works only with approved repositories under strict access controls"
  - all Claude-generated changes get human review before merging (W9)
- I found no published AI policy from Netguru, STX Next or TSH; the search returned none.
- **Reading this** [assumption]: software houses sell AI-accelerated delivery to clients (10Clouds' Claude page; STX's "AI pod" and "AI SDLC", O7). The risk they manage is data leakage plus unreviewed code. A candidate who shows an IP-safe setup (approved tools, secret blocking, review gates) addresses the exact worry.

### What interviewers now test (PL evidence from the ads)
- **Talk about your AI workflow:** "Porozmawiacie o... wykorzystaniu AI w codziennej pracy" (you'll talk about your everyday use of AI) (O19). "Pokażesz workflow, w którym AI realnie zmienia Twoje tempo lub jakość" (you'll show a workflow where AI really changes your pace or quality) (O22).
- **Explain the code:** "potrafisz wyjaśnić kod, który powstał z ich pomocą" (you can explain code written with their help) (O23).
- **Agent orchestration:** "Break down complex work into tasks that AI agents can execute... run multiple workstreams in parallel" (O30).
- **Paid tasks and recorded screens:** PhotoAiD runs a paid task (O25); RemoDevs records a video pre-screen (O12).
- **Classic fundamentals persist in body leasing:** "Algorithmic thinking, Data structures" are must-haves (O29).

### How to present AI so it reads as leverage plus judgment (recommendations)
1. **Use the employers' own verbs:**
   - "delegate", "control the scope of generated changes", "verify", "explain every line" (O23, O24)
   - "harness engineering: skills, CLIs, logs" (O21)
   - "MCP servers, custom agents, skills" (O20)

   Not "AI-powered developer", "10×", or "prompt engineer". Even the companies most bullish on AI pair it with responsibility: "AI is not a way to delegate responsibility" (O24).
2. **Show the gate, not the tool list.** One diagram: spec → agent → typecheck/lint/tests/e2e → self-review → human-readable PR → deploy. Name the *failure each gate caught* (one real example each).
3. **Artifacts that impress, in order:**

   | # | Artifact | Why |
   |---|---|---|
   | a | **Public repo of his Claude Code setup** (skills, hooks, MCP config, verification gates) with a README of the *why* | Maps 1:1 to O13/O20/O21; cheap to verify |
   | b | **Clockful write-up**: "AI-only build at Neoteric under deadline: what I delegated, what I checked, where the AI was wrong, what I'd change" | Answers O22/O23 directly; the software-house context matters |
   | c | **One before/after number** he actually measured: cycle time per feature, defects caught by gates, or cost per feature in tokens/$ | Tooploox FDE asks for "cost modeling for AI workloads" (O28); the memo stresses cost-to-build [assumption: measure first, never estimate retroactively] |
   | d | **lingui-translate-ai**: a published npm tool that puts AI into a real dev workflow (i18n) | Fits "built... a tool that solved a real problem" (O20 bonus) |
   | e | **Pre-AI proof**: dated older repos and three.js work | Answers "hands-on coding experience without AI" (O24) |
4. **One sentence on IP hygiene**, shown by an actual hook ("blocks reading .env / secrets") rather than claimed.
5. **Put a limit on AI in his own words**, e.g. where he doesn't use it or always rewrites. It signals judgment; CoderPad lists "Judgment & Verification" as its own dimension (W8).

## 5. Seniority framing for "6 years, self-taught, solo"

### What PL ads mean by levels [measured, §1]

| Level | What the ads ask for |
|---|---|
| Mid / Regular | 2–3+ years; sometimes 6–7+ (O14, O15) |
| Senior | 5+ years (10 of 11 senior ads that state years) |

Senior ads add:
- mentoring (5 ads)
- "2 years maintaining production applications" (O2/O3)
- architecture decisions
- end-to-end ownership

Several ads say "commercial" years (O16, O14, O22, O24, O31).

### Context [web]
Bulldogjob 2025 (n=4,331, Jan 15–Feb 16 2025, self-selected via a PL job board):
- programmers average **6.8 years** of experience
- level split: Junior 12.2%, Mid/Regular 43.5%, Senior 29.4%
- a staffing head's comment: seniors are "increasingly required to have... advanced knowledge of system architecture, process optimization, or mentoring skills" (W11, opinion)

### Recommendation [assumption]
- **State years honestly and split them:** "Building software since 2020 · ~N years of paid client/contract work · N products shipped to production". The owner fills in N. Freelance and the Cetuspro civil contract count as commercial; own startups count where they shipped to market.
- **Don't self-title "Senior"** on the H1. Let scope carry it: "built PstrykWeb end-to-end alone: API, generation pipeline, AI, landing, admin". **Apply to Mid and Senior roles.** The likely band is "Regular+ with senior-level ownership" in software houses, which weight team and production-maintenance years; product companies weight scope (O21: "Titles matter less than the scope you can carry").
- **Numbers that are honest and strong:**
  - shipped systems in production, with dates
  - clients served
  - stores published (App Store + Google Play)
  - locales supported
  - npm downloads (check before quoting)
  - Lighthouse/CWV of his own site
- **Numbers to avoid:**
  - Linkoglot users or revenue (there are none yet; say "pre-traction; subscriptions + trial wired via RevenueCat")
  - invented percentages

## 6. Recruiter workflow facts (PL)

| Topic | Fact | Tag / source |
|---|---|---|
| **ATS use** | Visible on 7 of 11 reachable PL software-house career pages (15 checked; STX Next, Neoteric, Cetuspro and Blazity career URLs returned 404; Ideamotive redirects to a talent-network form): **Netguru → Workable**, **10Clouds → Workable**, **The Software House → Traffit** (a Polish ATS), **Boldare → Breezy HR**, **Callstack → Recruitee**, **Tooploox → Ashby**, **Spyrosoft → `careers.spyro-soft.com/jobs/<id>-<slug>`** (URL pattern consistent with Teamtailor; vendor not confirmed). Not detected: Software Mansion, Monterail, Miquido | [measured] W17 |
| **Implication** | The CV PDF must parse: single column, real text (not an image), standard headings, stack keywords spelled like the ads ("Node.js", "TypeScript", "React", "Next.js") | [assumption] + H-S1 |
| **Job boards** | The JJIT apply flow shows its own consent line: "By applying, I consent to the processing of my personal data for the purpose of conducting the recruitment process" (O1 page). NFJ offer pages now show an **"Analiza CV BETA"** (AI CV analysis) widget (O29, O30). Expect machine pre-reads of the CV | [measured] W19, W20 |
| **Stages seen in the sample** | Intro call (15–30 min) → technical interview or task (some paid: O25) → CTO/founder or "culture/fit". Software houses add a **client interview** (O6 Netguru: "meet with the client during online interviews"; O1 "rekrutacja pod projekt", hiring for one project). One process records video answers (O12). Juo: "email is the way to go" (O26) | [measured] |
| **Third audience** | Because the end client often interviews the candidate in software-house hiring, the case studies must also make sense to a foreign, non-technical client: outcomes first, English | [assumption] |
| **LinkedIn vs CV vs portfolio** | No PL-specific data found on which recruiters open first. International evidence is in `hiring-perspective.md` §1 (seconds-long skims; the portfolio as confirmation). Practical rule: the LinkedIn headline mirrors the H1, the CV links to `/work/<slug>`, and the site links back to both | [assumption] |
| **CV language** | English is mentioned in 26/31 offers; **9/31 ads are written in Polish**: 8 fully (O1, O15, O16, O18, O19, O22, O23, O25) plus O11, which is bilingual PL/EN; about 12 list Polish as a requirement | [measured] |
| | **Default: an English CV + a Polish variant** for Polish-language ads and Polish-only teams | [assumption] |
| **Photo on CV** | Not legally required. Per UODO-domain material, the Labour Code doesn't let an employer demand a photo; a photo given voluntarily is processed on the basis of consent | [web, W13 via search snippet; primary PDF not retrievable] |
| | 2026 career-advice blogs: still accepted in PL domestic hiring, better omitted for international applications; link LinkedIn/GitHub instead | [web, opinion] W16 |
| | **Recommendation:** PL CV, an optional professional photo matching LinkedIn and the site (identity consistency, H-S33); EN CV, no photo | [assumption] |
| **RODO clause** ("Wyrażam zgodę…", I consent…) | **Legally not needed for the standard data.** Under art. 22¹ §1 Kodeks pracy the employer may process name, date of birth, contact details, education, qualifications and work history without consent (UODO 2018 recruitment slides list this catalogue, W12) | [web] |
| | UODO-domain material says including a consent clause in the CV for that data is "not proper"; consent matters only for **extra data** (photo, interests, social links) and **future recruitments** | [web, W13 snippet] |
| | A 2026 vendor guide agrees (W14). A government help-line page from 2024 still tells candidates consent is required (W15): the confusion persists, so many recruiters still expect the line | [web] |
| | B2B recruitment isn't under the Labour Code; there the basis would be steps before a contract (art. 6(1)(b) RODO) | [assumption, not legal advice] |
| | **Recommendation:** on the PL CV, one short footer line covering future recruitments (and the photo, if used). On the EN CV for international roles, omit it or use a one-line English equivalent. The site itself needs no clause | [assumption] |

## 7. Message hierarchy for the site

Built from §1–§6 and the four owner-confirmed flagships. Everything here is [assumption] (design recommendations). The wording is a draft for the owner to edit in his own voice; per `hiring-perspective.md` §5, the voice must not read as LLM-written.

### 7.1 One-line positioning (pick one; all keep "full-stack" for search)

| Option | H1 | Subline (≤ 25 words) | Best for |
|---|---|---|---|
| **A. Product-led (recommended default)** | **Full-stack product engineer** | "I turn a business problem into a shipped web or mobile product, and I tell you early what it will cost and what can wait." | Software houses with product teams, and product companies (O7, O18, O20–O24). It voices the memo's ROI and bad-news-early points without saying "ticket" |
| **B. Stack-led (safest for recruiter skim)** | **Full-stack developer · React, Next.js, Node, Expo** | "Six years shipping complete products: web platforms, mobile apps on both stores, AI pipelines. Fast with AI agents, checked by tests before anything ships." | Body-leasing and outsourcing, and the classic software-house ads (O1–O3, O8, O14–O16, O29) where keyword match decides |
| **C. AI-leverage-led** | **Full-stack engineer who ships with AI and owns what ships** | "Claude Code skills, hooks and verification gates. I delivered an AI-only build on a deadline during my internship at Neoteric." | AI-native shops (O13, O17–O21, O25, O30). Risky as the only message, because 8/31 ads don't mention AI at all |

The proof line under any of them, visible without scrolling: **"Built PstrykWeb for Cetuspro end to end: AI-generated websites for local businesses, from the API and generation pipeline to the marketing team's admin panel."**

### 7.2 The four proof pillars, mapped to the memo's "kept" profile

| Pillar (site wording) | Memo points it proves | Primary evidence | Secondary evidence |
|---|---|---|---|
| **1. I build for the business result** | Business context; knowing the client's business; ROI per feature; shift to outcome-based work | **PstrykWeb**: conversion landing + form flow for local businesses, admin for the marketing team, AI output calibrated to "quality websites" | Website-builder startup for SMBs; Linkoglot's monetisation design (RevenueCat trial → subscription); marketing/psychology/UX short courses (one line) |
| **2. I build the whole thing** | UX + architecture + code in one person; ready components plus AI to cut cost | PstrykWeb architecture (Deno API, Supabase, Docker pipeline, Resend, admin); **Linkoglot** live on App Store + Google Play (Expo RN, Supabase, RevenueCat, Lingui locales) | Clockful (Next.js + shadcn ready components + RBAC); 3D space portfolio (craft, performance budget) |
| **3. I use AI as leverage, and I verify it** | "Ready components + AI"; cost-to-build; deliberate, cheap, reversible shortcuts | **Clockful at Neoteric**: AI-only by instruction, on a deadline, inside a software house; public Claude Code setup (skills, hooks, MCP, gates) | lingui-translate-ai (npm); one measured before/after number; dated pre-AI repos and three.js work |
| **4. I make the work visible and predictable** | Clarify the real need; explain trade-offs; deliver bad news early; requirements, estimates, risks, must vs nice-to-have; escalate early ("get stuck loudly and early"); diligent time reporting | Per-case-study **Decisions** block with rejected options and what was cut from v1; one anonymised scope page (must/nice, estimate vs actual, risks) | A sample status/trade-off message; Cetuspro or client testimonial with a name; Clockful as a time-tracking product (only as a theme, not as proof that he reports time) |

**Translate memo language into evidence; never into claims:**

The "Do write" column holds **templates with placeholders**, not facts about the projects. Fill them only with true details.

| Memo idea | Don't write | Do write (only if true) |
|---|---|---|
| Cheap, reversible tech debt | "I make smart trade-offs" | "Shortcut on purpose: [simple option] instead of [heavier option]. It took [time]; replacing it later costs ~[time]. Revisit when [trigger]." |
| Must vs nice-to-have | "I prioritise well" | "Cut from v1: [X], [Y]. Shipped in [N] weeks instead of [M]." |
| Bad news early / get stuck loudly | "Great communicator" | "[When]: told [who] that [problem], with two options and their costs. We picked [B] because [reason]." |
| Know the client's business | "Business-minded" | "[Customer type] needed [real need], so [design decision]." |
| Time reporting | "Reliable" | "Estimate vs actual per milestone" table in a case study |
| Outcome-based | "Results-driven" | One outcome number per flagship, with how it was measured, or "not measured yet" |

### 7.3 Section by section: what each must prove, the evidence type, and microcopy don'ts

| Section | Must prove (in this reader's seconds) | Evidence type that proves it | Microcopy don'ts |
|---|---|---|---|
| **Hero** (no interaction needed) | Who, which role, one proof, that he's available, and a 1-click contact | Name + H1 (option A/B/C) + the PstrykWeb proof line + availability line ("Open to: full-stack / product engineer · B2B or UoP · remote PL/EU or hybrid [city] · from [date] · CET") + Contact / CV / LinkedIn / GitHub | No "passionate", "crafting digital experiences", "10×", "AI-powered developer", typewriter effects; no "Senior" self-title |
| **Proof strip** (one row) | That claims are checkable | 4–5 factual chips: "PstrykWeb · client work for Cetuspro" · "Linkoglot · live on App Store & Google Play" · "Neoteric · internship, AI-only build" · "npm: lingui-translate-ai" · "6 years shipping since 2020" | No logo wall of technologies; no vanity counts ("1000+ commits"); no user numbers that don't exist |
| **Flagship cards** (4) | Scope, his role, context (who it was for), status | Each card: outcome line · context tag (`Client work · Cetuspro`, `Own product`, `Internship · Neoteric`, `Personal/creative`) · "Built alone" or the credits · ≤5 stack chips · status ("Live", "Live, pre-traction", "Internship deliverable") · Live / Case study / Code (or "Code private") | No "revolutionary"; no "AI does everything"; don't hide that Linkoglot has no users ("pre-traction" is honest and fine) |
| **Case study page** (`/work/<slug>`) | That he thinks in problem → cost → trade-off → result → what he'd change | TL;DR · "What they asked vs what they needed" · constraints (deadline, budget, team) · **2–3 decisions with rejected options and cost** · "Cut from v1" · architecture SVG · the hard part (≤15 lines he explains) · "Where AI helped / where it was wrong" · results + how measured · what I'd do differently · credits table · NDA status | No wall of adjectives; no "seamless/robust/scalable" without a number; no unverifiable metrics; no repeating the stack list as prose |
| **How I work** (short) | Project hygiene + communication + early escalation, *shown* | 5 steps with one artifact each: clarify the need (question list) → scope (must/nice) → estimate (range + risks) → build with gates → report (status sample, estimate vs actual). One screenshot of a real PR with CI | Never "I'm not a ticket executor", "klepacz" (code-pusher), "code monkey", "not just a coder", "more than a developer". No Scrum-certification theatre (Agile appears in 3/31 ads, Jira in 0) |
| **AI workflow** (page or long section) | Leverage + judgment + IP hygiene; that he can code without it | Gate diagram; repo link to the skills/hooks/MCP setup; the Clockful AI-only story; one measured before/after; "Where I don't use AI"; IP line + the actual secret-blocking hook; link to pre-AI work | No tool-logo wall; no "AI wrote 90% of my code" bragging; no "prompt engineer"; don't write defensive lines like "I'm not dependent on AI". Show, don't rebut |
| **About / Path** | A coherent career, not a gap; the founder experience reads as an asset; commitment | 6-year timeline: freelance → own startups (with an honest status) → Cetuspro contract → Neoteric internship → now. One line on Erasmus+/ESC (international teamwork, English). "What I'm looking for next" | Don't apologise for no degree or self-teaching; no life story; no "I'll be your next unicorn hire" |
| **Credentials row** (one line) | Basic legitimacy for filters | INF.02 / INF.03 / INF.04 · Three.js Journey · Jonas Schmedtmann courses · hackathons (named, with placings if any) | Not a section; no certificate images; no course-hours lists |
| **Contact / availability** | Zero-friction next step | Plain-text email + copy · CV (EN / PL) · LinkedIn · GitHub · contract (B2B/UoP) · start date · time zone | No form-only contact; no "Let's build something amazing together!" |
| **CV PDF** (EN + PL) | ATS-parseable mirror of the site | Single column, real text, the same H1 wording, stack keywords spelled like the ads, links to `/work/<slug>`; PL version with the RODO footer line (§6) | No photo on the EN version; no skill bars; no claims missing from the site |

### 7.4 Global microcopy rules
1. **Positive evidence only.** The ads already say "not a backlog executor" (O22, O26, O31). The candidate answers with examples of owning outcomes, never with the negation. Banned: "ticket executor", "klepacz", "code monkey", "not just code", "more than a coder", "I don't just…".
2. **One number beats three adjectives.** If there's no number, give the date, the scope or the status.
3. **Name the context every time:** client work / internship / own product / personal. The memo's reader is a software house and needs to see that he has worked *for* someone.
4. **Honesty markers are features:** "pre-traction", "not measured yet", "what I'd do differently". They are expensive to fake and they build trust (hiring-perspective §5).
5. **Same words on the site, LinkedIn and CV** for the role (H1), the years and the flagship names.
6. **English first; PL CV and PL microcopy where a PL software house reads it.** 9/31 ads are in Polish; Polish fluency is an asset to state ("Polish native · English [level]").

## Sources
All accessed 2026-10-05. H-S# = sources in `2026-10-05-hiring-perspective.md`.

**Job offers (live on 2026-10-05; [measured] read in full via Playwright)**

| # | URL |
|---|---|
| O1 | https://justjoin.it/job-offer/the-software-house-senior-fullstack-developer-node-js-blockchain--gliwice-javascript |
| O2 | https://justjoin.it/job-offer/silk-software-house-senior-fullstack-developer-warszawa-javascript |
| O3 | https://justjoin.it/job-offer/blockydevs-sp-z-o-o--senior-fullstack-developer-warszawa-javascript-18d65e63 |
| O4 | https://justjoin.it/job-offer/blazity-sp-z-o-o--mid-full-stack-developer-react-next-js-typescript-warszawa-javascript |
| O5 | https://justjoin.it/job-offer/software-mansion-staff-software-engineer-krakow-javascript |
| O6 | https://justjoin.it/job-offer/netguru-react-native-developer---freelance-poznan-javascript |
| O7 | https://justjoin.it/job-offer/stx-next-forward-deployed-engineer-poznan-architecture |
| O8 | https://justjoin.it/job-offer/altimi-fullstack-developer-react-node-js--wroclaw-javascript-f0180afb |
| O9 | https://justjoin.it/job-offer/marska-fullstack-engineer-react-node-js-krakow-javascript-8af6f69f |
| O10 | https://justjoin.it/job-offer/cloudfide-spolka-z-ograniczona-odpowiedzialnoscia-fullstack-engineer-node-js-react--warszawa-javascript |
| O11 | https://justjoin.it/job-offer/hiberus-poland-fullstack-developer-node-js-react--wroclaw-javascript |
| O12 | https://justjoin.it/job-offer/remodevs-senior-fullstack-developer-wroclaw-javascript-545c9f2d |
| O13 | https://justjoin.it/job-offer/on-the-spot-development-senior-full-stack-developer-react-node-js--warszawa-javascript |
| O14 | https://justjoin.it/job-offer/softblue-intechhouse--regular-fullstack-developer---react-python-k-m--bydgoszcz-javascript |
| O15 | https://justjoin.it/job-offer/upvanta-sp-z-o-o--fullstack-developer-typescript-react--warszawa-javascript |
| O16 | https://justjoin.it/job-offer/7n-sp-z-o-o--fullstack-developer-react-node-js--warszawa-javascript-9e16f209 |
| O17 | https://justjoin.it/job-offer/web-impact-fullstack-engineer-ai-distributed-systems-automation--krakow-javascript-d82ebc6e |
| O18 | https://justjoin.it/job-offer/zerotoone-ai-product-engineer-warszawa-ai |
| O19 | https://justjoin.it/job-offer/klient-justjoin-it-ai-native-product-engineer-poznan-ai |
| O20 | https://justjoin.it/job-offer/profitroom-product-engineer-product-builder---backend-or-full-stack-poznan-php (also on NFJ: /pl/job/product-engineer-product-builder-backend-or-full-stack-profitroom-remote-1, shown as 20–30k) |
| O21 | https://justjoin.it/job-offer/shelf-senior-full-stack-product-engineer-warszawa-javascript-449a4ebb |
| O22 | https://justjoin.it/job-offer/publink-senior-product-engineer-react-typescript-net--poznan-javascript |
| O23 | https://justjoin.it/job-offer/droplabs-junior-product-engineer-full-stack-php-typescript--krakow-php |
| O24 | https://justjoin.it/job-offer/memcare-as-senior-product-engineer-warszawa-ruby |
| O25 | https://justjoin.it/job-offer/photoaid-ai-first-senior-fullstack-developer-warszawa-javascript |
| O26 | https://justjoin.it/job-offer/juo-fullstack-engineer-warszawa-javascript |
| O27 | https://nofluffjobs.com/pl/job/senior-ai-nodejs-engineer-tooploox-remote-1 |
| O28 | https://nofluffjobs.com/pl/job/forward-deployed-engineer-agentic-ai-tooploox-remote |
| O29 | https://nofluffjobs.com/pl/job/senior-fullstack-engineer-node-react-typescript-link-group-remote-1 |
| O30 | https://nofluffjobs.com/pl/job/senior-ai-engineer-node-js-react-iteamly-remote-1 |
| O31 | https://nofluffjobs.com/pl/job/senior-product-engineer-agentic-ai-python-react-digital-new-agency-poland-remote (employer shown as DNA Technology) |
| Ox (excluded) | https://justjoin.it/job-offer/code-and-pepper-ai-product-engineer-ny--new-york-ai |

**Other sources**

| # | Source | Date / notes |
|---|---|---|
| W1 | PostHog, Product Engineer Handbook: "What is a product engineer?" https://posthog.com/blog/what-is-a-product-engineer | Undated living document; read via Playwright |
| W2 | Gergely Orosz, "The Product-Minded Software Engineer" https://blog.pragmaticengineer.com/the-product-minded-engineer/ | 2019-09-05, updated 2022-02-01 (old) |
| W3 | Stack Overflow Developer Survey 2025, AI section https://survey.stackoverflow.co/2025/ai | 2025; 49k+ respondents; Stack Overflow |
| W4 | https://survey.stackoverflow.co/2026/ | HTTP 404 today [measured] |
| W5 | JetBrains, "State of Developer Ecosystem 2025" (blog summary) https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/ ; interactive page https://devecosystem-2025.jetbrains.com/artificial-intelligence (numbers didn't render) | 2025-10; n=24,534; JetBrains |
| W6 | Canva Engineering, "Yes, you can use AI in our interviews" https://www.canva.dev/blog/engineering/yes-you-can-use-ai-in-our-interviews/ | 2025-06-11 |
| W7 | Karat, "Engineering Interviews in 2026: 3 Trends" https://karat.com/engineering-interview-trends-2026/ | 2026-01-07; n=400 eng leaders, US/IN/CN; vendor |
| W8 | CoderPad State of Tech Hiring 2026 https://coderpad.io/wp-content/uploads/2026/02/coderpad-state-of-tech-hiring-2026.pdf (= H-S11) | 2026-02; ~650 participants; vendor |
| W9 | 10Clouds, "Software Development With Claude" https://10clouds.com/services/software-development-with-claude/ | Undated |
| W10 | wnp.pl on the Hays Poland IT Contracting Salary Report 2026 https://www.wnp.pl/rynki/raport-w-2026-r-82-proc-firm-z-branzy-it-planuje-rekrutacje-wazne-beda-kompetencje-z-zakresu-ai,1023412.html | 2026-01-17; primary not read |
| W11 | Bulldogjob, Polish IT Community Report 2025 https://bulldogjob.com/it-report/2025 and /2025/programmer | Survey 2025-01-15 → 02-16; n=4,331; job-board panel, self-selected. The 2026 edition URL returned 404 |
| W12 | UODO, "Poradnik dla pracodawców – rekrutacja" (slides, B. Żeromski) https://uodo.gov.pl/file/1545 | 2018 (old); text extracted with pymupdf |
| W13 | UODO-domain search results (WebSearch limited to uodo.gov.pl / gov.pl) summarising UODO guidance: no consent needed for art. 22¹ §1 data; the consent-in-CV practice is "not proper"; a voluntary photo → consent basis. The underlying guide PDF https://orka.sejm.gov.pl/BOP_info.nsf/0/43826AB057FD3661C125832E00368D2F/$File/Poradnik%20dotycz%C3%84%E2%80%A6cy%20zatrudnienia.pdf could not be retrieved (redirect loop) | Treat as medium confidence |
| W14 | KluczeSoft, "Aktualna klauzula RODO do CV — poradnik 2026" https://kluczesoft.pl/wiedza/bezpieczenstwo/aktualna-klauzula-rodo-do-c-v | 2026-06-10, modified 2026-10-03; vendor blog; cites UODO positions without links |
| W15 | Zielona Linia (government help line), "Klauzula CV…" https://zielonalinia.gov.pl/klauzula-cv-2024-czyli-zgoda-na-przetwarzanie-danych-osobowych/ | 2024-09-23; says consent is required, which contradicts W13. Evidence of persistent confusion |
| W16 | generujcv.com, "Zdjęcie w CV 2026" https://generujcv.com/blog/zdjecie-w-cv ; GoWork poradnik https://www.gowork.pl/poradnik/25/cv-i-list-motywacyjny/cv-ze-zdjeciem-czy-bez-jak-wybrac/ | Opinion |
| W17 | ATS detection [measured, Playwright: outbound links + network hosts]: https://www.netguru.com/career (→ apply.workable.com/netguru), https://tsh.io/career/ (→ tsh.traffit.com), https://www.boldare.com/career/ (→ boldare.breezy.hr), https://www.callstack.com/careers (Recruitee widget), https://www.tooploox.com/careers (jobs.ashbyhq.com), https://10clouds.com/careers/ (jobs.workablemail.com), https://spyro-soft.com/career (careers.spyro-soft.com/jobs/…), https://careers.swmansion.com/, https://www.monterail.com/careers, https://careers.miquido.com/ (none detected) | — |
| W18 | JJIT keyword counts [measured]: https://justjoin.it/job-offers/all-locations?keyword=… — total 19,547; fullstack 723; "full stack" 1,380; react 1,314; claude 1,646; copilot 905; cursor 470; settlemint 2 (shows descriptions are searched); "Product Engineer"-titled offers = 20 of the first 50 for "product engineer" | Matching rules unknown and possibly fuzzy: order of magnitude only |
| W19 | JJIT apply consent text on the O1 page | [measured] |
| W20 | NFJ "Analiza CV BETA" widget on O29/O30 pages | [measured] |

Not covered:
- **Polish recruiter data on what is opened first** (LinkedIn vs CV vs portfolio). None found; the NFJ/SWPS recruiter surveys sit behind forms.
- **Survey and report gaps:**
  - A Stack Overflow 2026 survey (404).
  - JetBrains' concern percentages (the page didn't render; only the blog's top-5 list).
  - The LeadDev AI report (not fetched; search budget).
  - The Hays primary PDF.
  - A Bulldogjob 2026 edition (404).
- **AI and hiring policy gaps:**
  - Published AI-usage or client-IP policies from Netguru, STX Next and TSH (none found).
  - Restrictions written into client contracts, which are invisible in job ads.
  - Any PL data on AI being allowed in software-house interviews.
- **Legal and ATS gaps:**
  - The primary UODO employment guide PDF; the RODO points rely on 2018 UODO slides, a UODO-domain search snippet and a vendor blog. **This is not legal advice.**
  - The ATS for Software Mansion, Monterail, Miquido and STX Next.
- **Sample limits:**
  - The 31 offers are a purposive sample from one day.
  - Salaries were hidden in 5 of them.
  - Seniority labels are each employer's own.
- **No direct interviews** with PL recruiters or tech leads to validate the objection map. Five 15-minute calls would be the cheapest validation.
