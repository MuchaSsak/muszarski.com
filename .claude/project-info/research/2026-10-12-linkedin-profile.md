# LinkedIn for a junior/mid full-stack dev in Tricity: a standard title, a true location, skills tied to real work, Open to Work and a complete profile do most of the work; posting is proof of work, Premium is unproven

Accessed 2026-10-12 · web research only (about 60 searches and fetches, LinkedIn primary sources first; no browser, no account).
Labels: **[LI]** LinkedIn-confirmed (Help, Engineering, Talent blog, newsroom, product pages) · **[study]** dataset or experiment
with a stated n · **[analyst]** third-party observation or vendor data · **[opinion]**. **Old** = data from before 2023.
LinkedIn's own uplift numbers are self-reported and unaudited, even when labelled [LI].

**Starting point** (`2026-10-11-serp-baseline.md`): his LinkedIn is the #1 Google result for his name. Its snippet still reads
"Student at Technikum nr 1…", location Starogard Gdański, 8 connections, and the photo is a sunglasses selfie.

## Rules we can act on

1. **Put "Full-Stack Developer" first, in the headline AND the current Experience title.** Recruiter's title filter reads
   Experience titles. Its 2026 semantic search front-loads title, seniority and location. [LI] The weights are not published.
2. **Headline = title · 3–5 stack keywords · one proof, with the key words in the first ~60 characters (limit 220).** The
   headline is also a feed-ranking input for his posts. [LI for the feed input; analyst for the truncation point]
3. **Turn on Open to Work.** Visibility: "Recruiters only" if a current employer shouldn't see it, otherwise the public frame.
   Titles: Full-Stack / Frontend / React / Node.js Developer, Software Engineer. Locations: Gdańsk, Gdynia, Sopot + remote,
   remote + hybrid. Employment types: full-time + contract (B2B). Open to Work members answer InMails 37% more often
   (2021–22). [LI]
4. **Set a true, specific location (city, Pomorskie).** Location is a named ranking factor. Nobody confirms whether a Tricity
   search reaches Starogard Gdański, so this is the owner's call. [LI mechanism; unverified radius]
5. **Pin 5 top skills in About, tie every skill to a role or project, and list only skills he can defend (cap 100).** About half
   of LinkedIn recruiters search with skills data (2026). [LI]
6. **Write About and every Experience description in job-ad words (React, Next.js, Node.js, TypeScript, PostgreSQL, Expo), no
   stuffing.** Keyword search reads the whole profile, semantic search embeds the text, and skills are extracted from it. [LI;
   density rules = opinion]
7. **Complete the profile: a clear headshot, an About of 1,000+ characters, a description on every role, 300+ relevant
   connections.** Complete profiles got 13.5% callbacks vs 7.9% with no LinkedIn. A bare-bones profile did worse than none
   (7.2%). [study, vendor-run, US, 2018–19]
8. **Featured: muszarski.com, the PstrykWeb case study, the CV PDF, GitHub. Add Projects with skills tagged** (Recruiter shows
   them next to the skills). [LI feature; no measured effect]
9. **Follow 10–20 target companies, engage with their posts, and press "I'm interested" on their career pages.** This feeds the
   Recruiter Spotlights, which LinkedIn says lift InMail responses by up to 20%. [LI]
10. **Answer every recruiter InMail within days, even with "no thanks".** Ranking is trained on accepted InMails, and LinkedIn
    turns Open to Work off for members who stop responding. [LI]
11. **Post 1–2 times a week about his own work (case studies, build notes, releases) in native formats. No engagement bait, pods
    or AI comment tools.** LinkedIn demotes bait and automation (Mar 2026). [LI; cadence and format = analyst]
12. **An occasional blog link from a personal profile is fine; lead with native content.** LinkedIn has never confirmed a link
    penalty. Analysts measure 25–36% less reach on link posts, mostly on company pages. [analyst]
13. **Experience: the real title plus its standard equivalent ("Full-Stack Developer Intern"), the employment type set, the
    company page linked.** [analyst/opinion]
14. **Leave short unrelated gigs (e.g. a 2-month courier contract) off, or give them one line with no description.** They add no
    searchable title and can skew "years of experience". [indirect study + analyst + opinion]
15. **Keep English as the primary profile; a Polish secondary profile is optional and low priority.** Nobody confirms that
    Recruiter keyword search reads it. [LI generic; unverified]
16. **Use a custom URL like `/in/mateusz-muszarski`, with the same name and photo as the site, CV and GitHub.** If the URL
    changes, update the site's `sameAs`, the CV and GitHub. [opinion]
17. **Don't buy Premium to get hired; at most use a free trial during an application sprint.** The only evidence is LinkedIn's own
    "2.7× more likely to get hired" (Jan 2022 data), which has obvious selection bias. [LI claim, unverified]

## 1. How Recruiter search ranks candidates

- **2019 [LI, old].** Recruiter first retrieves candidates who match, then an ML model ranks them on:
  - experience and skills fit, location, and the chance the candidate responds;
  - target: the share of top-k candidates who accepted an InMail;
  - titles expanded to similar ones, and skills embedded (S1).
- **2024–26 [LI].**
  - Natural-language "AI-assisted search" launched in Oct 2024; LinkedIn reports +18% InMail acceptance (S3b).
  - Hiring Assistant became generally available in English in Sep 2025 (S34).
  - The June 2026 engineering post (S2): profile embeddings come from "profile/resume text and structured attributes".
    Title, seniority and location are the most consistent signals, and the model front-loads them.
  - The relevance labels score title, seniority, industry, hard skills and education. A ranker with 100+ features sits on top,
    and the embeddings are its strongest features.
  - *Reading:* free text now counts, but a standard title and location still dominate.
- **Filters [analyst; old LinkedIn doc].** Keywords search the whole profile, the Skills filter only the Skills section, and the
  Job-title filter Experience titles (current/past). Titles are standardised ("software eng" → "software engineer").
- **Spotlights [LI].** "Smart search filters that identify talent most likely to respond."
  - 2017: Spotlight users got +64% InMail responses (S4, old).
  - Today: "Open to work" and "likelihood-of-interest indicators" such as "Interested in your company", up to +20% (S3).
  - Other Spotlight names (talent-brand engagement, rediscovered candidates, company connections, active talent) come only from
    third parties [analyst].
  - No LinkedIn source names "recently active" as a ranking feature; the respond-likelihood objective rewards members who reply
    [inference].
- **Open to Work [LI].**
  - +37% InMail response (data May 2021–Apr 2022, S5).
  - The public frame: +40% InMails (2020, old).
  - Turning it on: 2× recruiter messages (via CNBC, Apr 2024).
  - About 40M public frames vs 200M recruiters-only settings (Jul 2024, S8).
  - LinkedIn hides recruiters-only status from Recruiter users at the current employer but "can't guarantee complete privacy".
    When shared, only locations and location types are visible; employment types stay private (S6, S7).
- **Stigma.** Recruiters are split (opinion). interviewing.io: Open to Work engineers passed interviews 44% of the time in 2021
  (vs ~51% average) but 56% in 2023 [study, platform sample]. No data links Open to Work to hires.

## 2. Headline

- **Length.** The limit is 220 characters (LinkedIn Help page not retrieved). About 60–70 characters show in search and
  comments, and about 120 on the mobile card. Sources disagree on these cut-offs [analyst].
- **Pattern.** `Full-Stack Developer | React · Next.js · Node.js · TypeScript | <one proof>`.
  - Title and location dominate matching (S2).
  - The headline is a cold-start and post feature in the feed (S20).
  - Creative titles miss the title taxonomy [analyst].
  - Separators: no evidence either way [opinion].
  - This matches `2026-10-05-software-house-hiring.md`.

## 3. About

- **Length.** Up to 2,600 characters, and about 230 (mobile) to 370 (desktop) show before "see more" [analyst].
- **First two lines.** Role, stack, one proof, and availability (B2B or UoP, remote or hybrid Tricity) [opinion].
- **What the evidence says.** The ResumeGo "complete" profiles had a summary of 1,000+ characters [study]. LinkedIn extracts
  skills from the summary text (S13) [LI].
- **What it doesn't.** There is no keyword-density evidence. Boolean search needs a word once, and semantic search makes
  repetition pointless [inference].
- **Voice and links.** First person and a call to action are guide consensus [opinion]. Clickable links belong in Featured and
  Contact info.

## 4. Skills

- **Limits [LI].** Up to 100 skills, each ticked to roles (S11). Up to 5 "top skills" in About, plus skills on Projects and
  credentials (Aug 2023, S12).
- **Assessments.** Skill Assessments are retired, and their badges were removed in 2024 (S16).
- **Verified AI-tool skills.** Launched 26 Jan 2026 with Descript, Lovable, Relay.app and Replit; GitHub is "coming". No
  recruiter filter is documented (S17) [LI].
- **Endorsements.** No current evidence they affect ranking. "≥5 skills = 17× views" dates from c. 2016 [LI, old].
- **Skills-based hiring [LI].** "Nearly half of recruiters" use skills data (Feb 2026, S14). Skills-based hiring widens talent
  pools 6.1× globally (Mar 2025, from a search snippet; S15).

## 5. Experience entries

- **Titles.** "Full-Stack Developer Intern" beats a bare "Intern" or "Praktykant": the title filter and the inferred seniority
  both read this field [analyst]. Set the employment type (Internship, Contract, Self-employed…; S32) [LI]. Write 3–5 lines per
  role (stack + outcome), attach skills and media, and link the company page [opinion].
- **Short unrelated jobs.** No LinkedIn data.
  - A US audit found underemployed graduates got ~30% fewer callbacks; internships softened that (Nunley et al. 2017, read at
    abstract level) [study]. It looked at graduates' main jobs, not students' side gigs.
  - Recruiter's years-of-experience filter sums all positions, internships included [analyst].
  - So a 2-month courier contract earns its place only if it explains a visible gap [opinion].

## 6. Photo, banner, URL, Featured, Projects, recommendations, certifications

- **Photo.** "Up to 21× more views, 9× more connection requests" (LinkedIn, undated, c. 2017) [LI, old].
- **Banner.** The 2.1× and 14× view claims cannot be traced [analyst]. Size 1584×396; mobile crops it.
- **URL.** No data on custom URLs; today's is `/in/mateusz-muszarski-b1168a28a`.
- **Featured and Projects.** Real features (S36, S12) but no outcome data.
- **Recommendations.** Only small or old polls exist [analyst].
- **Certifications.** "6× more views" is from 2014 (S38), and "All-Star = 40× opportunities" from c. 2016 [old].

## 7. Feed algorithm 2025–26

- **Confirmed by LinkedIn:**
  - **March 2026 rebuild (S20).** Posts are retrieved with LLM embeddings of the member's profile (industry, experience,
    skills, geography, headline) and the post text. A "Generative Recommender" then reads 1,000+ past interactions in order.
    It predicts click, skip, long-dwell, like, comment and share. Post features include the format and the author's headline.
  - **Content policy (S21, 12 Mar 2026).** Favours "genuine insight, actionable ideas". Cuts engagement bait, mismatched
    videos, recycled or repetitive posts, pods and comment automation.
  - **Help Center (S22).** Identity, content and activity signals; low-quality posts are limited.
  - **Dwell time (2020, S23).** A predicted "skip" lowers the score.
  - **"360Brew" (S24).** It is a 150B *research, pre-production* model from a Jan 2025 arXiv paper whose versions are all
    withdrawn. LinkedIn has not said the feed runs on it; analysts use the name loosely.
- **Analyst observations:**
  - **Reach.** Down roughly 47–50% in 2025 (van der Blom via summaries, S28).
  - **Link posts.** −26.5% (Ordinal) and −36% median (LinkPost). Ordinal sees almost no penalty on personal profiles (S27).
  - **Frequency.** Buffer (2M posts, 94k accounts, each account compared with itself): 2–5 posts a week gave +1,182
    impressions per post vs once a week. Correlational (S25).
  - **Formats.** Socialinsider (company pages only, 2025, S26): engagement rate is highest for documents (7.0%), then
    multi-image (6.45%), video (6.0%), and lowest for links (3.25%). Video views fell 36% year on year.
- **Developer plan [opinion].**
  - 1–2 posts a week on the profile's own topics.
  - Each post a native screen recording, an image, or a PDF case-study "document".
  - Test the blog link in the post against the link in the first comment.
  - Comment on target companies' posts.

## 8. Polish secondary profile

- **What LinkedIn says (S18) [LI].** Profiles in several languages make it "easier for other members and recruiters to find you".
  Translation is manual, the feature is desktop-only, and viewers see the version in their interface language. The page was
  updated about 3 years ago.
- **What is unclear.** Recruiter has a "profile language" filter (Boolean Strings, Oct 2022, S19) [analyst]. Nobody confirms that
  keyword search matches secondary-profile text.
- **Recommendation.** Polish IT ads use English titles, so keep English as the primary profile. A Polish copy ("Programista
  Full-Stack") is cheap insurance but has to be kept in sync [opinion].

## 9. Premium Career

- **LinkedIn's claims (S29).** "2.7× more likely to get hired" (Jan 2022 data); "2× more likely to receive a message back from a
  recruiter" on Top Choice jobs (June 2026); "11× more connections" (July 2026).
- **Evidence.** No methodology is given, self-selection explains a lot, and no independent study was found.

## 10. Applied on 2026-10-12

Every saved text was compared with its source in the page (JS `includes`), not by eye. The facts come from
`apps/web/src/data/cv.ts`, which is the source of truth for LinkedIn [owner].

- **Done:** the 3 visibility settings; headline; About (1,680 chars); industry Software Development; top 5 skills; Experience
  (Cetuspro, Freelance since 2022, Neoteric with year only); Education (degree, field, activities, description); English
  (full professional); 6 certifications with working credential links; Projects (Linkoglot, PstrykWeb with Cetuspro, the
  portfolio, yws.lu with its case study link); contact info (muszarski.com as Portfolio, GitHub).
- **Done in the second pass:** 11 skills added under LinkedIn's own names, each tied to the project that proves it (Tailwind
  CSS, Astro, Expo.io, Playwright Test, Vitest, GreenSock Animation Platform (GSAP), React Three Fiber, Claude Code,
  TanStack Query, Git, REST APIs; plain "Expo" and "Playwright" are not in the list); the 6 courier skills removed (36 left);
  English set to Full professional (`cv.ts`: fluent); Open to Work for recruiters only with 5 titles (Full Stack Engineer,
  Frontend Developer, Javascript Developer, Software Engineer, Mobile Application Developer: LinkedIn maps "Full Stack
  Developer" and "React Developer" onto these), Hybrid + Remote, Poland + Pomorskie, Full-time + Contract, no job alerts;
  Featured: muszarski.com, the yws.lu case study, the build case study (`?ref=linkedin`, thumbnail uploaded from the share card
  after LinkedIn's fetch failed), the Linkoglot post, the CV page; the site-style banner (the old space banner is kept only
  as a screenshot in the session scratchpad).
- **The owner's own steps:** delete the courier role and the primary school, a clear headshot, recommendations, connection
  growth, following target companies, the months for Neoteric and Freelance.

### Editing LinkedIn through Claude in Chrome

- The role form's "Update your profile headline" defaults to the new role and overwrote the headline once: pick the current
  headline every time.
- The `type` action drops characters (credential URLs lost one, education text lost several). Fill text with
  `document.execCommand('insertText')` on the focused field, click Save from JS, then reload and compare.
- A tab behind another tab or window is `hidden`: client-side modals don't open, and after about 5 minutes Chrome throttles its
  timers until forms stop loading. Open forms by URL (`/in/<slug>/edit/forms/project/new/`,
  `/in/<slug>/skills/edit/forms/new/`, `/in/<slug>/edit/forms/contact-info/new/`) and keep the tab in front.
- Company pages share names (three "Neoteric" pages); check the logo and the URL before saving.
- Skills, job titles and Featured links come from LinkedIn's lists and fetches: search the term first and take the exact
  match. A Featured link preview often fails once ("Try again" works); a saved item can still lose its image, and the
  thumbnail pencil takes an upload.
- Always Skip the "share this", "connect with people" and recommendation prompts.

## Not verified / gaps

- The Help pages for Recruiter Spotlights and the headline limit were not retrieved.
- No Polish data on recruiter search language or on Open to Work outcomes.
- The Economic Graph 6.1× figure comes from a snippet; Nunley was read at abstract level.

## Sources (all accessed 2026-10-12)

- S1 LinkedIn Eng, "AI behind LinkedIn Recruiter search and recommendation systems", 2019-04-22: https://www.linkedin.com/blog/engineering/recommendations/ai-behind-linkedin-recruiter-search-and-recommendation-systems
- S2 LinkedIn Eng, "Semantic Search for AI Agents at Scale… Hiring Assistant", 2026-06-11: https://www.linkedin.com/blog/engineering/ai/semantic-search-for-ai-agents-at-scale-retrieval-and-ranking-for-linkedins-hiring-assistant
- S3 LinkedIn Recruiter features page (undated, live): https://business.linkedin.com/hire/recruiter/recruiter-features · S3b AI-assisted search: https://business.linkedin.com/hire/ai-assisted-search-and-projects
- S4 LinkedIn Talent Blog, "The 10 New LinkedIn Recruiting Features…", 2017-12-05: https://www.linkedin.com/business/talent/blog/product-tips/new-linkedin-recruiting-features-you-should-know
- S5 LinkedIn Talent Blog, InMail response data, 2022-05-19: https://www.linkedin.com/business/talent/blog/talent-strategy/these-inmails-get-best-response-rates
- S6 LinkedIn Help 67405, Open to Work: https://www.linkedin.com/help/linkedin/answer/67405 · S7 Help 11783, job preferences: https://www.linkedin.com/help/linkedin/answer/11783
- S8 Fortune, 2024-09-05 (cites LinkedIn's 2020 figure): https://fortune.com/2024/09/05/linkedin-opentowork-badge-recruiters-job-search · CNBC, 2024-04-15: https://www.cnbc.com/amp/2024/04/15/should-you-use-linkedins-open-to-work-banner-experts-disagree.html
- S9 interviewing.io via TechCrunch, 2023-04-03: https://techcrunch.com/2023/04/03/should-you-post-that-youre-opentowork-a-tale-of-two-labor-markets
- S10 Character limits (analyst), 2026: https://www.unilink.us/blog/linkedin-character-limits-2026
- S11 LinkedIn Help a549047, skills: https://www.linkedin.com/help/learning/answer/a549047
- S12 Social Media Today, top skills / Projects, 2023-08-09: https://www.socialmediatoday.com/news/linkedin-adds-new-ways-for-job-seekers-highlight-key-skills-and-competencies/690461/
- S13 LinkedIn Eng, "Extracting skills from content", 2023-12-13: https://www.linkedin.com/blog/engineering/skills-graph/extracting-skills-from-content
- S14 Skills on the Rise 2026 (KATU), 2026-02-24: https://katu.com/news/nation-world/linkedins-skills-on-the-rise-abilities-in-demand-for-todays-jobs-market-linkedin-skills-on-the-rise-2026-fastest-growing-skills-for-us-employees
- S15 LinkedIn Economic Graph, skills-based hiring, 2025-03: https://economicgraph.linkedin.com/content/dam/me/economicgraph/en-us/PDF/skills-based-hiring-march-2025.pdf
- S16 LinkedIn Help a1690529, Skill Assessments retired: https://www.linkedin.com/help/learning/answer/a1690529
- S17 LinkedIn News, verified skills, 2026-01-26: https://news.linkedin.com/2026/Professional_Edge_Skills_Verified
- S18 LinkedIn Help 1717, profile in another language: https://www.linkedin.com/help/linkedin/answer/1717
- S19 Boolean Strings, comparison chart, 2022-10-27: https://booleanstrings.com/?p=210687
- S20 LinkedIn Eng, "Engineering the next generation of LinkedIn's Feed", 2026-03-12: https://www.linkedin.com/blog/engineering/feed/engineering-the-next-generation-of-linkedins-feed
- S21 LinkedIn News, "Improving the Feed", 2026-03-12: https://news.linkedin.com/2026/ImprovingTheFeed
- S22 LinkedIn Help a1339724, "LinkedIn relevance": https://www.linkedin.com/help/linkedin/answer/a1339724
- S23 LinkedIn Eng, feed dwell time, 2020-05-12: https://engineering.linkedin.com/blog/2020/understanding-feed-dwell-time
- S24 360Brew, arXiv 2501.16450 (v1 2025-01-27, withdrawn): https://arxiv.org/abs/2501.16450
- S25 Buffer, posting frequency, 2025-08-28: https://buffer.com/resources/how-often-to-post-on-linkedin/
- S26 Socialinsider, 2026 LinkedIn benchmarks, 2026-03-16: https://www.socialinsider.io/blog/linkedin-benchmark/
- S27 Ordinal, link-penalty study (2026, undated): https://www.tryordinal.com/blog/linkedin-link-penalty-study
- S28 van der Blom 2025 via Contentin, 2025-12-27: https://contentin.io/blog/linkedin-algorithm-2025-why-your-reach-dropped-how-to-win-in-2026/
- S29 LinkedIn Premium Career page (pricing updated 2026-04-20): https://premium.linkedin.com/careers/career
- S30 ResumeGo field experiment, 2018-10 to 2019-03: https://resumego.net/research/linkedin-interview-chances
- S31 Nunley et al., underemployment audit, ILR Review 2017: https://journals.sagepub.com/doi/10.1177/0019793916654686
- S32 LinkedIn Help 123303, employment types: https://www.linkedin.com/help/linkedin/answer/123303
- S33 Leonar, Recruiter years-of-experience behaviour (analyst, 2026): https://www.leonar.app/blog/7-sourcing-techniques-linkedin/
- S34 LinkedIn News, Hiring Assistant global, 2025: https://news.linkedin.com/2025/hiring-assistant-globally-available
- S35 LinkedIn News, AI people search, 2025-11: https://news.linkedin.com/2025/LinkedIn-Introduces-New-AI-Powered-People-Search-Experience-to-Premium-Subscribers-in-the-US
- S36 LinkedIn Help 111587, Featured: https://www.linkedin.com/help/linkedin/answer/111587
- S37 Photo stat (attributed to LinkedIn), Search Engine Journal: https://www.searchenginejournal.com/linkedin-profile-picture-filters/190137/
- S38 LinkedIn Blog, certifications, 2014-11-20: https://blog.linkedin.com/2014/11/20/showcase-your-professional-certifications-on-linkedin-in-one-click
- S39 Career Pages "I'm interested": https://business.linkedin.com/hire/company-career-pages/features
