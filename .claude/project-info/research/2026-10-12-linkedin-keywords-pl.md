# LinkedIn keywords for the Polish market (junior/mid full-stack, Tricity)

Summary: lead with **Full Stack Developer** plus TypeScript / React / Node.js / Next.js in English. Put titles in the Experience
section and skills in the Skills section, because LinkedIn Recruiter filters read those fields. Add a Polish secondary profile.
Expect about 5% junior ads and about 47 applicants per junior ad (146 for junior frontend).

Accessed 2026-10-12 · Method: live filter counts on justjoin.it and LinkedIn guest job search (both signed out,
2026-10-12); market reports through their press coverage. NoFluffJobs, pracuj.pl and theprotocol.it block automated
fetches (403), so their numbers come from published reports only. **Caveats:** justjoin.it keyword search is loose, so
treat its counts as indicative; category and filter counts are firmer. LinkedIn job counts also use loose matching.

## Keywords to use

| Keyword (where) | Why | Evidence (2026-10-12 unless noted) |
|---|---|---|
| **Full Stack Developer** (headline + Experience title; also write "Fullstack" once in About) | Most common junior/mid title for this stack in Tricity; less crowded than frontend | 17 of 36 junior+mid JS ads in Tricity on justjoin.it have Full Stack/Fullstack/Full-Stack in the title, against 10 with Frontend. LinkedIn: 4,000+ in Poland, 260 in Gdańsk. NFJ: competition fell most in Fullstack in 2025 |
| **Software Engineer** (headline alternative / About) | Large corporates in Tricity post junior roles under this title | Junior roles in Gdańsk on LinkedIn: "Junior Software Engineer" (State Street, Kidde, ABCloudz), "Associate Fullstack Software Engineer" (Boeing). 293 results for "Junior Software Engineer" in Gdańsk |
| **TypeScript** | Most frequent skill in JS ads | 475 of 694 JS ads (68%) |
| **React** / React.js | Core frontend keyword | 376 of 694 JS ads (54%); 1,416 ads across all categories |
| **Node.js** | Turns "frontend" into "full stack" in recruiter strings | 309 of 694 (45%) |
| **REST API**, **Git** | Basic requirements that juniors leave out | 229 (33%) and 224 (32%) of 694. Link Group's junior React ad requires Git |
| **Next.js** | Growing, often listed with React | 168 of 694 (24%) |
| **PostgreSQL** / SQL | He has it through Supabase. SQL is the #2 technology across all IT ads | 152 of 694 (22%). NFJ: SQL is in 20.3% of all ads in H1 2026 |
| **React Native** (+ Expo) | Mobile-capable full stack is rarer | 63 mobile ads on justjoin.it; 799 LinkedIn results in Poland |
| **Playwright**, **Vitest** (if he lists testing) | Testing shows up in mid ads; his own repo uses both | 65 and 42 of 694 (Jest: 157) |
| **Accessibility / WCAG** | Evidenced on his own site (axe, Lighthouse) | 81 of 694 |
| **Tailwind CSS** | Smaller but real | 48 of 694 |
| **English** (Languages section, with level) | Recruiter has a Spoken-languages filter; most JS ads need English | English is required in 409 of 694 JS ads, Polish in 170 |
| **Gdańsk / Trójmiasto + Remote, Hybrid** (location + Open to Work) | Recruiter's Workplace-types filter returns Open to Work members only | Tricity IT ads +119% YoY (NFJ, end of Q3 2026). Tricity junior+mid JS: 26 remote, 9 hybrid, 1 office |
| Supabase, Astro, three.js, Expo (Skills/About only, not the headline) | Proof of range, but almost nobody searches them | Ads mentioning each: 0, 0, 8, 1 |

## 1. Job titles

- **English titles dominate.** A LinkedIn search for "Programista JavaScript" in Poland returned 60 of 60 titles in English.
  Polish forms ("Programista Frontend", "Młodszy programista", "Programista/-ka Full-stack", "Inżynier ds.
  oprogramowania") appeared in about 1 of 25 to 4 of 25 visible titles. Most come from Polish banks, public bodies and
  local firms. On justjoin.it, "programista" matches 335 ads across all categories.
- **Seniority split (justjoin.it, JavaScript category, all of Poland):** 694 ads; Junior 30 (4.3%), Mid 270, Senior 343.
  Tricity: 97 JS ads in total; the junior+mid filter returns 36 (5 junior, 31 mid). The visible junior titles are
  "Front-End Trainee" (EPAM), "Frontend / JavaScript Developer (Junior)", "Junior React Developer", "Junior Angular
  Developer" and "Junior Frontend Developer z j. niemieckim".
- **Mid titles in Tricity** are mostly full stack: "FullStack Developer (React + Node.js)", "Fullstack Developer
  TypeScript/React", "Full-Stack TypeScript Developer", "Regular Fullstack Developer - React & Python". The rest are
  "Frontend Developer", "Mobile React Native Developer" and "Mid Node.JS Developer".
- **Level words:** "Junior", "Regular" (= mid), "Mid", "Middle", "Medior", "Associate", "Trainee", "Intern" / "Stażysta".
  Of 60 visible LinkedIn "Full Stack Developer" ads in Gdańsk, 27 named a level, mostly Senior. Only 3 were "Junior" and 2
  "Associate".

## 2. Requested skills

Share of the 694 justjoin.it JavaScript ads that mention each keyword: TypeScript 68%, React 54%, Node.js 45%, REST API 33%,
Angular 33%, Git 32%, Docker 29%, AWS 27%, Next.js 24%, Jest 23%, PostgreSQL 22%, React Native 12%, Playwright 9%,
GraphQL 7%, Tailwind 7%, Vitest 6%. (The CI/CD count matched Node.js exactly, so it looks like a search error and is not
used.) Across all IT ads, NFJ puts Python at 21.6%, SQL at 20.3% and Java at 16.1% (H1 2026). Docker, Kubernetes and
React also rank high.

- **In demand and his:** TypeScript, React, Node.js, Next.js, PostgreSQL (Supabase), React Native, Tailwind.
- **Common keywords he has but may not list** (check each before adding): JavaScript, HTML/CSS, REST API, Git, SQL,
  Playwright and Vitest (both in this repo), accessibility/WCAG, i18n (Lingui), Expo, Vercel, monorepo/Turborepo.
- **Common keywords not in his stated stack** (do not add unless real): Docker, AWS, Jest, Angular, GraphQL, CI/CD.

## 3. How recruiters search

- **LinkedIn Recruiter reads specific fields** (official definitions):
  - The Job titles filter reads titles in the **Experience** section (current, past or both), not the headline.
  - The Skills filter reads the **Skills** section.
  - Years of experience is counted from the start date of the **earliest position**.
  - Seniority is derived from the **current job title**.
  - Spoken languages come from the **Languages** section.
  - The Keywords field runs Boolean over the whole profile.
  - Workplace types returns **Open to Work members only**.
- **Boolean:** AND/OR/NOT in capitals, quotes and parentheses work in the Job titles, Skills and Keywords fields.
  LinkedIn's own example is `("developer" OR "programmer" OR "engineer") AND ("java" OR "C++") NOT ("intern" OR "junior")`.
  "Junior" or "Intern" in a current title can drop him from mid-level searches. Keep titles truthful. Where it is honest, a
  neutral current title (e.g. the freelance role as "Full Stack Developer") avoids that filter. Keep the internship listed
  as an internship.
- **Language:** a Tricity sourcing role (Link Group, Gdynia) asks for "LinkedIn Recruiter, Boolean, X-Ray, GitHub" and
  talking to candidates "in English and Polish". Given the ad titles above, search strings are mainly English.
- **Polish secondary profile:** viewers see the profile in the language of their LinkedIn interface. LinkedIn says that
  "having multiple language profiles makes it easier for other members and recruiters to find you". It is desktop-only and
  translated by hand. Worth having, with the headline as "Programista Full-stack (React, TypeScript, Node.js)". Not
  verified: how much it changes search ranking.
- **Developer side (Super Source Me, 2023):** 25.5% of developers never open InMail, and over half are irritated when the
  recruiter clearly has not read their profile.

## 4. Junior market 2025-2026

- **Junior share of ads:** NFJ 5.3% in 2025 (15% in 2022), senior about 60%, mid about 35%. justjoin.it 4.79% in 2025; 5%
  in Q1 2026 (mid 38%, senior 55%). Live JS category today: 4.3%.
- **Competition:** NFJ "Kariera w IT 2026" (January to May): **47 applications per junior ad**, against 24 for mid and 19
  for senior. **Junior frontend: 146.** Frontend fell to about 3.3% of ads (about 5% in 2024). For all levels in 2025,
  frontend averaged 78 CVs per ad (149 a year earlier).
- **Volume is rising:** NFJ ads +44% in 2025 and about +70% in January to May 2026. justjoin.it +116% in Q1 2026.
  Tricity +119% YoY.
- **Junior pay** (justjoin.it, May 2026): UoP 6-10k PLN gross, B2B 7-14k net; junior frontend about 6-9.6k gross.
- **What stands out:**
  - One finished project beats ten unfinished ones.
  - Repositories need READMEs and should solve real problems.
  - Small open-source pull requests count; internships are "especially valuable".
  - Use AI assistants, but verify their code (justjoin.it).
  - Practical portfolio and business understanding (NFJ via ITwiz).
  - Junior ads still ask for about a year of hands-on work: "At least 1 year of practical experience… ReactJS" (Link
    Group); "At least 1 year of hands-on experience with React Native", "Interest in OSS", English B2 (The Widlarz Group).
  - Apps shipped to the stores answer exactly that requirement, so state them as outcomes.

## 5. Contract and work-mode terms to mirror

- **B2B:** 58% of IT ads (justjoin.it, Q1 2026); 615 of 694 JS ads list B2B and 189 list "Permanent" (= UoP). NFJ: about
  72% of mid and senior ads offer B2B, but junior ads offering B2B fell from 52.5% to 37.9%, so juniors are more often hired
  on UoP.
- **Terms ads use:** "B2B", "UoP" / "umowa o pracę", "praca zdalna" / "zdalnie", "praca hybrydowa" / "hybrydowo",
  "stacjonarnie", "widełki" (salary range), "netto + VAT" (B2B), "brutto" (UoP), "(k/m)" (gender-neutral title).
- **Pay transparency:** the Labour Code amendment took effect on 2025-12-24 and requires pay information in the ad or
  before the interview. 54.4% of justjoin.it IT ads show a range (Q1 2026).
- **Profile line:** "Open to: full-time · B2B or UoP · remote or hybrid · Trójmiasto (Gdańsk/Gdynia/Sopot)". Set the same
  values in Open to Work (job types, workplace, locations).

## Sources (all accessed 2026-10-12)

- justjoin.it live listings: [JavaScript, all Poland](https://justjoin.it/job-offers/all-locations/javascript),
  [junior](https://justjoin.it/job-offers/all-locations/javascript?experience-level=junior),
  [mid](https://justjoin.it/job-offers/all-locations/javascript?experience-level=mid),
  [Trójmiasto](https://justjoin.it/job-offers/trojmiasto/javascript),
  [Trójmiasto junior+mid](https://justjoin.it/job-offers/trojmiasto/javascript?experience-level=junior,mid),
  [mobile + React Native](https://justjoin.it/job-offers/all-locations/mobile?keyword=react%20native); the keyword
  counts use `?keyword=<term>` on the JavaScript category
- LinkedIn guest job search: [Full Stack Developer, Gdańsk](https://www.linkedin.com/jobs/search?keywords=Full%20Stack%20Developer&location=Gda%C5%84sk%2C%20Pomorskie%2C%20Poland),
  [Junior Software Engineer, Gdańsk](https://www.linkedin.com/jobs/search?keywords=Junior%20Software%20Engineer&location=Gda%C5%84sk%2C%20Pomorskie%2C%20Poland),
  [React, Gdańsk](https://www.linkedin.com/jobs/search?keywords=React&location=Gda%C5%84sk%2C%20Pomorskie%2C%20Poland),
  [React Native, Poland](https://www.linkedin.com/jobs/search?keywords=React%20Native&location=Poland),
  [Programista JavaScript, Poland](https://www.linkedin.com/jobs/search?keywords=Programista%20JavaScript&location=Poland)
- LinkedIn Help: [Recruiter search filters and definitions](https://www.linkedin.com/help/recruiter/answer/a414428),
  [Boolean in Recruiter](https://www.linkedin.com/help/recruiter/answer/a415295),
  [Profile in another language](https://www.linkedin.com/help/linkedin/answer/1717)
- No Fluff Jobs "Rynek pracy w IT 2025/2026" via [Antyweb, 2026-01-15](https://antyweb.pl/rynek-pracy-w-it-2026) and
  [ITwiz, 2026-02-10](https://itwiz.pl/dlaczego-juniorzy-znikaja-z-rynku-pracy-it/)
- No Fluff Jobs "Kariera w IT 2026" via [Antyweb, 2026-07-03](https://antyweb.pl/rynek-pracy-it-2026)
- No Fluff Jobs Q3 2026 cities via [Money.pl, 2026-09-23](https://www.money.pl/biznes/branza-it-odzywa-zarobki-siegaja-nawet-32-tys-zl-7332473487448320a.html)
- justjoin.it / rocketjobs.pl Barometr Q1 2026 via [ITwiz, 2026-04-10](https://itwiz.pl/rynek-pracy-przyspiesza-i-bezlitosnie-podnosi-poprzeczke/)
  and [Antyweb, 2026-04-10](https://antyweb.pl/rynek-pracy-it-juniorzy)
- [justjoin.it blog: Junior Developer, first job (2026-05-27)](https://justjoin.it/blog/junior-developer-jak-zdobyc-pierwsza-prace-w-it)
- Junior ads: [Link Group Junior React Developer](https://justjoin.it/job-offer/link-group-junior-react-developer-krakow-javascript-6b343447),
  [The Widlarz Group Junior React Native (expired)](https://justjoin.it/job-offer/the-widlarz-group-junior-react-native-developer-community-support-krakow-mobile),
  [Jit Team Junior Front-End, Gdynia (expired)](https://justjoin.it/job-offer/jit-team-junior-front-end-developer-gdynia-javascript)
- [Link Group IT Sourcing Consultant, Gdynia (archived ad)](https://rocketjobs.pl/oferta-pracy/link-group-it-sourcing-consultant-gdynia-hr-recruitment)
- [Super Source Me 2023 developer survey via Element newsletter](https://maciejm.substack.com/p/badanie-programistow-2023-komunikacja)
- [Spider's Web on theprotocol.it, 2026-06-13](https://spidersweb.pl/2026/06/pracodawcy-nowoczesny-jobboard-it-widelki-ai.html)
