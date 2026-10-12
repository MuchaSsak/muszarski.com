# Facebook for a junior/mid dev job hunt in Poland: a clean public "business card" (username, the same name and photo, work, city, links), everything personal on Friends, pro mode off so blog links are never capped; Facebook is a side channel, LinkedIn stays the main one

Accessed 2026-10-12 · web research only (about 75 searches and fetches, Meta primary sources first; no browser, no account).
Labels: **[Meta]** Meta-confirmed (Help Center, Transparency Center, newsroom, Meta for Business) · **[study]** dataset or
experiment with a stated n · **[analyst]** third-party observation or vendor data · **[opinion]** · **[law]** statute or
regulator text · **[measured]** measured or observed with this repo's own tooling. **Old** = data from before 2023.
Facebook Help pages render with JavaScript and could not be fetched. Their wording here comes from search-engine excerpts of
those pages and from articles that quote them; each such claim says so.

**Starting point.** The site links the profile in Person `sameAs` and the footer `ELSEWHERE` as a `profile.php?id=…` URL
(no username) (`site/seo.md`, log 2026-10-07). Google already shows a Facebook result titled "Mateusz Muszarski" for the
query "matmuszarski" (`2026-10-11-serp-baseline.md`) [measured]. The cover source is in `research/tools/facebook-cover/`.
What was applied: § 7.

## Rules we can act on

1. **Treat the profile as a public business card, not a second LinkedIn.** Recruiters do look: 70% of US employers research
   candidates on social media (Harris polls, 2018 and Dec 2022), and 62% of 102 Polish recruiters sometimes check
   candidates' profiles, 59.2% of those on Facebook (2023). [study] Polish data-protection guidance says they should, as a
   rule, not use what they find on private profiles, but nothing stops them seeing it. [law]
2. **Public layer: name, the same headshot as LinkedIn and the site, a cover, a one-line intro, Work, Education, Current city
   and links. Everything personal: Friends.** Name, profile photo, cover photo, username and user ID are always public
   anyway. [Meta]
3. **Set a username (Accounts Center > Profiles > the profile > Username), e.g. `mateusz.muszarski` or `muszarski`, then
   replace the `profile.php?id=` URL in `sameAs` / `ELSEWHERE`.** Rules: at least 5 characters, letters, digits and periods
   only; periods and capitals do not make a name different. If Facebook and Instagram profile info are synced, the change can
   also move the Instagram URL, so check the sync first. [Meta]
4. **Intro bio: one line of about 101 characters with role, stack, city and muszarski.com.** Example shape: "Full-stack
   developer · TypeScript, React, Next.js · {city} · muszarski.com". [analyst for the limit; opinion for the copy]
5. **Links: muszarski.com, GitHub and LinkedIn in Contact and basic info, each set to Public.** Each About item has its own
   audience. Facebook publishes no cap on the number of links; three is enough. [Meta for per-item audience; analyst for the
   cap]
6. **Keep pro mode off.** Meta's link-cap test (two link posts a month without a paid plan; started Dec 2025, wider since
   Sep 2026) covers pro-mode profiles and Pages. No report includes regular profiles. Pro mode's gains (public followers,
   insights) do little for a job hunt. Turn it on only if being followed by non-friends becomes a goal, and then watch the
   composer for a link counter. [Meta for the scope; opinion for the choice]
7. **Leave "search engines outside of Facebook may link to your profile" on.** The profile is already in Google for
   "matmuszarski". Meta cannot pull back what search engines have already indexed. [Meta for the setting; measured for the
   index]
8. **Cover: a 2.7:1 file about 1,640-1,700 px wide (e.g. 1702 × 630 or 1638 × 606), PNG when it holds text, sRGB.** Keep
   text in the middle band and out of the bottom-left corner: on the phone web the 104 px profile photo covers about x 3-31%
   and the bottom 18% of the visible cover, and the phone crops about 4% off the top and the bottom. Meta's only numbers: at
   least 720 px wide for a profile cover; 851 × 315 sRGB JPG under 100 KB "loads fastest" (Page help). [Meta + measured]
9. **Profile photo: the same square headshot as LinkedIn, the CV and the site, at least 320 × 320, face centred for the
   circle crop.** [Meta, Page help; opinion for "the same"]
10. **When changing the cover or the photo, switch off "Share your update to Feed" if a feed post is not wanted.** The image
    is public either way. [analyst for the toggle; Meta for "public"]
11. **Clean up once: Limit Past Posts (one-way), tag review and timeline review on, old profile and cover photos set to Friends
    or Only me, then check the public view.** [Meta]
12. **Do not lock the profile.** A lock hides the public layer, and Meta lists no countries for it, so it may not exist in
    Poland at all. [Meta]
13. **Post rarely and natively: a screenshot or a screen recording plus 2-4 lines, with the blog link in the post itself.**
    Meta predicts each viewer's chance of clicking an outside link from that viewer's own history; 97.8% of US Feed views in
    Q2 2025 had no outside link; on Pages, link posts get the lowest engagement. The only Facebook link-in-comment test (one
    Page, one pair of posts) got +9% reach but -38% clicks. [Meta + analyst; the plan = opinion]
14. **Only original posts, no bait.** Meta cuts the reach of unoriginal re-uploads (Mar 2026), engagement bait ("comment YES")
    and clickbait links. [Meta]
15. **Join 3-5 Polish dev groups, read each group's rules first, help before promoting.** Candidates: "Front-end: pierwsza
    praca w HTML5, CSS3 i JavaScript", "React Polska", "JS News: Jobs", "Praca w IT - Junior/Staż", "meet.js Gdańsk".
    Facebook is a side channel: 10.8% of 4,331 Polish IT workers learned of their current employer through social media
    (LinkedIn included), 27.0% through friends (2025). [study; group activity unverified]
16. **Do not pay for Meta Verified or Meta One for this.** The paid plans exist to lift link caps (Meta One Advanced from
    $49.99 a month includes links in organic posts); a regular profile is not in the test. [Meta; opinion]

## 1. Does a personal Facebook profile matter for hiring?

- **US screening surveys:**
  - **CareerBuilder / Harris Poll, Apr-May 2018, 1,000+ hiring managers (S29) [study, Old].** 70% research candidates on
    social sites. 57% of those found content that made them pass on someone. 47% are less likely to interview a candidate
    they cannot find online.
    - What hurt: provocative or inappropriate photos or posts 40%, drinking or drug use 36%, discriminatory comments 31%,
      links to crime 30%, lying about qualifications 27%, poor communication 27%, badmouthing an employer 25%, an
      unprofessional screen name 22%, sharing confidential information 20%, posting too often 12%.
    - What helped: background matched the qualifications 37%, creativity 34%, professional image 33%, wide interests 31%,
      culture fit 31%, communication 28%, awards 26%.
  - **Express Employment / Harris Poll, fielded 1-15 Dec 2022, n = 1,002 US hiring decision-makers (S30) [study, Old by a
    month].** 70% research candidates on social media, but only 17% do it for every candidate. 86% would likely consider a
    candidate with no online presence. 51% never found content that stopped a hire.
  - **ResumeBuilder, 2023, n = 1,013 US hiring managers per secondary reports (S31) [study, vendor-run].** 74% screen on
    social media. 83% use Facebook to vet candidates, 50% Instagram (the base for these two is unclear). 85% say they passed on someone over what they found. Reasons
    to look: culture fit 55%, illegal activity 45%, curiosity 34%, career investment 29%. The original report URL now
    redirects, so these come from HR Dive and Allwork.
- **Poland:**
  - **Jaska & Grzelak, SGGW, 2023, n = 102 recruiters, online convenience sample (S32) [study].** 78% use social media at work.
    About 62% sometimes check candidates' profiles; of those, LinkedIn 65.3%, Facebook 59.2%, Instagram 49.0%. The 38% who
    said candidates' social media "does not matter much" were most often IT recruiters ("hard skills" count more).
  - No Pracuj.pl, Grant Thornton, Hays Poland, Just Join IT or No Fluff Jobs survey on screening candidates' Facebook was
    found.
- **Polish law, short [law]:**
  - **Kodeks pracy art. 22¹ § 1-2 (S35).** An employer may ask a candidate only for name, date of birth, contact details,
    education, professional qualifications and work history; the last three only when the job needs them. Other data needs
    a separate statute or the candidate's own consent (art. 22¹a).
  - **UODO guide "Ochrona danych osobowych w miejscu pracy", Oct 2018, § 3.11 (S33) [Old].** "Co do zasady niedopuszczalne
    jest gromadzenie przez pracodawców i agencje rekrutacyjne informacji zamieszczanych przez kandydatów do pracy na swój
    temat w mediach społecznościowych i innych ogólnodostępnych źródłach." In English: as a rule, employers and agencies may
    not collect what candidates post about themselves on social media, even if it is public. § 3.12 treats career sites
    such as LinkedIn differently.
  - **WP29 Opinion 2/2017 (WP249), § 5.1 (S34) [Old].** A public profile is not a free pass. The employer needs a legal ground
    and must first weigh "whether the social media profile of the applicant is related to business or private purposes";
    data must be "necessary and relevant" to the job. It is not among the 16 WP29 documents the EDPB endorsed on 25 May 2018.
- **So what [opinion].** In Poland a recruiter should not use his private Facebook, and IT recruiters care least. Foreign
  clients and anyone who searches his name still see the public layer. The profile's job is to confirm the same person as
  the site and LinkedIn and to raise no flags; it will not win the job.

## 2. Facebook as a channel for IT jobs and freelance in Poland

- **How Polish IT workers found their current employer (Bulldogjob "IT Community Report 2025", n = 4,331, 15 Jan-16 Feb
  2025, S36) [study].** Friends 27.0%, general job portals 19.7%, IT job portals 18.5%, headhunters 14.5%, social media
  (Facebook, LinkedIn etc. combined) 10.8%, employer site 4.2%, events 2.3%. Facebook alone is not split out.
- **How groups get used (devmentor, Sep 2025, updated Sep 2026, S37) [analyst/opinion].** Companies and freelancers post
  offers in groups before job portals; join a few that match your level, not all. devmentor's mentees: about 50% found a
  first job through referrals.
- **Groups named in sources** (activity and member counts not verified; no login, no browser):

  | Group | Named by | Note |
  | --- | --- | --- |
  | Front-end: pierwsza praca w HTML5, CSS3 i JavaScript | S38 (c. 2018), S37, S39 | junior front-end offers |
  | React Polska | S38, S39 | general React; moderated by the Type of Web author in 2018 |
  | React, Next.js, Remix - Polska | S39 | name as listed (S39 prints a long dash) |
  | JS News: Jobs | S38, S37 | offers with salary ranges (2018 note) |
  | Praca w IT - Junior/Staż; Praca w IT dla Stażystów i Juniorów; Staże i praktyki w branży IT | S37 | junior and intern offers |
  | Praca zdalna IT; Zdalny programista | S37 | remote; S37 may link one of these to the wrong group |
  | Oferty pracy z widełkami; Programista 5K / 10K | S37; S38 | only offers with a salary range |
  | Programista Na Swoim | S38 | self-employed developers (B2B, taxes) |
  | Zlecenia dla studentów | S37 | small freelance gigs |
  | meet.js Gdańsk | S39 | the only Tricity group found; meet.js held a Gdańsk meetup on 2 Oct 2025 (S40) |

  The Trójmiasto Java User Group runs on Meetup.com, not Facebook (S40). No "Trójmiasto IT" style job group was found.
- **Group rules [analyst].** Rules sit in each group's About tab and pinned posts. Many groups ban self-promotion or allow it
  only in a weekly thread; breaking it gets members removed (S41). One Polish recruiter group bans posting developer job
  offers. No published rule set for a Polish job-seeker group was found.
- **Plan [opinion].** Answer questions in two or three groups with his stack. Post a "looking for work" or "available for
  freelance" note only where the rules allow it, with muszarski.com and the CV link. Do not cross-post the same text into
  many groups.

## 3. Personal profile fields and limits in 2026

- **Always public [Meta, S16].** Name, profile picture, cover photo, gender, username, user ID and networks. Current profile
  and cover photos are public "on or off Facebook"; past ones can be set per photo in the Profile pictures and Cover photos
  albums (S15).
- **About sections [Meta, S17].** "You can select an audience for each section"; sections can be hidden (More > Manage
  sections). Per-item audience uses the normal selector (Public, Friends, Only me, custom lists). This covers Work,
  Education, Current city and Contact and basic info.
- **Intro bio [analyst, S26].** Tool sites agree on 101 characters. No Meta page confirms it.
- **Links [analyst, S27].** Website and social links go in About > Contact and basic info (or Edit profile > Links). No cap
  is published. Bio text is not a clickable link.
- **Featured.** Not confirmed by any Meta page in this pass.
- **Pro mode ("professional mode", now "pro mode") [Meta, S18].**
  - On: content and audience insights, Moderation Assist, eligibility for discovery and monetisation, "Who can follow me"
    set to Public. It is the same profile, not a new one, and can be switched on or off at any time.
  - Off: insights and safety tools go, "Who can follow me" returns to Friends, and "you will lose any followers who are not
    your friends". So a regular profile cannot have public followers.
  - Path: profile > Options (below the cover) > Turn on / Turn off pro mode.
  - The category label: users report "Digital creator" appearing by default [analyst, anecdotal]. No Meta page on profile
    categories was found; Meta's category advice covers Pages (up to three categories).
  - Link cap: see section 5.
- **Profile lock [Meta, S21].** "You can only lock your profile in certain countries." Meta publishes no list. Poland is not
  confirmed either way. A lock moves old public posts to Friends and limits the About section for non-friends.
- **Username [Meta, S19].**
  - Accounts Center > Profiles > the profile > Username (some accounts see "Meta Account" settings instead).
  - It sets `facebook.com/<username>` and `m.me/<username>`. With Facebook and Instagram profile info synced, it can also
    change `instagram.com/<username>`.
  - At least 5 characters; A-Z, 0-9 and "."; no generic terms or extensions like ".com"; one per profile.
- **Name [Meta, S24].** After a name change, it cannot change again for 60 days.
- **Search engines.**
  - The setting "Do you want search engines outside of Facebook to link to your profile?" sits in Settings > Audience and
    visibility > How people find and contact you (S25) [analyst for the path; Meta pages S20 confirm the setting exists].
  - Meta: it "does not have control over content already indexed and cached in search engines" (S20) [Meta]. Guides say a
    change takes weeks [analyst].
  - Prerequisite: no Meta page found that ties it to "Who can look you up" or anything else.
  - Indexing: his profile shows in Google for "matmuszarski" but not for his plain name (S42) [measured].

## 4. Cover photo and profile photo

- **What Meta says for personal profiles [Meta, S12, S15].** The cover "has to be at least 720 pixels wide". Cover photos are
  public. Meta gives no display sizes for personal profiles.
- **Meta's closest spec, Facebook Page help (S13, quoted by S14) [Meta].**
  - The cover "loads fastest as an sRGB JPG file that's 851 pixels wide, 315 pixels tall and less than 100 kilobytes".
    Minimum 400 × 150.
  - It "left aligns with a full bleed and a 16:9 aspect ratio" on computers and 2.4:1 on mobile. The 851 × 315 file is
    2.7:1 and fits neither, and Meta does not say how it crops (S14).
  - "The left side of your cover photo will be partially covered by your profile picture"; on mobile the overlap is "about
    40 pixels" (search excerpt).
  - PNG "may give a better result" for logos or text.
  - Profile picture: shows at 176 × 176 on computers and 196 × 196 on phones, cropped to a circle; upload 320 × 320.
- **Measured in this repo, 2026-10-12 (S43) [measured].**
  - Desktop (a 2,133 CSS px wide window, logged in): the cover shows at 1,252 × 463 (2.7:1), centred over a blurred copy of
    itself. The 168 px profile photo sits 47 px in from the cover's left edge and 28 px below its bottom, not over it.
    Facebook served the image at 960 × 355 there, so it is upscaled on desktop.
  - Phone web: a 390 × 132 box (2.95:1). A 2.7:1 file loses about 4% at the top and at the bottom. The 104 px photo sits at
    x 12, y 108, so it covers the cover's bottom 24 px from x 12 to x 122 (with its border).
  - In a 1638 × 606 file that corner is about x 50-512, y 479-606.
  - The native phone app was not measured.
- **Analyst figures conflict [analyst].** Most guides still print 820 × 312 (desktop) and 640 × 360 (phone), Meta's old Page
  numbers (S44). Others claim the full 851 × 315 shows on both, or that the photo blocks "168 px" at the bottom left. None
  shows a method. Use Meta's numbers and the repo measurement.
- **Compression [Meta + analyst].** Meta: sRGB, JPG under 100 KB for photos, PNG for text. Guides add that Facebook
  re-compresses every upload, so big high-contrast type survives better than thin text [analyst].
- **Feed post on change [analyst, S28].** In the app the cover and photo editors show "Share your update to Feed"; turning
  it off avoids the post. The image stays public whatever the post's audience [Meta].
  - Desktop, 2026-10-12 [measured]: the cover editor has no feed switch (only "Your cover photo is public", Cancel, Save
    changes), and saving posted "updated his cover photo". That post has no audience selector, and its menu offers only
    pin, comments, notifications and translations. To change a cover quietly, use the phone app.

## 5. Sharing dev content from a personal profile

- **The link-cap test:**
  - **Dec 2025 (S1) [Meta-confirmed scope, via TechCrunch].** Meta confirmed a test on "users of professional mode and
    Facebook Pages"; publishers were excluded. Screenshots showed two link posts unless the user buys Meta Verified (from
    $14.99 a month). Exempt: affiliate links, links to Facebook, Instagram and WhatsApp. Meta: links in comments are not
    affected. Meta's stated aim: "to understand whether the ability to publish an increased volume of posts with links adds
    additional value" for subscribers.
  - **Feb 2026 (S5) [analyst].** Social Media Examiner: two link posts a month for pro-mode profiles and Pages, "currently
    testing"; comment links unlimited.
  - **15 Sep 2026: Meta One (S3) [Meta].** A new subscription family. The Advanced plan (from $49.99 a month) includes "links
    in organic posts and reels". Available "globally", with benefits that "may vary by region".
  - **17 Sep 2026 (S2) [analyst].** Social Media Today: the test "seemingly expanded" to more non-paying professional
    accounts after Meta One launched.
  - **Aug-Sep 2026 (S4) [analyst, vendor].** Publisher in a Box reports: two free link posts per calendar month, then the URL
    shows as plain text with no card; comment links also disabled in this wave; a link counter in the composer. Not
    confirmed by Meta.
  - **Regular profiles.** No source puts profiles without pro mode in the test. Status today: a test, not a policy, and not
    announced as global.
- **How Feed ranks friends' posts (Facebook Feed AI system card, updated 6 Oct 2026, S6) [Meta].** Inventory: posts from
  friends, Pages followed and groups joined. About 500 candidates are scored. Signals include who posted and the viewer's
  past interactions with them, the format (photo, video or link), how many friends liked it, and for links the viewer's own
  share of outside-link clicks over 14 days. Predictions include scrolling past, commenting and clicking through.
- **Links in practice:**
  - **Meta's Widely Viewed Content Report, Q2 2025, US Feed only (S8) [Meta].** 97.8% of views had no link to a site outside
    Facebook.
  - **Socialinsider, Pages only, Q2 2026 (S10) [analyst].** Engagement rate: albums 0.11%, images 0.10%, status 0.08%, links
    0.05%.
  - **Link in the first comment.** One Page test, early 2026 (S11) [analyst, n = one pair]: +9% reach, -38% link clicks.
    LinkedIn data do not transfer.
- **What Meta demotes (S7, S9) [Meta].** Unoriginal content, including re-uploads and minor edits of others' posts (Mar
  2026: repeat offenders can be made "non-recommendable"); engagement bait; clickbait links with withheld or sensational
  headlines.
- **Friends feed (S45) [analyst].** Facebook rebuilt its Friends tab in Mar 2025 (US and Canada first): friends-only
  content, no recommendations.
- **Plan [opinion].** One post per release or case study: a screenshot or a 10-30 s screen recording, 2-4 plain lines on
  what was built and why, the link in the post (a regular profile has no cap and the click is the point). Share dev.to and
  blog posts this way, not by bare link. No "link in comments" trick.

## 6. Privacy hygiene that recruiters notice

- **Public vs Friends [opinion].**

  | Public | Friends or Only me |
  | --- | --- |
  | Name, photo, cover (always public) | Old posts (Limit Past Posts) |
  | Intro bio, Work, Education, Current city | Family, relationship, birth date and year |
  | Website, GitHub, LinkedIn | Email, phone (Only me) |
  | Chosen dev posts (Public audience per post) | Friends list, tagged photos, life events |

- **Limit Past Posts [Meta, S22].** Moves every past post shared wider than Friends to Friends. It cannot be undone in one
  click. Posts with a custom audience are not changed. Posts by others that tag him stay under their audience.
- **Tag review and timeline review [Meta, S23].** Tag review approves tags others add to his posts. Timeline review decides
  whether posts he is tagged in appear on his profile; it can apply to everyone, friends included.
- **Old photos [Meta, S15].** Past profile and cover photos keep their own audience; set them in the two albums.
- **Public view [Meta].** Facebook has a "see the public view of your profile" tool (help 288066747875915); use it after
  every change.
- **Consistency [opinion].** The same "Mateusz Muszarski" spelling, the same headshot and the same one-line role as LinkedIn,
  the CV and the site. This helps a reader confirm one person; in name search, Bing already mixes in a near-namesake's
  Facebook (`2026-10-05-seo-entity-discoverability.md`).

## 7. Applied on 2026-10-12

Facts come from `apps/web/src/data/cv.ts`, the same source as LinkedIn. Every saved field was re-read from the page after a
reload.

- **Done:**
  - **Cover:** the LinkedIn banner's space remix, re-laid for 2.7:1 (1,638 × 606 PNG, `tools/facebook-cover/`). Text stays
    out of the phone photo corner. Desktop posted "updated his cover photo" to Friends; the owner chose save-then-hide, but
    that post's audience is locked (§ 4), so it stayed.
  - **Username `muszarski`** [owner; `mateusz.muszarski` was taken]. The form showed no Instagram sync. `PERSONAL` in
    `data/site.ts` (`sameAs`, the footer, llms.txt) now points to `facebook.com/muszarski`. The old `profile.php?id=` URL and
    the `m.me/<id>` Messenger link still work.
  - **Links, Public:** Portfolio `https://muszarski.com/` (was `http://`), GitHub, LinkedIn.
  - **Current city** Starogard Gdański [owner], Public.
  - **Work, Public:** Self-Employed, Freelance Full-Stack Developer, 2022 to now (`cv.ts` "Freelance and own projects");
    cetuspro.com - Software & Technology, Full-Stack Developer Intern, June 2026 to now; Neoteric (the neoteric.eu page,
    Gdańsk; four other "Neoteric" pages exist), Full-Stack Developer Intern, "In 2026". Facebook rejects the same start and
    end year, and `cv.ts` has no months, so Neoteric has a start year only. Descriptions from `cv.ts`. Facebook lists current
    jobs by start date, so the intro features Self-Employed, with its own "4 years, 9 months" count from January 2022.
  - **Education:** Zespół Szkół Ekonomicznych w Starogardzie Gdańskim (high school), no years (`cv.ts`: in progress). The
    high-school form has no field for the programmer technician track.
  - **Kept:** the owner's own bio (role, open to work, muszarski.com); pro mode off; contact details on Only me.
  - Every "Share on Feed now?" after an About save was answered No. The public view (`?viewas=100000686899395`) shows the
    cover, bio, city, work, school and the three links.
- **Third pass, same day [owner: "the posts should be for public and for tech people to see", "just keep the posts of me
  sharing blogs"]:**
  - Privacy: default audience for new posts Friends → Public; posts he's tagged in, on his profile, Friends of friends →
    Friends; timeline review on (tag review was already on); search engines stay on, friends list stays Only me.
  - Limit Past Posts not used: it would turn the Public blog shares to Friends.
  - Both blog shares (astro-vs-nextjs and the brutalist-portfolio case study, both dev.to links) are Public.
  - The ZSE school life event (auto-posted Public, no prompt) is hidden from the profile; the cover post was already hidden.
    The "Started new job" cards (Neoteric, Self-Employed) showed in the public view once but are in neither the Activity
    log nor Manage posts, so they were not changed.
  - Pinned details: Neoteric unpinned (a finished internship); Cetuspro is not offered there.
  - Groups joined (10, about a minute apart): Praca IT TRÓJMIASTO / Jobs in IT Tricity; Praca w IT dla Stażystów i Juniorów
    (approved); Front-end: pierwsza praca (allows job-seeking posts); Praca / Staż w IT; PRACA ZDALNA IT (answered "accept
    the rules", declined the it-leaders.pl sign-up); Claude Code - Polska Społeczność (its posting request wants an email
    and marketing consent to a company, so left for the owner); Claude Code (214K); React Native Community Q&A (posting
    needs the rules tick, which would not submit in a hidden tab); Freelancerzy Polska; Programiści Polska / Developers
    Poland. React Polska was skipped: 1 post in the last month.
- **The owner's own steps:** answer the two participation prompts if he wants to post there, the audience of old profile
  photos, the same clear headshot as LinkedIn, one "looking for work" post where a group allows it.

### Editing Facebook through Claude in Chrome

- The About page lives at `?sk=directory_intro`, `directory_personal_details`, `directory_work`, `directory_education`,
  `directory_links`, `directory_contact_info` and `directory_names`. `m.facebook.com` redirects to `www`.
- In a hidden tab, inline About edits, the cover's file input and Accounts Center forms work. Typeahead suggestions (city,
  employer, position, school, year) select only with the full sequence on the option's inner `span`: pointerover,
  pointerenter, mouseover, mouseenter, pointermove, mousemove, then pointerdown, mousedown, pointerup, mouseup, click. A
  plain `.click()` on the `li`, a CDP click and the arrow keys do nothing. Saves are slow in a hidden tab (seconds to
  half a minute); a failed save shows its reason in a `[role=dialog]` outside the form.
- Each About save asks "Share on Feed now?" inside the section; answer No. Education saves post a life event anyway.
- Audience dialogs in a hidden tab often stay open after Save and stay in the DOM. A later `find` then picked a stale
  dialog, and one save landed on the wrong post (two blog shares changed audience; both restored). Reload before every
  audience edit, assert exactly one "Select audience" dialog after opening it, find the post by its text (`aria-posinset`
  changes between loads), and verify after a reload.
- The profile feed loads one or two posts in a hidden tab; the Activity log (`/<id>/allactivity`) lists every post with
  its audience and a "Hide from profile" item.
- Fill text with `document.execCommand('insertText')` on the focused field, as on LinkedIn.
- Post text is scrambled in `innerText` (letters split with joiners); read posts by `aria-posinset` and their buttons.

## Not verified / gaps

- No Meta page gives display boxes for personal-profile covers; the phone-app crop and the photo position in the native app
  are unmeasured. The desktop box was measured at one window width (2,133 CSS px).
- The 101-character bio limit, the link count in the intro, Featured, and pro-mode categories are not confirmed by Meta.
- Profile lock availability in Poland, and any prerequisite for the search-engine setting, are unknown.
- Whether the link test now includes regular profiles, the exact current cap, and the comment-link change are not confirmed
  by Meta. Q1 2026 Widely Viewed Content figures seen in one search excerpt could not be confirmed, so Q2 2025 is used.
- No Polish survey from Pracuj.pl, Grant Thornton, Hays, Just Join IT or No Fluff Jobs on screening candidates' Facebook.
  The ResumeBuilder original was not reachable; its n comes from a secondary source.
- The Facebook groups' activity, size and rules were not checked (no login).
- The art. 22¹ wording comes from secondary sources (they disagree on "kwalifikacje zawodowe"); the ISAP text was not
  fetched.

## Sources (all accessed 2026-10-12)

- S1 TechCrunch, "Facebook is testing a link-posting limit for professional accounts and pages", 2025-12-17: https://techcrunch.com/2025/12/17/facebook-is-testing-a-link-posting-limit-for-professional-accounts-and-pages
- S2 Social Media Today, "Facebook Pages get charged for link posts", 2026-09-17: https://www.socialmediatoday.com/news/facebook-pages-get-charged-for-link-posts/830743/
- S3 Meta newsroom, "Introducing Meta One", 2026-09-15: https://about.fb.com/news/2026/09/introducing-meta-one-subscription-service-more-features-ai/
- S4 Publisher in a Box, link limits and Meta One (vendor, c. Sep 2026): https://publisherinabox.com/facebook-link-limits-meta-one-what-publishers-do
- S5 Social Media Examiner, "What Facebook's New Link Rules Mean for Your 2026 Strategy", 2026-02-05: https://www.socialmediaexaminer.com/what-facebooks-new-link-rules-mean-for-your-2026-strategy/
- S6 Meta Transparency Center, Facebook Feed AI system (updated 2026-10-06, read via search excerpts): https://transparency.meta.com/features/explaining-ranking/fb-feed/
- S7 Meta Transparency Center, types of content we demote: https://transparency.meta.com/features/approach-to-ranking/types-of-content-we-demote/ · clickbait links: https://transparency.meta.com/features/approach-to-ranking/content-distribution-guidelines/clickbait-links/ · engagement bait: https://transparency.meta.com/features/approach-to-ranking/content-distribution-guidelines/engagement-bait/
- S8 Meta Widely Viewed Content Report, Q2 2025, via Social Media Today 2025-08-27: https://www.socialmediatoday.com/news/meta-content-enforcement-widely-viewed-content-report-q2-2025/758814/ · report: https://transparency.meta.com/reports/widely-viewed-content-report/
- S9 Meta newsroom, "Rewarding Original Creators on Facebook", 2026-03-13: https://about.fb.com/news/2026/03/rewarding-original-creators-on-facebook/
- S10 Socialinsider, 2026 organic Facebook benchmarks (Pages): https://www.socialinsider.io/social-media-benchmarks/facebook
- S11 Lilach Bullock, link in post vs first comment (one Page test, early 2026): https://www.lilachbullock.com/why-facebook-pages-post-links-in-comments/
- S12 Facebook Help 220070894714080, add or change your cover photo (via search excerpts): https://www.facebook.com/help/220070894714080
- S13 Facebook Help 125379114252045, Page profile picture and cover photo dimensions (via search excerpts and S14): https://www.facebook.com/help/125379114252045
- S14 Outfeed, cover photo size, quotes Meta's help pages, 2026-09-27: https://outfeed.ai/blog/facebook-cover-photo-size/
- S15 Facebook Help 193629617349922, who can see your profile picture and cover photo: https://www.facebook.com/help/193629617349922
- S16 Facebook Help 167941163265974, control who can see what's on your profile: https://www.facebook.com/help/167941163265974
- S17 Facebook Help 100522066706974, manage the About section: https://www.facebook.com/help/100522066706974
- S18 Facebook Help 2978174759158711, turn pro mode on or off: https://www.facebook.com/help/2978174759158711 · Meta for Business, category best practices: https://www.facebook.com/business/help/376650512904346
- S19 Facebook Help 162586890471598, find or change your username: https://www.facebook.com/help/162586890471598 · username guidelines 105399436216001: https://www.facebook.com/help/105399436216001
- S20 Facebook Help 124518907626945, search engines linking to your profile: https://www.facebook.com/help/124518907626945 · 112100708878206, still listed in search engines: https://www.facebook.com/help/112100708878206
- S21 Facebook Help 196419427651178, lock your profile: https://www.facebook.com/help/196419427651178
- S22 Facebook privacy basics, Limit Past Posts: https://www.facebook.com/help/privacy/basic-controls
- S23 Facebook Help 247746261926036, tag review: https://www.facebook.com/help/247746261926036 · 124970597582337, tagging and timeline review: https://www.facebook.com/help/124970597582337
- S24 Facebook Help 173909489329079, change your name (60-day rule): https://www.facebook.com/help/173909489329079
- S25 How-To Geek, remove your Facebook profile from search engines (setting path): https://www.howtogeek.com/708115/how-to-delist-your-facebook-profile-from-search-engines/
- S26 howmanywords, Facebook character limits, 2026-04-12: https://howmanywords.app/blog/facebook-character-limits
- S27 Bitly, Facebook link in bio, 2026-07-29: https://bitly.com/blog/facebook-link-in-bio/
- S28 Windows Digitals, change the cover without posting: https://www.windowsdigitals.com/how-to-change-facebook-cover-photo-without-posting/
- S29 CareerBuilder / Harris Poll 2018 via AZ Big Media: https://azbigmedia.com/business/business-and-social-media/social-media-content-causes-57-of-employers-to-not-hire-a-candidate/
- S30 Express Employment Professionals / Harris Poll, 2023-05-10: https://www.expresspros.com/newsroom/news-releases/news-releases/2023/05/social-media-integral-to-recruiting-as-most-businesses-use-it-to-source-research-and-screen-candidates
- S31 ResumeBuilder 2023 via HR Dive 2023-06-20: https://www.hrdive.com/news/hiring-managers-check-candidates-social-media/653366/ · via Allwork 2023-08-14: https://allwork.space/2023/08/be-careful-what-you-post-online-7-in-10-hiring-managers-are-watching/
- S32 Jaska, Grzelak, "Ocena użyteczności social mediów w rekrutacji pracowników", Turystyka i Rozwój Regionalny 20, 2023, DOI 10.22630/TIRR.2023.20.19: https://tirr.sggw.edu.pl/article/download/6067/5198/9493
- S33 UODO, "Ochrona danych osobowych w miejscu pracy. Poradnik dla pracodawców", Oct 2018, § 3.11-3.12: https://uodo.gov.pl/file/1469
- S34 Article 29 Working Party, Opinion 2/2017 on data processing at work (WP249), 2017-06-23, § 5.1: https://ec.europa.eu/newsroom/article29/items/610169 · EDPB Endorsement 1/2018 (list): https://edpb.europa.eu/sites/default/files/files/news/endorsement_of_wp29_documents_en_0.pdf
- S35 Kodeks pracy art. 22¹ (current catalogue, secondary): https://kadry.infor.pl/kadry/indywidualne_prawo_pracy/ochrona_danych_osobowych/2733477,Jakich-danych-osobowych-moze-zadac-pracodawca.html · https://www.ifirma.pl/blog/jakich-danych-osobowych-moze-zadac-pracodawca-od-pracownika.html
- S36 Bulldogjob, IT Community Report 2025 (work; methodology): https://bulldogjob.com/it-report/2025/work · https://bulldogjob.com/it-report/2025
- S37 devmentor, "Gdzie szukać pracy w IT?", 2025-09-19, updated 2026-09-09: https://devmentor.pl/blog/gdzie-szukac-pracy-w-it
- S38 Type of Web, "20 grup na Facebooku…" (c. 2018): https://pl.typeofweb.com/grupy-facebook-front-end-developer
- S39 okiemprawnika, "75 najlepszych grup na Facebooku dla programistów" (undated): https://okiemprawnika.pl/blog/grupy-na-facebooku-dla-programistow/
- S40 meet.js 15 years (DOU): https://dou.eu/en/community/posts/15-lat-meet-js-robimy-cos-wiekszego-niz-meetup17716-1798 · Trójmiasto JUG on Meetup: https://www.meetup.com/pl-PL/trojmiasto-java-user-group/events/313833687/
- S41 Group self-promotion rules (analyst): https://www.eofire.com/what-no-self-promotion-means-facebook-group-guidelines/ · Polish recruiter groups: https://www.sourcecon.com/polish-facebook-groups-for-recruiters-to-join/
- S42 Internal: `2026-10-11-serp-baseline.md` and `serp/img/2026-10-11/g-en-matmuszarski.json`
- S43 Internal: `research/tools/facebook-cover/render.mjs` (frames measured 2026-10-12)
- S44 Analyst cover-size guides (conflicting): https://socialsizes.io/facebook-cover-photo-size/ · https://www.screensnap.pro/blog/facebook-cover-photo-size-guide · https://www.freewebheaders.com/facebook-cover-photo-dimensions-for-desktop-and-mobile-explained/
- S45 TechCrunch, revamped Friends tab, 2025-03-27: https://techcrunch.com/2025/03/27/facebook-debuts-a-revamped-friends-tab-as-part-of-its-return-to-og-facebook
