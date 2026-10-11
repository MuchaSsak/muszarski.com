# Name-search baseline ("before"): how "Mateusz Muszarski" looks in search

Date: captured 2026-10-11/12, the day after muszarski.com went live (Search Console + Bing Webmaster were set up just
before) · Purpose: the **before** half of a before/after study; re-run in a few weeks for the **after**, and if a
knowledge panel appears, it becomes a case study [owner 2026-10-11].

- **Method [measured]:** `tools/serp-capture.mjs`, headed Chrome (Playwright, fresh profile, signed out, `pws=0`,
  `gl=pl`), desktop 1440×1000 and phone 412×915. Google answered automation with a CAPTCHA; the owner solved it by
  hand (three times: google.com, google.pl, the phone profile), so the Google rows are real Google, not a proxy.
- **Shots (local, gitignored, third-party pages):** `serp/img/2026-10-11/<id>.png` (full page), `<id>-fold.png`
  (first screen), `<id>.json` (body text, organic results, panel text). 13 queries, 28 MB.
- **Owner's rule:** muszarski.com results were already appearing and are **left out of the reading** ("act as if they
  aren't here"). They are listed once below under "Already leaking in" so the after-run can tell them apart.

## Google

| Query (shot id) | What owns page 1 without muszarski.com | Panel / AI |
|---|---|---|
| Mateusz Muszarski, en desktop (`g-en-name`) | 1 LinkedIn "Student at Technikum nr 1 im. Noblistów Polskich" · 2 GoWork register page of his sole-trader company (Enrollo) · monitorfirm.pb.pl (company register) · GitHub MuchaSsak · Google Play developer page · Instagram of **another** Mateusz Muszarski (`@doktorek_muszarski`) · GoWork "opinions" page | No knowledge panel, no AI Overview on desktop |
| same, pl desktop (`g-pl-name`) | 1 LinkedIn · 2 GoWork, then the same set | No panel |
| same, phone (`g-en-name-mobile`) | LinkedIn, GoWork, then GitHub, Google Play, pb.pl | **AI Overview**: "a Polish software developer, entrepreneur, and student based in Starogard Gdański"; bullets on the Enrollo sole proprietorship (source pb.pl), Linkoglot (Google Play, App Store), the technikum and GitHub. Sources: LinkedIn, GitHub, Google Play ×2, pb.pl, App Store. **No muszarski.com among its sources** |
| "Mateusz Muszarski" quoted (`g-en-name-quoted`) | Same as unquoted + a Jagiellonian University profile of another person | No panel |
| Mateusz Muszarski developer (`g-en-name-developer`) | LinkedIn, Google Play, GoWork, GitHub, **App Store developer page**, pb.pl, LinkedIn directory | No panel |
| Mateusz Muszarski programista, pl (`g-pl-name-programista`) | LinkedIn, GoWork, monitorfirm, LinkedIn "Mateusz Mus" directory, App Store developer page | No panel |
| Muszarski (`g-en-muszarski`) | Car-inspection station "B. Muszarski" (Nowy Dwór Gdański), other family businesses | **Local knowledge panel of the car-inspection station**: the surname alone belongs to them |
| matmuszarski (`g-en-matmuszarski`) | Facebook, old matmuszarski.space still titled **"Ready for launch!"**, GitHub, pb.pl, then "Mateusz Pisarski" results | No panel |
| Images, desktop + phone (`g-en-images`, `-mobile`) | His LinkedIn selfie (sunglasses, sea) first; Google Play / App Store screenshots of Linkoglot; then **unrelated people**: a university futsal team (several frames), a school sports article, other Mateuszes | No image of him besides the LinkedIn selfie |

## Bing, DuckDuckGo, Startpage

| Query (shot id) | Order |
|---|---|
| Bing: Mateusz Muszarski (`bing-name`) | 1 **old matmuszarski.space** "3D Space Portfolio" · 2 LinkedIn (student) · 3 GoWork · 4 LinkedIn directory · 5 GitHub · 6 Instagram of another Mateusz · 7 his Instagram `@mat.muszarski` · 8 monitorfirm · 9 LinkedIn of another Mateusz (Camp Adventure) · 10 a law firm "Muszalski". No panel |
| Bing: … developer (`bing-name-developer`) | 1 old matmuszarski.space · 2 GitHub · then other developers (Moczarski, matieusz.pl), LinkedIn, APKPure developer page |
| Bing Images (`bing-images`) | Old-site OG card ("MUSZARSKI PORTFOLIO"), LinkedIn selfie, old-site spaceship render, then **other people** (Muszyński, Murański, Musiałowski, Murawski…) |
| DuckDuckGo (`ddg-name`) | 1 old matmuszarski.space · GoWork · LinkedIn · other Mateusz's Instagram · GitHub · LinkedIn directory · his Instagram · monitorfirm ×2 |
| Startpage (Google index, unpersonalised; `sp-*`) | Another Mateusz's Instagram first, LinkedIn "Mateusz Mus" directory, Linkoglot on Google Play, a Pinterest "Muszarski Mateusz" (not him) |

## Entity signals

- **Knowledge panel:** none for him on Google or Bing. **Wikidata:** no item for "Muszarski" (API search, 2026-10-12).
- **Google autocomplete** (`suggestqueries`, en/pl): "Mateusz Muszarski" completes to itself (on 2026-10-05 it had
  zero completions); "Mateusz Musz" suggests only other surnames (Muszyński, Muszalski…). "Muszarski" and
  "matmuszarski": none.
- **What Google believes today (AI Overview):** student + entrepreneur + software developer, from LinkedIn and the
  company registers. The story the site tells (full-stack developer, PstrykWeb, case studies) is not in it yet.

## Already leaking in (muszarski.com, excluded above)

On capture day Google already showed muszarski.com: /pl/ at #2 on the en desktop query, /en/my-life/, /en/cv/,
/blog/ and the case study's share card in Images ("2 hours ago"); Startpage showed /pl/, /en/cv/, /en/my-life/.
Bing and DuckDuckGo did not show it yet. **Wrong locale:** the English query got the Polish home ("Programista full
stack", "Translate this page") and the Polish query got the English home and CV ("Tłumaczenie strony"): Google had not
paired the hreflang alternates yet. Watch it in the after-run; if it persists, check hreflang in Search Console.

## What the "after" should look for

1. muszarski.com #1 for "Mateusz Muszarski" (en + pl, desktop + phone), with sitelinks (Work, CV, Blog).
2. The AI Overview cites muszarski.com and calls him a full-stack developer, not "student, entrepreneur".
3. Images: his portrait (the `#portrait` 800×800 from the Person schema) and project shots above the futsal team.
4. Bing: muszarski.com replaces the old matmuszarski.space at #1 (the old site should 301 there).
5. Register scrapers (GoWork, monitorfirm) pushed below his own pages.
6. A knowledge panel for the person, or the people-panel-like SERP `site/seo.md` § Entity strategy aims for.
7. Re-run: `node .claude/project-info/research/tools/serp-capture.mjs .claude/project-info/research/serp/img/<date>`,
   solve the CAPTCHAs, compare shot by shot.
