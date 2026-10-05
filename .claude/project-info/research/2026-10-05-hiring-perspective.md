# Hiring Perspective: What Actually Gets Developers Hired via a Portfolio
Date: 2026-10-05

Evidence tags: [data] survey/study/measurement · [expert] named practitioner/company · [anecdote] individual story/thread · [opinion] blog take · [measured] measured by me (method stated). Source numbers like (S12) point to `## Sources`.

## TL;DR — implications for this portfolio

1. **Design for the channel that converts, not cold applications.** In Ashby data covering 38M applications, inbound applications reach interview **3%** of the time. Referrals reach it 40% of the time and sourced candidates 25%. Per application, a referral ends in an offer 7.3% of the time vs 0.2% for inbound [data] (S6). The site's main job is to make a referrer, sourcer or hiring manager who already has your link say "interview" fast. That means a clean shareable URL, a proper OG/LinkedIn preview card, and proof on the first screen.
2. **The first screen gets seconds, not minutes.** Hiring managers say they spend "15-30 seconds" or "< 30 seconds" on a portfolio, or "a 5 second glance". Many never open it, and others use it only "to confirm hunches or find reasons against" [anecdote] (S31–S35). So a no-interaction hero has to answer: who, which role, the strongest proof, and contact/CV. No intro animation, no loader gate, no scroll-jacking. The old site's linear scroll to contact is exactly the failure mode.
3. **For frontend roles the site is a work sample, and a liability if it's broken.** Hiring managers say they check whether it is "responsive", "fast load", "basic SEO". One wrote: "if... your own portfolio breaks on phones, that's... not great". Another: "Personal websites are a liability... plenty get cut early because of them" [anecdote] (S34). Disabling mobile, as the old site did, is a hard fail. Set a performance budget and an accessibility floor, and treat them as features you show off.
4. **Where to sit on flat → immersive: micro-interactions plus ONE signature shader/3D accent, with content first.** In hiring threads flashy 3D gets no credit and can block access: "If I can't find your projects in 5 seconds because of fancy 3D animations, I'm closing the tab". One developer who tried Three.js and OS-style sites says he "never got any comments on anything super creative and flashy" [anecdote] (S26, S35). Creative studios do expect WebGL craft, but they also judge performance and cross-device behaviour (S39, S41). And that niche is tiny: on Just Join IT today, "three.js" matches **10** offers and "webgl" 15, vs **1,300** for "react" [measured] (S45). Keep any immersive mode opt-in (a "lab"/"play" layer), never a gate.
5. **Order of proof: shipped and live with real users/metrics > your personal role + decisions/trade-offs write-up > 2–4 curated repos with READMEs > writing/blog > certificates.** "Anything that has shipped." "Give me a link to 1 in-depth project." Vercel's job ad: "Your work shows what you personally identified, designed, built, shipped, and learned after launch" [expert] (S28, S29, S40). Go deep on 2–4 projects rather than wide.
6. **The "projects beat a degree" belief is true only in some places; don't argue it on the site, just prove it.** Dropping degree requirements changed **fewer than 1 in 700 hires**, and tech firms were over-represented among companies that dropped them "in name only". 52% of US web-developer postings still require a degree [data] (S9). 44.7% of recruiters systematically require degrees [data] (S12). ~78% of professional developers in the SO 2025 survey hold a bachelor's or higher [data] (S13). In Poland 42.8% of programmers hold a master's [data] (S24). But some employers say outright "There is no required path into this role... We care about the quality of what you have shipped and the judgment behind it" (Vercel) [expert] (S40). Target those employers, startups, agencies and referrals.
7. **In the AI era, authenticity is the scarce signal.** Hiring managers see "400 applicants in a few days... Almost all the resumes have been run through an LLM... I can't trust the resumes anymore" [anecdote] (S32). Gartner predicts **1 in 4 candidate profiles worldwide will be fake by 2028** [data/forecast] (S8). One candidate was rejected after the HM found their portfolio projects "were just templates that they downloaded" [anecdote] (S33). Show what is expensive to fake:
   - live systems with real usage
   - specific numbers
   - decision logs, plus what you'd do differently
   - your own voice
   - the same identity across your domain, LinkedIn and GitHub
   - honest notes on how you used AI and how you checked its output (S40)
8. **The junior market is brutal, so position as a "junior who is already productive".** Entry level is **4.5%** of US software-dev postings vs 69.3% senior (Q1 2026) [data] (S16). In Poland juniors get 4.8–5.3% of offers in 2025 [data] (S18, S21) and 10% on theprotocol.it in H1 2026 (S23). Junior frontend drew **370+** applicants per offer in 2024 [data] (S19). Polish employers want people "fully independent... delivering measurable business value from day one" (S22). So lead with ownership, independence and production responsibility.
9. **Serve two audiences in layers** (see "Two-audience model" below):
   - a 30-second recruiter skim: role title, stack keywords, location/availability, CV, LinkedIn
   - a ~10-minute engineer deep-dive: case studies, architecture, code, trade-offs
10. **Make contact low-friction:**
    - a visible plain-text email with a copy button, plus `mailto:`
    - LinkedIn and GitHub links
    - the CV PDF in the header AND at the end
    - an availability line: role, contract type B2B/UoP, remote/hybrid city, timezone, start date
    - a form and a Calendly link are optional extras, never the only route

    Evidence here is weak, so these are friction-minimising defaults.
11. **Write the site in English first** (Polish toggle optional). 51% of Polish IT specialists use English as their main work language [data, vendor survey] (S25). Remote/EU recruiters can't read Polish.
12. **Keep certificates small**: one compact line, not a section. Hiring managers say they ignore course certificates "except the Azure and AWS 'Solution Architect'... only if relevant". Certs get you "past the first round of automated filters", while portfolios drive "final decisions" [anecdote/expert-weak] (S37, S38).

---

## 1. Who looks, when, for how long, on what device

### Actors in the pipeline

| Actor | Stage | Time spent (evidence) | Device | What they want | Evidence |
|---|---|---|---|---|---|
| Sourcer / recruiter (often non-technical) | Top of funnel: LinkedIn/ATS search, outbound messages, inbound screen | Seconds. Resume skim "7.4 s" (Ladders 2018, weak). Portfolio "Most likely a 5 second glance if that" | No primary data. ATS work is likely on desktop [assumption] | Keyword match (title, stack), years/level, location/remote, availability, contract, an identity that looks real | S1–S3, S34. 1 in 3 PL recruiters "nie jest w stanie określić technologii wymaganych na poszczególnych stanowiskach" (can't name the stack a role needs) (S44, undated, c.2022) |
| Hiring manager (EM / tech lead) | After recruiter pass, before or between interviews | "15-30 seconds... before an interview"; "< 30 seconds"; many never look; "unless I get down to the end of the interview process and need a little bit of signal" | Unknown. Links often arrive via email/Slack/LinkedIn [assumption] | "Evidence of impressive projects, of non-trivial scope"; personal role; something to talk about; red flags | S33–S35 [anecdote] |
| Engineers in the interview loop | During or just before the technical round | Minutes, sometimes live: "one interviewer pulled up my site there and then"; interviewers "asked lots of technical questions around the website, like why I chose particular solutions, what the trade-offs I made were" | Desktop/shared screen | Code, trade-offs, depth, proof you did it yourself | S26 [anecdote] |
| Referrer (contact inside the company) | Before submitting a referral | Unknown | Often phone/Slack [assumption] | A link that makes *them* look good for forwarding it | S6 (referral conversion) |
| Creative-studio lead (CD/TD) | Application review | Longer: they judge the craft itself | They open "the actual site on your own phone, on cellular" | Craft, motion, performance budget, range, awards, live links | S39, S41 [expert/opinion] |

### Tracing famous screening-time stats

| Claim | Primary | What the primary says | Verdict |
|---|---|---|---|
| "Recruiters spend 6 s on a resume" | Ladders 2012 eye-tracking | 6 s initial screen (as reported in S1) | Dated vendor study about resumes, not portfolios |
| "7.4 seconds" | Ladders 2018 eye-tracking PDF (theladders.com/static/.../TheLadders-EyeTracking-StudyC2.pdf) returned **403** to me. Secondary: HR Dive 2018-11-08 | 7.4 s; did best with simple layouts, clear sections/headings, F/E-pattern; did worst with multi-column, cluttered layouts | Methodology undisclosed (S2). "30 recruiters, 10 weeks" (S3) looks like the 2012 study's description and is unverified for 2018. Commercial, not peer-reviewed. Use only as "first pass is seconds" |
| "~60% of employers spend ≤11 s" | Workopolis (undated) via S2 | Behaviour in a resume-database search tool | Weak, undated |
| "Hiring managers spend 6–8 s / 90 s on a portfolio" | Aggregator/newsletter posts (2026) | No primary cited | **Untraceable** |
| "71% of recruiters read resumes on mobile (LinkedIn)" / "73% use mobile daily (Jobvite 2023)" | resumly.ai blog (2025-10) | Text search of the Employ/Jobvite 2023 Recruiter Nation PDF found **no "mobile" stat** [measured: pymupdf text grep] | **Untraceable** |
| Device split | linkedin.com browser traffic ~70% desktop / 30% mobile (Semrush via Exploding Topics, page dated Aug 2026; split from search snippet; excludes the app) | Web visits only | Weak. **No primary data on what device recruiters or HMs use to open portfolio links.** Design for both |

---

## 2. Does a portfolio / personal site / GitHub actually influence decisions?

### Survey and labour-market data

| Finding | Source (n, who, year) | Tag |
|---|---|---|
| Application→interview: referral **40%**, sourced 25%, inbound **3%**, agency 42%, internal 42%. Interview→offer: referral 16%, inbound 6%. Inbound = 93.8% of applications, referrals ~1% | Ashby, 38M applications / 93K jobs, 2021–2024, pub. 2025-05-16 (S6) | [data] |
| Applications per hire tripled since 2021 to **300+**; candidates 50% less likely to get an interview than 5 years ago; technical roles ~10 weeks to fill | Ashby, 100M+ applications / 200K+ jobs, 2026-05-07 (S5) | [data] |
| Recruiters: 69% use resume review, only **16%** think it predicts performance. Live coding and technical discussion rated best predictors | CoderPad State of Tech Hiring 2026, ~650 participants, Feb 2026 (S11) | [data, vendor] |
| Developers' "best way to showcase skills": technical discussion 50.4%, take-home 46.1%, live coding 39.6%, **portfolio review 33.2%** | CoderPad+CodinGame 2025, 5,000+ respondents, pub. 2025-01-08 (S12) | [data, vendor] |
| Dropping degree requirements raised non-BA hires by ~3.5 pp in those roles, a net **"not even 1 in 700 hires"**. 45% of firms changed "in name only", and "Tech firms were overrepresented within the In Name Only cluster". 52% of US web-dev postings still require a degree | Harvard Business School + Burning Glass Institute, 11,300 roles (occupation × employer) at large firms, 2014–2023, Feb 2024 (S9) | [data] |
| 85% of employers "use skills-based hiring"; 53% removed degree requirements (30% in 2024); **but 41% say degrees are MORE important than 5 yrs ago** vs 32% less; work samples used by only 16% | TestGorilla, 1,084 employers + 1,076 job seekers, US/UK, Apr 2025 (S10) | [data, vendor] |
| 44.7% of recruiters systematically require degrees, 21.6% never, 33.7% role-dependent | CoderPad+CodinGame 2025 (S12) | [data, vendor] |
| Pro developers' education: bachelor 45.9%, master 28.0%, professional 4.5%, some college/no degree 11.5%, secondary 5.1%. **The survey asks no hiring/portfolio questions**, so blog claims that "SO 2025 says portfolios are the top hiring priority" are unsupported | Stack Overflow Developer Survey 2025, 49,019 responses (S13) | [data] |
| 93% of TA pros say accurate skills assessment is crucial; 26% of paid LinkedIn posts lacked degree requirements in 2023 (22% in 2020). **The page never mentions portfolios** (secondary sites that claim it does are untraceable) | LinkedIn Future of Recruiting 2025, n=1,271, 23 countries, survey Sep 2024 (S14) | [data] |
| 70% of employers research candidates on social sites; 66% use search engines; **47% less likely to interview a candidate with no online presence**; 34% hired because of "evidence of creativity" found online | CareerBuilder/Harris Poll, n=1,012 US HMs/HR, Apr–May 2018 (S43) — **old** | [data] |
| 74% of developers report difficulty landing jobs; YoY hiring growth: junior +9%, entry +7%, senior +19%, lead +22% | HackerRank 2025 Developer Skills Report, n=13,732, 102 countries (S4) | [data, vendor] |

### Junior market, 2025–2026

| Finding | Source | Tag |
|---|---|---|
| US software dev postings Q1 2026: **senior 69.3%, entry 4.5%**; across all postings, senior +14.7% YoY vs entry −7.5% | Indeed Hiring Lab, 2026-07-23 (S16) | [data] |
| Employment of US software devs aged 22–25 "declined by nearly 20%" from the late-2022 peak to Jul 2025; older devs stable or growing | Brynjolfsson, Chandar, Chen, Stanford DEL, 2025-08-26, ADP payroll (S15) | [data] |
| "Profiles with high-profile schools and workplaces get up to 20-50x more reachouts"; a CEO says "they can't trust inbound candidates anymore"; juniors need "projects which clearly demonstrate they can build production-ready software"; remote = 35% of engineering jobs (56% in 2022) and draws 4.5x the 2022 application count | Pragmatic Engineer, Tech jobs market 2025 pt 3, Nov 2025 (S17) | [expert/data] |
| Some big employers (Shopify, GitHub, Cloudflare, OpenAI, Anthropic, Netflix) are restarting or expanding junior hiring; 28% of hiring leaders call early-career pipeline building a priority | S17, S11 | [expert/data] |

### What practitioners say (2024–2026 unless flagged)

| Voice | Quote / gist | Tag |
|---|---|---|
| HM (HN 2024-09) | "When I am hiring I always look at personal websites if they are available... if it feels like an 5-minute thoughtless effort, with an empty template and a single entry dated 4 years ago saying 'TODO', then it will count against you." (S26) | [anecdote] |
| Dev/hirer (HN 2024-09) | Tried Three.js and "make my site look like an OS" versions: "I never got any comments on anything super creative and flashy... Seems like simple and easy is best... When I have hired designers or FE devs I don't even interview them if they don't have a personal site." (S26) | [anecdote] |
| Skeptic (HN 2024-09) | "So far everyone saying 'yes' has anecdotes from the beginnings of a career that started a while ago... it was easier to get hired then." Also: "The projects got me hired but the portfolio website itself didn't." (S26) | [anecdote] |
| Resume screener (HN 2024-04) | "most GitHub profiles I see are worthless... The most useful repos from a screening perspective are where you created a non-trivial project from scratch." (S27) | [anecdote] |
| HM (r/cscq 2026-05) | "I never look at your portfolio/github to build cases for hiring you, only to confirm hunches or find reasons against." The candidate's claimed work was downloaded templates: "Would've gotten the interview if their GitHub was not linked." (S33) | [anecdote] |
| HM (r/cscq 2026-05) | "Real professional exp >>> portfolio... Portfolio > nothing however." / "Portfolios are better than nothing for junior positions. It gives us something to talk about." (S33) | [anecdote] |
| Seniors (r/ExperiencedDevs 2026-05, 155 comments) | Overwhelmingly "no" to public portfolios at senior level; "never been on a hiring committee that cared about side projects unless it happened to be directly relevant." (S30) | [anecdote] |
| r/ExperiencedDevs 2021 (old) | "Give me a link to 1 in-depth project"; hates "typewriter effect", "a grid of... technology logos", "poor picture"; portfolios matter for juniors and design/FE roles. (S29) | [anecdote] |

**Synthesis:** a portfolio rarely gets someone hired on its own. For juniors and frontend candidates it is often the only evidence that differs from other applicants. It works as a tie-breaker, a source of interview talking points and a legitimacy check. For backend/senior candidates it is mostly irrelevant. It can **hurt** when it's broken, a template, stale, or reveals copied work.

---

## 3. What hiring managers want and hate, and when flashy helps or hurts

### Want vs hate

| Want | Hate |
|---|---|
| "clean layout, fast load, 2-4 focused projects with live demos and github links, clear role per project and brief writeup" (S34) | Fancy 3D/animation that hides projects: "can't find your projects in 5 seconds... closing the tab" (S35) |
| Evidence of "non-trivial scope"; "how you handled real problems and constraints"; "your messiest project... the one that taught you the most" (S34) | Typewriter effects, a logo grid of every technology, poor photos, "about me" padding (S29, S34) |
| Projects plus "your opinions"; "details where it matters (write ups)"; responsive; basic SEO (CTO, S34) | Stale/empty template ("TODO" dated 4 years ago) (S26); broken mobile (S34) |
| Shipped things; "Associated blog posts that explain how your code works and why" (HN 2017, old) (S28) | Tutorial clones and trivial OSS commits (S27); templates passed off as your own work (S33) |
| Something to talk about in the interview (S29, S33) | Unreadable contrast, e.g. "red on black is barely readable" in dark mode (S35) |

### Visual intensity by target role

| Target role | What the site must prove | Effect of heavy immersive 3D | Recommended point on flat → immersive | Evidence |
|---|---|---|---|---|
| Backend / platform | Systems thinking, reliability, data | Neutral to negative (irrelevant; slows access) | Flat + crisp typography | S29, S30 |
| Full-stack product | End-to-end shipping, real users | Neutral; risk that it hides content | Flat + micro-interactions | S33, S34 |
| Product frontend / design engineer | UI craft **and** performance/a11y judgment; the site *is* a work sample | Positive only if fast, accessible, mobile-equal; negative if it gates content | Micro-interactions + one signature shader/3D accent | S34, S40 ("accessibility, performance, resilience... as part of the design") |
| Creative / WebGL developer (agencies: Active Theory, Lusion, Immersive Garden...) | 3D math, shaders, motion, asset pipeline, frame budget | Expected; the core of the portfolio | Immersive *pieces* (case studies, demos), but with mobile tuning and fallbacks | Active Theory job: "Understand, implement and advocate frontend performance", "cross device testing and optimization", "send your resume and portfolio" (S39, 2020 — old). Buyer's guide: "Open the actual site on your own phone, on cellular"; red flags: "No live links", "Vague on performance" (S41) |

Creative-dev market size check [measured, 2026-10-05]:
- Just Join IT keyword search: "three.js" 10, "webgl" 15, "react" 1,300, "typescript" 1,457, "next.js" 398, out of 19,413 total offers (S45). Method: Playwright render of `justjoin.it/job-offers/all-locations?keyword=…`, reading the "All offers - N offers" counter. Keyword matching rules unknown, so treat as order of magnitude.
- The Awwwards global jobs board listed "24 job opportunities" (S46).

Bruno Simon's iconic driving-car portfolio is the counter-example (2019 — old):
- 3 months of evenings and weekends; 2.8 MB
- 160,000 visits in the first week, but **average time on site 54 s**
- he still shipped mobile controls and clamped the pixel ratio
- his career went into creative dev/teaching, the niche the site speaks to (S42) [measured by author]

Peer communities (r/threejs) upvote immersive portfolios, but hiring threads don't reward them. Don't confuse peer applause with hiring signal [anecdote] (S26, S35).

---

## 4. Trust and proof signals, ranked for this candidate

| Signal | Weight | Evidence | How to show it |
|---|---|---|---|
| Live production link + real users/metrics | Highest | "Anything that has shipped"; "shipped, acquired customers and made money" (S28, old); Vercel: "the quality of what you have shipped and the judgment behind it" (S40) | Live URL, user/traffic/revenue numbers, dates, screenshots as fallback when the link may die |
| Clear personal role + decisions/trade-offs | Very high | "clear role per project" (S34); interviewers ask "why I chose particular solutions, what the trade-offs I made were" (S26); "what you personally identified, designed, built, shipped, and learned after launch" (S40) | Case study: problem → constraints → decisions → result → what I'd change |
| Non-trivial code, curated | High (when it is actually read) | "non-trivial project from scratch" (S27); HMs mostly skim | 2–4 pinned repos, README with run instructions/architecture; never tutorial clones |
| Consistent identity (own domain, LinkedIn, GitHub) | High in 2026 | Candidate "legitimacy correlated with including LinkedIn and Github urls" (S33, anecdote); Gartner fake-profile forecast (S8); 47% less likely to interview with no online presence (S43, 2018) | Same name/photo/handle everywhere; own domain email |
| Writing / blog | Medium; high in niches; slow to pay off | Many HN stories of blogs leading to jobs (S26); but "would I start blogging in 2024 just to get job offers? Probably not" (rwieruch, S26) | 2–3 deep technical posts tied to the projects, not a content treadmill |
| Open source | Medium; strong if real users | HackerRank: open source and hackathons top branding tactics (S4); trivial PRs count for nothing (S27) | Link merged PRs with context |
| Video walkthrough | Low–medium | "I know no one is sitting through those walkthroughs, but they're there mainly as my 'proof'" (S33) | ≤90 s clip per flagship project, optional; useful for private/NDA code |
| Testimonials | Unknown/low | No data found; easy to fake | Only real names with LinkedIn links (e.g. a client or lead) |
| Certificates | Low (except relevant cloud certs) | Ignored "except the Azure and AWS 'Solution Architect'"; "liked game jams and mini projects more" (S37); certs as ATS filter only (S38) | One compact line or a CV-only mention |
| Resume PDF | Required utility | Recruiters still rely on resumes: 67–72% use them (S10, S12) | Header + contact; ATS-friendly single column, matches site content |

---

## 5. The AI era (2025–2026): flooding, spotting fakes, signalling authenticity

| Fact | Source |
|---|---|
| 39% of candidates used AI during applications (Q4 2024, n=3,290); 6% admitted interview fraud (Q2 2025, n=3,000); **"by 2028, one in four candidate profiles worldwide will be fake"** | Gartner press release 2025-07-31 (S8) [data] |
| 91% of recruiters have detected candidate deception; 65% of HMs caught AI misuse; 41% of job seekers admit prompt injections; 39% of HMs do more in-person interviews to verify authenticity | Greenhouse AI in Hiring 2025, n=4,136, US/UK/IE/DE, 2025-11-19 (S7) [data] |
| "Almost all the resumes have been run through an LLM... I can't trust the resumes anymore... personal referrals are at a premium" (1.9k upvotes); replies: "clearly LLM. <10 seconds to bin" | r/cscareerquestions, 2026-03-04 (S32) [anecdote] |
| "In the world of AI, a portfolio would be trivial to generate too, so not particularly interesting" | r/cscq, 2026-05-05 (S33) [anecdote] |
| Assessments are moving to multi-file, real-world scenarios; AI-enabled tests where evaluators see "prompt history and decision-making" | CoderPad 2026 (S11) [data/vendor] |
| "You use coding agents in your daily work, but you can explain, test, debug, and take responsibility for the code they help produce" | Vercel Design Engineer job, ~2026-10 (S40) [expert] |

Implications:
- **Template look = suspicion.** A default shadcn/Aceternity/AI-builder look reads as "5-minute effort" (S26) or downloaded templates (S33). Use a distinct visual identity and your own copy.
- **Show judgment, not just output.** Decision logs, rejected alternatives, measured results (Lighthouse/CWV, load numbers), incidents fixed.
- **Present AI use as a skill.** e.g. "used agents for X, verified by Y tests". Don't hide it and don't brag about "built with AI".
- **Make it verifiable.** Commit history over time, deploy dates, live URLs, real people you can name. These are hard to fake cheaply.

---

## 6. Poland / EU / remote specifics

| Metric | Value | Source |
|---|---|---|
| Junior share of offers | JJIT 2025: **4.79%** (mid 43.73%, senior 51.48%; 110,996 offers, +8.42%) | S21 (2026-01-23) |
| | NFJ 2025: **5.3%** (8% in 2023); ~60% senior | S18 (Jan 2026) |
| | theprotocol.it H1 2026: **10%** (+5% YoY); mid 48%, senior 34% | S23 (2026-09-30) |
| | Pracuj.pl 2025: senior offers +77%, junior −4%; IT offers +18% | S22 (2026-02-05) |
| Competition | NFJ: average applications per offer 44 (2024) → 24 (2025) → **21 (H1 2026)**; "Najtrudniej wciąż mają juniorzy" (juniors still have it hardest) | S20 |
| | Frontend most contested: 149/offer in 2024, junior frontend **"ponad 370"**; 2025 frontend average 78 | S19, S18 |
| | ~15,000 IT graduates a year try to enter the market (Square One quote) | S18 |
| Employer expectations | "people fully independent... delivering measurable business value from day one" (Pracuj); "Organizacje koncentrują się na osobach, które mogą szybko wejść do projektu, samodzielnie prowadzić zadania i wziąć odpowiedzialność za rezultat" (organisations focus on people who can join a project quickly, run tasks on their own and own the result) (theprotocol); juniors need a "portfolio projektów pokazujących realne umiejętności" (portfolio of projects showing real skills) (JJIT, [opinion]) | S22, S23, S21 |
| Contract types | Junior offers 2025: UoP 58.0%, B2B 37.9% (B2B −14.6 pp YoY); mid/senior ~72% B2B | S18 |
| Degrees | 42.8% of PL programmers hold a master's | S24 (Bulldogjob 2025) |
| English | 51% of PL IT specialists use English as main work language; 88% B2–C2 (vendor survey) | S25 (2025-06-17) |
| Recruiter literacy | ~1 in 3 recruiters can't specify the technologies a role needs (undated, c.2022) | S44 |
| Remote | Remote offers draw more applications than on-site/hybrid (NFJ chart, values hard to read); globally remote is 35% of eng jobs and gets 4.5x the 2022 applications; in-person candidates get more outreach | S18, S17 |

Implications:
- English-first site; optional PL.
- State "Open to UoP or B2B" explicitly.
- State the city and hybrid willingness, not just "remote". Remote-only shrinks the pool and raises competition (S17).
- Lead with independence and ownership language that matches Polish job ads.

---

## 7. Conversion: contact and CTA

Evidence for candidate sites specifically is **weak**: no studies found. The recommendations are friction-minimising defaults with a stated rationale.

| Element | Recommendation | Rationale / evidence |
|---|---|---|
| Email | Visible plain-text address + copy button + `mailto:`; on your own domain | Recruiters work from email/ATS; a mailto-only link fails on machines without a mail client (UX.SE 2016, old) [opinion]; an address on your own domain helps legitimacy (S26 psyklic) |
| Contact form | Optional secondary channel only | Adds friction and a spam/maintenance burden; vendor claims that forms convert better (splitforms) are unverified [opinion] |
| Calendly / booking | Secondary ("15-min intro call") | No evidence either way. Some recruiters may read it as presumptuous as a *first* step [assumption] |
| CV PDF | In header/nav and in contact; same content as the site; dated "Updated 2026-10" | 67–72% of recruiters still rely on resumes (S10, S12); HMs forward PDFs internally [assumption] |
| LinkedIn + GitHub | Header and footer, icon + label | Legitimacy signal (S33); missing LinkedIn "makes you stand out... not in a positive way" (S27) |
| Availability line | "Open to: Frontend/Full-stack · Junior–Mid · Remote (EU) or hybrid [city] · UoP/B2B · from [date] · CET" | Covers recruiter filter fields (S1, S18); timezone matters for EU-remote |
| Placement | Contact reachable from any scroll position (sticky header link) and ≤1 tap on mobile | The old site's linear scroll buried contact; HMs give <30 s (S34, S35) |
| Measurement | Unique email/alias on the site; privacy-friendly analytics | "the email on my website is unique and not mentioned anywhere else" let one dev attribute 2 projects to the site (S26); server logs showed who visited (S26) |

---

## Two-audience model

| | ~30-second recruiter skim (non-technical) | ~10-minute engineer / HM deep-dive |
|---|---|---|
| Arrives from | LinkedIn profile/InMail, ATS link, CV header, a referral message | CV link before interview, interviewer pulls it up live, referral forward |
| Questions | Is this a real person? Which role/level? Stack keywords match? Where / remote / when / contract? How do I contact them or get the CV? | Did they really build it? How hard was it? How do they think (trade-offs, constraints)? Is the code decent? Would I enjoy working with them? |
| Must see without scrolling or interaction | Name + photo; role title ("Frontend / Full-stack Developer"); 1-line value prop with a number ("Shipped X used by N people"); stack keywords in plain text; location/availability; CV + LinkedIn + email | Entry points to 2–4 flagship case studies |
| Format | Scannable text, no jargon, no animation dependency | Case-study pages: problem → constraints → architecture diagram → key decisions & rejected alternatives → results/metrics → what I'd change → live link + repo + 60–90 s video |
| Proof style | Logos/names of real clients/users, numbers, dates | Code links to specific files/PRs, perf numbers (Lighthouse/CWV), incident stories |
| Failure mode | Can't find role/contact in 5 s → closes tab (S35) | Shallow or template work → "reasons against" (S33) |

How one site serves both:
- **Layer, don't split.** The home page is the skim layer: hero + proof strip + project cards with a one-line outcome each. Each card links to a deep case study.
- **Progressive disclosure.** Put details behind "Read the case study", "View architecture", "See the code" links. Never require them to reach the basics.
- **Visual flair can't block content.** Animation enhances the skim layer, never gates it. Respect `prefers-reduced-motion`; mobile gets the same content.
- **Offer a ~2-minute overview path.** A "Start here" or "Hiring? Here's the 2-minute version" anchor for HMs, plus a printable CV.
- **Cross-link with the CV.** The CV links to the specific case-study URLs, so a HM forwarding it lands engineers directly in the deep layer.

---

## What contradicts conventional wisdom

- **"Build a portfolio site to get hired" is overstated.** Most HMs barely look; the site works mainly as confirmation, a tie-breaker, or a reason to reject (S33, S34). It earns its keep through referral/outbound channels and interview talking points (S6, S26).
- **"Skills-based hiring means degrees don't matter" is mostly rhetoric so far:** <1 in 700 hires (S9). 41% of employers say degrees are *more* important than they were 5 years ago (S10).
- **"Recruiters spend 6–7 seconds" is a vendor resume study with undisclosed methods.** The many portfolio-time and mobile-recruiter stats online are untraceable (S2, S3).
- **Even the most famous immersive portfolio averaged 54 s per visit**, and it serves a niche that has ~10 matching Polish job offers today (S42, S45).
- **The Polish market eased in 2025–26** (applications per offer down 45% in 2025 and to 21 in H1 2026), but juniors didn't benefit proportionally (S18, S20).
- **Senior HMs often dislike public side-project culture.** For mid-level, the portfolio should frame *professional* shipped work (with NDA-safe write-ups) rather than hobby repos (S30, S31).

## Evidence gaps / open questions
- No primary data on the devices recruiters or HMs use to open portfolio links.
- No controlled study on whether portfolio sites (vs GitHub/LinkedIn alone) change interview rates for developers.
- No data on contact-method conversion for candidate sites (form vs mailto vs Calendly).
- Polish recruiter-survey data on portfolio/GitHub weighting sits behind NFJ download forms (S44 family); not retrieved.
- Agency hiring criteria (Lusion, Immersive Garden, Locomotive, Resn) come mostly from job ads; the only rich ad I found (Active Theory) is from 2020.

## Sources
All accessed 2026-10-05.

| # | URL | Title | Pub date |
|---|---|---|---|
| S1 | https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/ | Eye tracking study shows recruiters look at resumes for 7 seconds (HR Dive) | 2018-11-08 |
| S2 | https://standout-cv.com/usa/stats-usa/how-long-recruiters-spend-looking-at-resume | How long recruiters spend looking at your resume (critique of Ladders/Workopolis) | 2026 (updated) |
| S3 | https://resumeheatmap.com/eye-tracking-study | TheLadders 7.4-Second Resume Eye-Tracking Study (2018) — summary & limitations | n.d. |
| S4 | https://www.hackerrank.com/reports/developer-skills-report-2025 | HackerRank 2025 Developer Skills Report | 2025 (Q1) |
| S5 | https://www.prnewswire.com/news-releases/new-data-from-ashby-reveals-surge-in-applications-rising-selectivity-and-shifting-recruiter-workloads-302765846.html | New Data from Ashby Reveals Surge in Applications... | 2026-05-07 |
| S6 | https://www.ashbyhq.com/talent-trends-report/reports/referrals | Ashby Talent Trends: Are referred candidates more likely to get hired? | 2025-05-16 |
| S7 | https://www.greenhouse.com/newsroom/an-ai-trust-crisis-70-of-hiring-managers-trust-ai-to-make-faster-and-better-hiring-decisions-only-8-of-job-seekers-call-it-fair | Greenhouse 2025 AI in Hiring Report press release | 2025-11-19 |
| S8 | https://www.gartner.com/en/newsroom/press-releases/2025-07-31-gartner-survey-shows-just-26-percent-of-job-applicants-trust-ai-will-fairly-evaluate-them | Gartner Survey Shows Just 26% of Job Applicants Trust AI Will Fairly Evaluate Them | 2025-07-31 |
| S9 | https://static1.squarespace.com/static/6197797102be715f55c0e0a1/t/65cc355c4935cb001349a4cd/1707881822922/Skills-Based+Hiring+02122024+vF.pdf | Skills-Based Hiring: The Long Road from Pronouncements to Practice (Burning Glass Institute + HBS) | 2024-02 |
| S10 | https://www.testgorilla.com/skills-based-hiring/state-of-skills-based-hiring-2025/ | TestGorilla: The State of Skills-Based Hiring 2025 | 2025 (survey Apr 2025) |
| S11 | https://coderpad.io/wp-content/uploads/2026/02/coderpad-state-of-tech-hiring-2026.pdf | CoderPad State of Tech Hiring 2026 | 2026-02 |
| S12 | https://coderpad.io/survey-reports/coderpad-and-codingame-state-of-tech-hiring-2025/ | CoderPad and CodinGame State of Tech Hiring 2025 | 2025-01-08 |
| S13 | https://survey.stackoverflow.co/2025/developers | Stack Overflow Developer Survey 2025 — Developers | 2025 |
| S14 | https://business.linkedin.com/talent-solutions/resources/future-of-recruiting | LinkedIn: The Future of Recruiting 2025 | 2024-12/2025 |
| S15 | https://storage.ghost.io/c/c4/11/c411a266-b4d6-4bc8-bcc8-ab945413262a/content/files/2025/09/Canaries_BrynjolfssonChandarChen.pdf | Canaries in the Coal Mine? Six Facts about the Recent Employment Effects of AI (Stanford DEL); dashboard: https://digitaleconomy.stanford.edu/project/indicators/canaries-dashboard/ (updated 2026-09-23) | 2025-08-26 |
| S16 | https://hiringlab.indeed.com/2026/07/23/the-labor-market-is-tilting-toward-seniority/ | Indeed Hiring Lab: The Labor Market Is Tilting Toward Seniority | 2026-07-23 |
| S17 | https://newsletter.pragmaticengineer.com/p/tech-jobs-market-2025-part-3 | Pragmatic Engineer: Tech jobs market 2025, part 3: job seekers' stories | 2025-11 |
| S18 | https://wp-insights.s3.eu-central-1.amazonaws.com/wp-content/uploads/2026/01/15073644/Rynek-pracy-IT-w-Polsce-20252026-No-Fluff-Jobs.pdf | No Fluff Jobs: Rynek pracy IT 2025/2026 | 2026-01 |
| S19 | https://wp-insights.s3.eu-central-1.amazonaws.com/wp-content/uploads/2025/01/10075004/Rynek-pracy-IT-w-Polsce-w-2024-roku-No-Fluff-Jobs.pdf | No Fluff Jobs: Rynek pracy IT 2024/2025 | 2025-01 |
| S20 | https://nofluffjobs.com/insights/kariera-w-it/ | No Fluff Jobs: Kariera w IT 2026. Przewodnik po rynku pracy | 2026 (mid-year) |
| S21 | https://justjoin.it/blog/rynek-it-w-polsce-2025-stabilizacja-i-koniec-kryzysu-raport | Just Join IT: Rynek IT w Polsce 2025: Stabilizacja i koniec kryzysu? | 2026-01-23 |
| S22 | https://media.pracuj.pl/445635-rynek-pracy-it-w-polsce-w-2025-roku-wyczekiwane-odbicie-i-popyt-na-seniorow | Pracuj.pl: Rynek pracy IT w Polsce w 2025 roku | 2026-02-05 |
| S23 | https://telix.pl/rynek/raporty-prezentacje/2026/09/ai-nie-zabrala-pracy-w-it-ale-zmienia-rynek-od-srodka-premierowe-dane-theprotocol-it/ | AI nie zabrała pracy w IT... (theprotocol.it H1 2026 data) | 2026-09-30 |
| S24 | https://bulldogjob.com/it-report/2025/programmer | Bulldogjob: Badanie Społeczności IT 2025 — Programiści | 2025 (survey Jan–Feb 2025) |
| S25 | https://nexttechnology.io/english-in-it-how-do-polish-programmers-cope/ | English in IT: language skills of Polish programmers (Next Technology) | 2025-06-17 |
| S26 | https://news.ycombinator.com/item?id=41656015 | Ask HN: Did your personal website help you get hired? | 2024-09-26 |
| S27 | https://news.ycombinator.com/item?id=39974079 | Ask HN: How important is a public GitHub repo for job applications in 2024? | 2024-04-08 |
| S28 | https://news.ycombinator.com/item?id=14420802 | Ask HN: What portfolio items are most impressive to you when hiring developers? (old) | 2017-05-25 |
| S29 | https://www.reddit.com/r/ExperiencedDevs/comments/pmt5lj/does_anyone_else_think_portfolio_sites_are/ | Does anyone else think portfolio sites are overrated? (old) | 2021-09-12 |
| S30 | https://www.reddit.com/r/ExperiencedDevs/comments/1th549f/seniortech_leads_do_you_actually_have_public/ | Senior/Tech Leads: do you actually have public portfolios/side projects? | 2026-05-18 |
| S31 | https://www.reddit.com/r/ExperiencedDevs/comments/1v9h8vf/portfolio_site_to_talk_about_projects_in_my/ | "Portfolio site" to talk about projects in my career in more detail than a resume? | 2026-07-29 |
| S32 | https://www.reddit.com/r/cscareerquestions/comments/1rkph59/hiring_manager_perspective_hiring_is_the_most/ | Hiring manager perspective: hiring is the most broken I've ever seen | 2026-03-04 |
| S33 | https://www.reddit.com/r/cscareerquestions/comments/1t4gswl/employers_be_honest_does_a_portfolio_matter_2026/ | Employers, be honest: Does a portfolio matter? (2026 edition) | 2026-05-05 |
| S34 | https://www.reddit.com/r/webdev/comments/1sf7jrm/what_do_hiring_managers_look_for_in_portfolio/ | What do hiring managers look for in portfolio websites? | 2026-04-07 |
| S35 | https://www.reddit.com/r/webdev/comments/1pho6pl/simple_portfolios_are_they_bad/ | Simple portfolios? Are they bad? | 2025-12-08 |
| S36 | https://www.reddit.com/r/cscareerquestions/comments/1btmeqx/are_recruiters_even_looking_at_my_github_or/ | Are recruiters even looking at my GitHub or portfolio website? | 2024-04-02 |
| S37 | https://www.reddit.com/r/cscareerquestions/comments/1fafofh/how_valuable_are_certificates_for_things_like/ | How valuable are certificates for things like Udemy, Coursera...? | 2024-09-06 |
| S38 | https://www.dice.com/career-advice/certifications-get-you-the-interview.-portfolios-get-you-the-job | Dice: Certifications Get You the Interview. Portfolios Get You the Job. | 2026-09-16 |
| S39 | https://thefwa.com/jobs/mid-level-webgl-developer | Active Theory — Mid-Level WebGL Developer (FWA jobs) (old) | 2020-10-23 |
| S40 | https://weworkremotely.com/remote-jobs/vercel-design-engineer | Vercel — Design Engineer (AI Gateway) | ~2026-10-01 ("posted 4 days ago") |
| S41 | https://www.hontran.dev/blog/how-to-hire-a-creative-developer | How to Hire a Creative Developer (What to Look For) — Hon Tran | 2026-06-27 |
| S42 | https://medium.com/@bruno_simon/bruno-simon-portfolio-case-study-960402cc259b | Bruno Simon — Portfolio (case study) (old) | 2019-11-13 |
| S43 | https://www.prnewswire.com/news-releases/more-than-half-of-employers-have-found-content-on-social-media-that-caused-them-not-to-hire-a-candidate-according-to-recent-careerbuilder-survey-300694437.html | CareerBuilder social media screening survey (old) | 2018-08-09 |
| S44 | https://nofluffjobs.com/insights/raport-kompetencje-w-it/ | No Fluff Jobs + SWPS: Kompetencje w IT. Perspektywy kandydatów, specjalistów i rekruterów | undated (c.2022) |
| S45 | https://justjoin.it/job-offers/all-locations?keyword=three.js (also webgl, react, typescript, next.js, blank) | Just Join IT offer counts — [measured] via Playwright | measured 2026-10-05 |
| S46 | https://www.awwwards.com/jobs/ | Awwwards Jobs board ("24 job opportunities") — [measured] via Playwright | measured 2026-10-05 |
| S47 | https://www.nngroup.com/videos/ux-portfolios-hiring/ | NN/g: UX Portfolios: What Hiring Managers Look For (200+ HMs; design field, adjacent) (old) | 2020-08-21 |
| S48 | https://news.ycombinator.com/item?id=45073589 | Tell HN: My advice after I applied to 450 positions before getting hired | 2025-08-30 |
| S49 | https://analytics.explodingtopics.com/website/linkedin.com | linkedin.com traffic analytics (Semrush) — device split from search snippet, weak | 2026-08 |
| S50 | https://ux.stackexchange.com/questions/92148/contact-form-or-mailto-for-portfolio | UX Stack Exchange: Contact form or mailto for Portfolio? (old) | 2016-03-31 |
| S51 | https://splitforms.com/blog/best-contact-form-for-portfolios | Portfolio Contact Form & Page (vendor claim that forms beat mailto — unverified) | 2026-09 |

Not covered: no primary data on recruiter devices (only weak web-traffic estimates); the Ladders 2018 PDF itself (403) and gated NFJ recruiter-survey PDFs; current hiring criteria from Lusion, Immersive Garden, Locomotive and Resn beyond job-ad snippets; LinkedIn Economic Graph skills-first reports; Germany/UK-specific EU remote data; testimonial effectiveness; A/B data on contact forms vs mailto vs Calendly for candidate sites.
