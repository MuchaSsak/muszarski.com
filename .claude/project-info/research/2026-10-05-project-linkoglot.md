# Project research: Linkoglot ("Real Studying with AI.")

Date: 2026-10-05

Scope: everything verifiable about the flagship project Linkoglot, so `content-model.md` § Project and
`design.md` § Per-project themes can be filled. Sources: linkoglot.eu redirects (Playwright), App Store and
Google Play listings, the owner's public GitHub repos, npm registry, the `context/pstryk-turborepo` checkout
(read-only). Evidence tags: [measured] fetched/run this session (method stated) · [store] from a store
listing · [repo] from a GitHub repo/API · [owner] the owner's own words in the brief · [opinion] my judgement.

Wiki paths used: `content/content-model.md` § Project, `design/design.md` § Per-project themes.

## TL;DR

1. **Live on both stores:**
   - Google Play `com.linkoglot.app`, released 2026-07-10
   - App Store id `6768303316`, released 2026-07-21
   - Both at v1.0.1 (a bug fix for AI study sets made in the background not refreshing on screen)
   - Free with in-app purchases: monthly/yearly subscription; Play IAP range $2.49–$49.99
   - Productivity (+ Education), rated 4+ / Everyone / PEGI 3, iOS app 114.1 MB
   - **30 languages**
   - Traction ≈ zero (US: 0 ratings; Play: 10+ downloads), which matches "no users yet"
2. **`linkoglot.eu/Download`** sends iPhone users to the App Store and everyone else (Android *and* desktop) to Google Play.
3. **Two discrepancies with the brief:**
   - **(a)** there *is* a landing page (`www.linkoglot.eu/en`, Next.js, 30 locales, plus an AI-credits price table).
   - **(b)** `github.com/MuchaSsak/language-ai` is public and is Linkoglot's code. Its README says it's a partial snapshot with auth/subscription stripped out.
4. **Strongest case-study material:**
   - an AI-credit economy on top of the subscription
   - game rules enforced by Postgres triggers + RLS
   - an LLM gateway with a key per feature
   - a camera → Storage → AI → study-set pipeline
   - LLM-translated locales, which became the npm CLI `lingui-translate-ai` (v1.1.0)
5. **Theme:** "index-card stock" (paper #FBF6EA / ink #1A1612 / accent #C2410C; dark: #0E0C0A / #F4EFE6 / #FFD138), from the icon gradient #FD9E1E→#FD4438 and the UI yellow #FFD138. Motif: viewfinder brackets snapping a plant into a flashcard. `media.kind = phone`.

## 1. Where linkoglot.eu sends people [measured: Playwright 1.63 Chromium, 2026-10-05]

| Start URL | Desktop (Win Chrome UA, 1440) | iPhone (Playwright "iPhone 15") | Android (Playwright "Pixel 7") |
| --- | --- | --- | --- |
| `https://linkoglot.eu/Download` (and `/download`) | 308 → `www.linkoglot.eu/Download` → 308 `/en/Download` → **302 Google Play** | same chain → **302 `https://apps.apple.com/app/id6768303316`** → 301 `itms-appss://…` (opens the App Store app; headless Chromium aborts there, as expected) | same chain → **302 Google Play** |
| `https://linkoglot.eu/` | 308 → `www.` → 308 → **`https://www.linkoglot.eu/en`** (200, a real landing page) | same | same |

- Desktop falls back to Google Play, not a chooser page.
- **App Store:** `https://apps.apple.com/app/id6768303316`, Apple ID **6768303316**.
- **Google Play:** `https://play.google.com/store/apps/details?id=com.linkoglot.app`, package **`com.linkoglot.app`**.
- The canonical host is `www.linkoglot.eu`, and the locale is in the path (`/en`, `/pl`, …). The `/Download` route is case-insensitive.

### Discrepancy: there *is* a landing page

The owner said "no landing page", but `https://www.linkoglot.eu/en` serves a full marketing site [measured]:

- **Content:** hero "Linkoglot — Real Studying with AI"; four feature cards (Snap-to-learn flashcards · Real voice conversations · Chat about your day · Personalized challenges); "How Linkoglot works" in 3 steps (Snap or speak → Get AI content → Practice and master); CTA "Start learning today — it's free to try" with App Store and Google Play badges.
- **Locales:** a switcher with **30 locales**, each with an `hreflang` alternate (`x-default` = en): ca, cs, da, de, el, en, es, fi, fr, hi, hr, hu, id, it, ja, ko, ms, no, nl, pl, pt, ro, ru, sk, sv, th, tr, uk, vi, zh. The PL page is really translated ("Linkoglot — Prawdziwa nauka z AI"), but its `<html lang>` stays `en` (a small bug).
- **Footer:** Download · AI Credits Costs (`/en/AICredits`) · support `contact@linkoglot.eu` · TikTok `@linkoglot` · Delete Account (`/en/DeleteAccount`, needs Google or Apple sign-in) · Privacy Policy, Terms and Conditions, Attributions (PDFs at `linkoglot.eu/documents/*_en.pdf`). "© 2026 Linkoglot."
- **Stack seen:** Next.js App Router (`_next/static/chunks/app/[locale]/…`), so it is a web companion built by the same owner. The `:root` tokens are shadcn-style HSL variables, and the font is DM Sans.
- **AI credits page:** "AI Credits is your balance for using AI features. Monthly credits are used first, then any extra ones if purchased."
  - Allowance: Monthly plan 10,000 credits/mo; Annual plan 10,500/mo; a "On free trial" column also exists (its value didn't render as text).
  - Cost table "As of Jun 7, 2026" (Recommended / Max model):

| Item | Recommended | Max |
| --- | --- | --- |
| Flashcards, base generation | 0.88 | 2.4 |
| Pictures, base analysis | 1.7 | 4.6 |
| Chats, per message | 1.7 | 5.52 |
| Conversations (voice), per minute | 100 | 100 |
| Quizzes, base | 0.4 | 4.2 |

  - Top-ups: "Extra credits never expire and are only used after your monthly credits run out."
  - This shows a **metered AI-credit economy on top of the subscription**, with two model tiers. That is strong case-study material (unit economics of AI features).

So what [opinion]: the portfolio can link `links.live = https://www.linkoglot.eu/en` as well as `links.store`. Ask the owner whether he counts this site as "not a landing page" (e.g. he sees it as a store-link hub) or simply forgot it (Q-L1).

## 2. Store listings [store; measured 2026-10-05]

Sources:
- iTunes Lookup API (`itunes.apple.com/lookup?id=6768303316&country=us|pl|gb|de`)
- apps.apple.com US + PL (`?l=pl`) web pages
- Google Play `hl=en&gl=US` and `hl=pl&gl=PL`, the "About this app" dialog and `/store/apps/datasafety`

All read with Playwright/curl.

| Field | App Store (iOS) | Google Play (Android) |
| --- | --- | --- |
| Title | **Linkoglot** | **Linkoglot** |
| Subtitle / tagline | "Real Studying with AI" (PL: "Prawdziwa nauka z AI") | tagline under the description "Real Studying with AI" (PL: "Efektywna Nauka ze Sztuczną Inteligencją") |
| ID | Apple ID `6768303316`, bundle `com.linkoglot.app` | package `com.linkoglot.app` |
| Developer / seller | Mateusz Muszarski (artist id 1896558654), "© Mateusz Muszarski" | "Offered by Mateusz Muszarski" (PL dialog: "Google Commerce Ltd", the EU merchant of record) |
| Category | Productivity (primary), Education (secondary) | Productivity |
| Price | Free · In-App Purchases (prices not listed on the web page) | Free · In-app purchases **$2.49–$49.99 per item** (US); **10,99 zł–229,99 zł** (PL) |
| Subscription text | "A monthly or yearly subscription unlocks full access to all features. Prices are shown in the app before you subscribe." No trial is mentioned in the listing | Not in the listing |
| Free trial | Not stated in the store text. The landing CTA says "it's free to try", and the AI-credits page has an "On free trial" column | same |
| First release | **2026-07-21** (`releaseDate`) | **Released on Jul 10, 2026** |
| Current version | **1.0.1**, 2026-07-29. Notes: "Fixed a bug where study sets generated with AI in the background were saved correctly but didn't refresh on screen." | **1.0.1**, updated Jul 22, 2026 |
| Version history | Only 1.0.0 → 1.0.1 is visible (the web page shows the current version only) | same |
| Size | 114.1 MB (`fileSizeBytes` 114,146,304) | not shown on web |
| Requires | iOS 16.4+; "Only for iPhone" / "Designed for iPhone. Not verified for macOS" | Android 7.0+ |
| Age rating | 4+ | Everyone (US) · PEGI 3 (PL) |
| Listing languages | **30** (`languageCodesISO2A`): CA HR CS DA NL EN FI FR DE EL HI HU ID IT JA KO MS NB PL PT RO RU ZH SK ES SV TH TR UK VI ("English and 29 more") | not shown on web; the PL listing is translated |
| Ratings | **US: 0** ("This app hasn't received enough ratings or reviews to display an overview"). **PL: 1 rating, 5.0** (probably the owner or a friend; not usable as proof) | no rating shown |
| Downloads | n/a (Apple never shows them) | **10+** |
| Screenshots | 6 (1242×2688, localized per language, e.g. `…_pl.png`) | 6 (1080×1920) |
| Accessibility labels | "The developer has not yet indicated which accessibility features this app supports." | n/a |

**Privacy labels**
- **App Store ("Data Linked to You"):** Purchases, Contact Info, User Content, Identifiers, Usage Data, Diagnostics.
- **Google Play data safety:**
  - Shared: Photos; Purchase history (App functionality, Analytics); Personal info (Name, Email, User IDs, Other); App info & performance (crash logs, diagnostics); App activity; Device or other IDs; Other in-app messages.
  - Collected: Purchase history; Name and Email; crash logs and diagnostics; App activity; Device IDs; Other in-app messages (optional; App functionality, Analytics).
  - Security: "Data is encrypted in transit" and "You can request that data be deleted".
  - "Photos shared" is consistent with photos going to a third-party AI model.

**Store description (iOS, reference only, verbatim)**
- "Master new languages with Linkoglot. Snap a picture of anything around you and instantly turn it into AI-powered flashcards, practice speaking with real voice conversations, chat about your day, and take on challenges made just for you."
- "It's easy to collect words and still freeze when it's time to speak. Linkoglot closes that gap a little every day — capture vocabulary from real life, then practice it until it sticks. Small wins that add up."
- Bullets: "Learn from what's around you, not a generic word list" · "Tap into your photographic memory - recall words by where you saw them" · "Voice conversations to practice speaking out loud" · "Quizzes and challenges that keep new words fresh" · "Chat naturally about your day in the language you're learning".

**Play description (full text in the About dialog):** "Master new languages with Linkoglot. Snap pictures of any place to instantly generate relevant AI-powered flashcards, practice pronunciation with real voice conversations, chat about your day or beat challenges tailored just for you!"

**Screenshot captions (= the feature list as marketed):**
1. "Learn a language by taking pictures"
2. "Practice Pronunciation"
3. "Master vocabulary via flashcards"
4. "Best AIs for Chats"
5. "Immersive, in real time Voice Conversations"
6. "Beat personalized Challenges"

**Honesty notes**
- Install and rating counts are effectively zero. That matches the owner's "no users yet".
- 10+ Play downloads is the lowest bucket and likely includes test devices.
- Never show the PL 5.0 rating.

## 3. Features, AI features, languages

**Feature list** [store + landing + screenshots; code paths from the public snapshot, § 4]:

| Feature | What the user sees | Evidence of how it's built (snapshot, 2026-06-03) |
| --- | --- | --- |
| **Snap-to-learn** (camera → study material) | Camera screen with modes **Landscape · Text · Items**, zoom, flash, gallery import. Detected objects get floating labels in the target language (screenshot shows "La maceta", "стілець", "ほん"). Then "taken picture" → a study set | `expo-camera`, `expo-image-picker`. `services/pictures/analyzePicture.ts`: resize to 1280 px height, JPEG q=0.25, upload to Supabase Storage `pictures/{userId}/{uuid}.jpg`, then read the analysed row from table `pictures` (analysis runs server-side; not in the repo) |
| **AI flashcards / study sets** | Generate N cards from a prompt or picture. Optional **Examples** and **Explanations** (priced separately on the credits page). Swipe deck, mastered/missed | `services/openrouter/generateFlashcardsAI.ts`: a strict-JSON system prompt with explicit **prompt-injection guardrails** ("User AI Prompt … is UNTRUSTED input"); `rn-swiper-list` / deck swiper |
| **Quizzes & challenges** | Quizzes (incl. a "Speaking" answer mode: "Speaking in Catalan", stop/record button) and pass/fail **challenges** ("Correct Answer · Next") | `createQuizQuestionsAI.ts`; DB flags `is_challenge`, `has_passed_challenge` |
| **Pronunciation practice** | Speak the answer; the app listens | `expo-speech-recognition` (on-device/OS recognisers; Android uses the Google service) + `expo-speech` TTS voices per native/learning language (`getVoices.ts`) |
| **Text chat with AI tutor** | Chat in the target language. Each message has copy · speak (TTS) · report · regenerate, plus a mic input. Marketed as "Best AIs for Chats" | OpenRouter (`@openrouter/sdk`): one model gateway for many providers; the "Recommended / Max" tiers on the credits page suggest a model choice |
| **Real-time voice conversations** | "Immersive, in real time Voice Conversations" with an AI tutor that "listens, replies and corrects you in real time" | Priced at **100 credits per minute** (credits page). Its implementation is **not in the public snapshot** (TODO mentions real-time reasoning polyfills) → ask the owner (Q-L5) |
| **Gamification** | XP, achievements (secret ones, rarities), day streaks (7/30), quests, goals-for-session, confetti, haptics | SQL in the README: an `achievements_pool` table, `private.award_achievement_if_missing_tg(...)` trigger functions, RLS ("Disable CRUD for all"), a `private.translate_column` trigger that auto-translates `name`/`description` jsonb |
| **Subscription + AI credits** | Free download → monthly/yearly subscription; a monthly credit allowance (10,000 monthly plan / 10,500 annual) + non-expiring top-ups | `react-native-purchases` (**RevenueCat**), `hooks/subscription/*` (init, purchase, cancel, currency conversion) |
| **Other** | Google + Apple sign-in; push notifications with an iOS Notification Service Extension (`targets/NotificationService.m`, `@bacons/apple-targets`); admin "live notifications" over **Supabase Realtime** (`postgres_changes` on `live_notifications`); analytics (Vexo) with consent flags; offline-persisted TanStack Query cache (async-storage persister) + MMKV; light/dark theme; in-app account deletion (also on the web) | |

**Localization (count carefully; the numbers differ by source)**

| Source | Count |
| --- | --- |
| Shipped iOS binary (App Store "Languages") | **30** |
| Landing site locales | **30**, the same set (ca cs da de el en es fi fr hi hr hu id it ja ko ms nb/no nl pl pt ro ru sk sv th tr uk vi zh) |
| Public snapshot, Lingui catalogs (`src/locales/*/messages.po`) | **70**, `SUPPORTED_LANGUAGES` from af to zu |
| Store listing text itself | translated (PL checked) |

- The safe public claim is **"30 languages"** (store-verifiable).
- "70 locales" is only true for the June snapshot. Ask whether the shipped app trimmed to 30 for quality (Q-L3).
- **Study (target) languages:** the snapshot uses the same `SUPPORTED_LANGUAGES` list for display language and learning language (`getVoices({ displayLanguageLocale, learningLanguageLocale })`). So study languages ≈ UI languages. The shipped number is unverified (Q-L3).

## 4. Related public repos [repo: GitHub API, 2026-10-05]

| Repo | What it is | Stack | Dates / activity | Licence |
| --- | --- | --- | --- | --- |
| [`language-ai`](https://github.com/MuchaSsak/language-ai), described as "my commercial app" | **Linkoglot's own code, as a deliberately partial public snapshot.** `package.json` `"name": "linkoglot"`; `app.config.js` bundle/package `com.linkoglot.app`. README title "Linkoglot \| aplikacja do uczenia się języka". The PL warning in the README says: *"this repo contains only a few features and skips safeguards such as auth / subscription, because I don't want to open-source my actual commercial project."* It also shows a PostgreSQL pattern (achievements: schema, indexes, reusable trigger utilities, trigger optimisation, RLS) | Expo SDK 56, RN 0.85.3, React 19.2, TypeScript 6, NativeWind 4 + Tailwind 3.4, React Native Reusables (`@rn-primitives/*`), TanStack Query 5 (+ persist), Supabase JS 2, Lingui 5, RevenueCat `react-native-purchases` 10, OpenRouter SDK, Reanimated 4, Skia, FlashList 2, MMKV, react-hook-form + zod, React Navigation 7, EAS Build, Bun. 642 files, ≈2.8 MB TS | Created **and** last pushed 2026-06-03, **2 commits** ("initial commit", "docs: add disclaimer"), a one-off dump | `LICENSE.md` is a **Production Type font EULA**, not a code licence (GitHub shows NOASSERTION). The app's fonts are DM Sans (OFL), so this looks like a mis-copied file. Effectively "all rights reserved" |
| [`lingui-translate-ai`](https://github.com/MuchaSsak/lingui-translate-ai) → [npm](https://www.npmjs.com/package/lingui-translate-ai) | CLI: "AI-powered translation, repair, and consistency tooling for Lingui PO files". Translates empty `msgstr`, repairs translations, detects copied English, keeps terminology consistent, preserves placeholders/rich-text tags, patches PO files without reformatting, batches locales, request caps, `.bak` backups, dry-run, confirmation prompt; `init` creates `lingui-translate-ai.json`; plural ICU support since v1.1.0 | TypeScript, commander, gettext-parser, zod, dotenv, picocolors; OpenRouter as provider | Created 2026-06-17, v1.0.0 the same day → **v1.1.0 on 2026-07-10** (4 versions), 15 commits, an auto `npm publish` GitHub Action, 1 star | MIT |
| [`expo-i18n-auth-boilerplate`](https://github.com/MuchaSsak/expo-i18n-auth-boilerplate) | "Fully prepared React Native application with Supabase authentication, testing, internationalization & more!" Very likely the **starting skeleton** of Linkoglot's stack | Expo (expo-router), NativeWind, React Native Reusables, Supabase auth + Google sign-in, Lingui, TanStack Query, Jest + Testing Library + Cypress | 2025-09-24, 3 commits, 1 star | MIT |
| [`lingotype`](https://github.com/MuchaSsak/lingotype) ([live](https://lingotype.vercel.app)) | "A foreign language learning app for vocabulary reinforcement by typing", made with Fabian Dróżkowski ("we had only a short time … the code can be messy") | Next.js, Drizzle ORM, Neon, Better Auth, shadcn/ui, Motion, TanStack Query | 2025-06-09 (one day, 19 commits, v1.0.0→1.0.4) | MIT |

**How they relate (timeline)** [opinion from dates + code]
1. **lingotype** (Jun 2025): first language-learning idea, web, a team of 2.
2. **expo-i18n-auth-boilerplate** (Sep 2025): the Expo + Supabase + Lingui + RNR skeleton.
3. **Linkoglot** development (months). Public snapshot `language-ai` dumped 2026-06-03.
4. The app's in-repo `scripts/translate-llm.js` (OpenRouter + gettext-parser, batches of 100, locale list) was **extracted into `lingui-translate-ai`** on 2026-06-17.
5. Play release 2026-07-10, the same day as `lingui-translate-ai` v1.1.0. App Store release 2026-07-21. v1.0.1 on 2026-07-22 (Play) / 2026-07-29 (iOS).

**npm numbers** [measured: api.npmjs.org, 2026-10-05]
- Last month (2026-09-05…10-04): **40 downloads**. Last week: **13**. 2026-06-01…10-04 total: **943**.
- npm counts include mirrors/bots and the author's own CI installs. They are not a user metric, so don't use them as a proof chip.

**Discrepancy: "no public source code"**
- `language-ai` is public and is clearly Linkoglot (name, bundle id, Supabase project ref in `package.json` scripts).
- Its README says it's a partial snapshot without auth/subscription, so the owner's statement is *mostly* true ("the real commercial code isn't public").
- Ask before linking it from the portfolio (Q-L2).
- Things a reviewer would notice in that public repo:
  - (a) `EXPO_PUBLIC_OPENROUTER_*_API_KEY` env names mean the AI keys are bundled into the client in that snapshot. Fine if production proxies through a server (the credits system suggests it does), but it reads as a red flag to a reviewer.
  - (b) `google-services.json`, `supabase/.temp/linked-project.json` and the Supabase project id are committed. These are not secrets per se, but they are noisy.
  - (c) The font-EULA `LICENSE.md`.
  - (d) `TODO.md` contains blunt notes ("…or else i get sued", mentions of another project "Enrollo").
  - Recommendation [opinion]: either clean it up (README in English, a proper licence, remove TODO/configs) and link it as "selected source", or don't link it at all.

**Other trace:** `context/pstryk-turborepo/.claude/project-info/conventions/coding-guidelines.md` says its rules are "Distilled from our past projects (**Linkoglot — the matured style**; Enrollo; Forwardly AI)". `.gitignore` has `/linkoglot`. So Linkoglot's code style became the reference for a later production monorepo. This is a nice, true line for the case study ("the patterns became my team's coding guidelines"), but confirm the wording with the owner (Q-L9). Nothing else there describes Linkoglot.

## 5. Case-study material (maps to `content/content-model.md` § Case-study body)

**1. TL;DR (draft)**
- Linkoglot is a subscription language-learning app I built alone and shipped to Google Play (2026-07-10) and the App Store (2026-07-21).
- You photograph anything around you and AI turns it into flashcards, quizzes and challenges.
- You then practise in text chats and real-time voice conversations.
- 30 languages. Expo + Supabase + RevenueCat + an LLM gateway. No users yet.

**2. What and for whom**
- Self-directed language learners who "collect words and still freeze when it's time to speak" (store copy).
- The pitch is learning from your own surroundings ("not a generic word list") plus speaking practice.
- Target audience by market or age: not stated (Q-L8).

**3. Before-state**
- The gap the store copy names: vocabulary apps teach decontextualised lists, and speaking practice needs a human.
- No evidence of user research. Ask how the idea started; lingotype (Jun 2025) suggests a longer interest (Q-L8).

**4. What I owned** [owner]
- Everything, solo: product, design, mobile app, Supabase schema/RLS/triggers, AI prompts, payments, store listings, landing site (Next.js, 30 locales), legal docs (privacy/terms PDFs, account deletion page) and an OSS spin-off (npm CLI).
- "Lots coded manually, later a lot with AI" [owner]. Say this plainly; it fits the hiring-perspective research on honest AI use.

**5. Constraints**
- Solo, a few months, own budget. AI costs scale per use, which is why the credits exist.
- Two stores and their reviews, subscriptions on both platforms, 30 locales, the privacy/data-safety forms, account-deletion requirements.
- Exact dates are not verified: development start ≈ after the 2025-09 boilerplate? (Q-L4).

**6. Decisions with rejected options**

Only items with code/listing evidence are listed. The rejected options are inferences to be confirmed.

| # | Decision (evidence) | Likely rejected option | Status |
| --- | --- | --- | --- |
| D1 | **Expo with dev client + CNG/prebuild + EAS Build**. Native extensions (iOS Notification Service Extension) are added via `@bacons/apple-targets` rather than ejecting (`app.config.js`, `targets/`, `eas.json`, `expo-dev-client`) | Bare React Native / ejecting to edit native projects by hand | confirm why (Q-L6) |
| D2 | **One LLM gateway (OpenRouter) with a separate API key per feature** (quizzes vs flashcards). Code comment: "separate the API keys in order to have better insight in the activity panel and token consumption". The default model is set in one constant | Direct single-provider SDK (OpenAI/Anthropic/Google) and one shared key | evidence in code; confirm the trade-off |
| D3 | **Game rules in Postgres, not the client.** Achievements are awarded by `AFTER INSERT/UPDATE` triggers calling `private.award_achievement_if_missing_tg(...)`. The table has RLS with all CRUD disabled. Translations are filled by a `translate_column` trigger | Awarding XP/achievements in the app (cheatable, duplicated per platform) or in Edge Functions | evidence in README SQL |
| D4 | **Subscription + metered AI credits** (monthly allowance, two model tiers, non-expiring top-ups) on **RevenueCat** | (a) Flat unlimited subscription (margin risk on 100-credit/min voice); (b) StoreKit + Play Billing hand-rolled | evidence on the credits page; the reason is a question (Q-L7) |
| D5 | **Lingui + an LLM translation pipeline** (`translate-llm.js` → `lingui-translate-ai`) to localise into 30 (snapshot: 70) languages | Human/agency translation, or i18next + a SaaS TMS | evidence; confirm the cost/time reasoning |
| D6 | **Client-side image downscale (h=1280, JPEG q=0.25) before upload**, so only a compressed photo hits Storage and the model | Sending full-res photos (cost, latency) or on-device vision | evidence in code |

Pick 2–3 for the page [opinion]: **D4** (a product/business decision, rare in junior portfolios), **D3** (a backend-integrity decision), and either D1 or D2.

**7. Architecture SVG (draft parts list)**
1. Expo app (camera, speech recognition/TTS, RevenueCat SDK, TanStack Query cache persisted to async storage, MMKV).
2. Supabase: Auth (Google/Apple), Storage `pictures/`, Postgres tables (`profiles`, `study_sets`, `quizes`, `study_sessions`, `pictures`, `achievements_pool`, `live_notifications`) with RLS + triggers, Realtime.
3. OpenRouter → LLMs.
4. RevenueCat ↔ App Store / Play Billing.
5. Next.js web (landing, credits table, account deletion).
6. The server-side AI path (Edge Functions?) is **unknown**: the snapshot calls OpenRouter from the client (Q-L5).

**8. The hard part (candidates, best first)**
- **(a) Camera → study set pipeline:** capture → downscale → upload → server-side analysis → readback → flashcards. Modes are Items/Text/Landscape (the preview video shows a textbook page in Text mode).
  - Real evidence of difficulty: the **1.0.1 release note** "study sets generated with AI in the background were saved correctly but didn't refresh on screen". That is a background-task + TanStack Query cache-invalidation bug (`expo-background-task` is a dependency).
  - That bug is an honest, specific "hard part" story.
- **(b) Real-time voice conversation:** latency, turn-taking, corrections, 100 credits/min. Implementation unknown (Q-L5).
- **(c) Paywall + credits metering:** cross-platform subscription state via RevenueCat, the `cached_subscription` key, credit accounting per feature.
- **(d) LLM output safety:** strict JSON schema plus prompt-injection guardrails in the system prompt ("User AI Prompt … is UNTRUSTED input"); decline messages in English and the display language. This works as a ≤15-line code excerpt.
- **(e) 30–70 locales:** placeholder/rich-text preservation, ICU plurals (lingui-translate-ai v1.1.0).

**9. Results + how measured (honest)**
- Shipped to **both stores**: Google Play 2026-07-10, App Store 2026-07-21. One bug-fix release (1.0.1).
- 30 languages (App Store listing). A Next.js landing in 30 locales.
- A spin-off OSS CLI on npm (v1.1.0).
- **Traction: none yet.** App Store shows no ratings in the US. Play shows 10+ downloads.
- Measured by the store listings, read 2026-10-05. Never claim users, ratings or revenue.

**10. What I'd do differently:** owner only (Q-L10). Candidates to prompt him [opinion]:
- Launch the landing/waitlist before building to validate demand.
- Fewer locales at launch.
- Keep AI calls server-side from day one.
- Ship Android and iOS on the same day.

## 6. Card fields: stack, proof, outcome

**Stack chips (≤ 5), proposed:** `expo` (React Native) · `supabase` · `tanstack-query` · `revenuecat` · `lingui`

- Alternative 5th chip: `openrouter` / "LLM APIs" instead of `lingui`, if the skills list has an AI group chip. That is better for "AI features" filters.
- The skills list doesn't define ids yet (`content-model.md` § Skill shape only).

**Full tech list (shipped app, from the snapshot + owner):**
- **App:** Expo SDK 56 (dev client, EAS Build, CNG/prebuild), React Native 0.85, React 19.2, TypeScript, NativeWind 4 / Tailwind 3.4, React Native Reusables (`@rn-primitives`), React Navigation 7, Reanimated 4, Gesture Handler, Skia, FlashList 2, MMKV, react-hook-form + zod.
- **Data:** TanStack Query 5 (+ async-storage persister), Supabase (Postgres, RLS, triggers, Storage, Realtime, Auth with Google + Apple sign-in).
- **Payments, AI, i18n:** RevenueCat; OpenRouter SDK (LLMs); Lingui 5 (+ LLM translation script → `lingui-translate-ai`).
- **Device APIs:** expo-camera / image-picker / image-manipulator, expo-speech + expo-speech-recognition, expo-audio, expo-notifications (+ iOS Notification Service Extension via `@bacons/apple-targets`), expo-background-task.
- **Tooling:** Vexo analytics, Bun, ESLint (+ React Compiler and Lingui plugins), conventional-changelog GitHub Action.
- **Web:** Next.js (App Router, `[locale]` routes) + shadcn-style tokens + DM Sans.

**Proof chip candidates** (one is shown; each has a `source`):

| Chip | Source | Verdict |
| --- | --- | --- |
| **"Live on App Store & Google Play"** | `https://apps.apple.com/app/id6768303316`, `https://play.google.com/store/apps/details?id=com.linkoglot.app` | **recommended** |
| "30 languages" | App Store `languageCodesISO2A` (30) + landing hreflang (30) | good second; can sit in the copy |
| "Shipped solo · idea → both stores" | owner statement | ok as copy, weaker as a "proof" chip (not externally checkable) |
| "Spin-off npm CLI: lingui-translate-ai" | npmjs.com package page | good for the OSS row, not this card |
| ~~downloads / ratings / npm downloads~~ | | **never**: 10+, 0 ratings, 1 PL rating, bot-inflated npm counts |

**Outcome-line options** (the result, not features; no traction claims):
1. "Shipped a subscription AI language app to the App Store and Google Play — solo, in 30 languages."
2. "Took a snap-a-photo-to-flashcards idea from blank repo to both app stores, alone, in a few months."
3. "Built and launched a full AI product end-to-end: camera, voice, payments and 30 locales — one developer, two stores."

Recommended: #1 (the most checkable; every noun is on the store page). PL versions are for the owner to approve.

**Other card fields:**
- `context: product`
- `role:` "Solo founder-developer" (wording to confirm)
- `team: solo`
- `year: 2026`
- `status: live`
- `links.store` = both URLs
- `links.live` = `https://www.linkoglot.eu/en` (if the owner agrees, Q-L1)
- `links.code` = omit, or a cleaned `language-ai` (Q-L2)
- `links.npm` = no (it belongs to the separate OSS entry)
- `nda: L0` (own product)
- `rights: { holder: "Mateusz Muszarski", permission: yes, note: "own product" }`
- `featured: 2` (the dossier calls it flagship #2)

## 7. Theme proposal for the project sheet (`design/design.md` § Per-project themes)

**Real brand colours** [measured: pixels sampled from `icon-ios.png` and the store screenshots; CSS tokens read from linkoglot.eu]

| Source | Colours |
| --- | --- |
| App icon | a vertical gradient **#FD9E1E (amber, top) → #FB8D20 (mid) → #FD4438 (coral red, bottom)**; white rounded "L" glyph with a two-dot "spark" |
| In-app UI (screenshots) | near-black **#0A0A0A–#101010** surfaces; primary **#FFD138** yellow (shutter mode chip, "taking pictures" headline); success green ≈ #20C050 |
| Per-feature screenshot accents | orange (Pronunciation) · green (Flashcards) · purple (Chats) · cyan (Voice) · red (Challenges) |
| Web tokens | `--primary: 46 100% 61%` = **#FFD138**, `--background: 0 0% 93%` = #EDEDED, `--foreground: 0 0% 4%` = #0A0A0A, radius 1.25rem |
| Font | **DM Sans** (app + web; OFL) |

**Proposal: "index-card stock"**
- Flashcards are index cards, so the sheet's paper *is* the subject. That keeps it inside the drafting paper/ink system (design.md lists kraft/graph/black board as stocks).
- Contrast is WCAG-computed this session.

| Token | Light sheet | Dark sheet (cyanotype mode, or the "black board" option) | Notes |
| --- | --- | --- | --- |
| `paper` | **#FBF6EA** index-card cream, faint ruled lines + a single top rule in accent | **#0E0C0A** warm black board (≈ the app's #0A0A0A) | |
| `ink` | **#1A1612** (16.68:1 on paper) | **#F4EFE6** chalk (17.05:1) | |
| `accent` | **#C2410C** for text/stamps (4.80:1); brand **#FD4438** only for non-text strokes (3.21:1, ≥ 3:1 graphics) | **#FFD138** brand yellow (13.41:1); #FD9E1E for strokes (9.38:1) | proof stamp + motif highlight |
| `motif` | see below | same drawing, inverted ink | |
| `typeAccent` | DM Sans 900 for the project title only (the app's real typeface) | same | optional |
| `motion` | `snap`: a 120 ms shutter, then a card flip | same | reduced motion = final frame |

Alternative if the owner wants the sheet to look like the app: dark-only "black board" (#0E0C0A / #F4EFE6 / #FFD138) in both site themes. It is closer to the brand but loses the index-card concept.

**Motif (code-drawn SVG): "viewfinder → flashcard"**
1. A line drawing of a potted plant on a table. "La maceta" is the real label from screenshot 1.
2. Four camera **viewfinder corner brackets** (the app's camera UI) contract onto it.
3. The shutter ring fires.
4. The floating label bubble "🇪🇸 la maceta" detaches and **folds into an index card**: front "la maceta", back "flowerpot", with Example and Explanation lines as ruled text.
5. Drafting callouts:
   - dimension line **"h = 1280 px · q 0.25"** (the real resize constants from `analyzePicture.ts`)
   - part tags "Part 01 Camera · Part 02 Storage · Part 03 LLM · Part 04 Study set"
   - the three mode chips drawn as labels: Landscape · Text · Items
6. Reduced motion shows the final composed drawing: brackets + card side by side.

**Media**
- `media.kind = phone`: a portrait frame beside the copy, with store badges as links.
- Device frame dimension label: use the real capture size (e.g. "1242 × 2688" for the store shots, or the owner's device when he records).

**Shot list for the owner to record** (real device, portrait, 30–60 fps, muted, 6–12 s loops; a test account with no personal data; clean status bar via iOS Simulator `status_bar override` or Android demo mode; app language EN, plus 1–2 PL stills):

1. **Hero loop (poster = cards frame):** open camera → Items → frame a real object → shutter → labels appear → "create study set" → generated flashcards slide in. *The current App Store preview shows only the viewfinder, never the result. This shot fills that gap.*
2. **Text mode:** point at a textbook page (as in the preview) → vocabulary extracted → card list.
3. **Flashcards:** swipe 3–4 cards; flip one showing Example + Explanation.
4. **Speaking quiz:** question → mic → speak → "Correct Answer" → Next (shows speech recognition).
5. **Voice conversation:** 8–10 s of the real-time call screen with the transcript visible (it's a muted loop).
6. **Text chat:** a grammar question → reply → tap the speaker (TTS) icon.
7. **Challenge passed** → confetti → achievement/XP toast + day streak.
8. **Paywall** with trial + **AI credits balance** (stills; they show the business model).
9. **Language picker** scroll (proves "30 languages"), plus the same home screen in PL (still).
10. **Light vs dark** home/library pair (stills).
11. Optional: the Next.js landing at 390 and 1440 (for a `both` variant later).

## 8. Temporary media saved [measured]

Everything below is a **temporary placeholder** (the owner's own app assets, taken from his store listings / site). Replace it with the owner's recordings (§ 7 shot list) before launch. Folder: `C:\Users\Mucha\Desktop\new-portfolio\assets\projects\linkoglot\`

| File | What | Size / resolution | Status |
| --- | --- | --- | --- |
| `store-ios-01.jpg` … `store-ios-06.jpg` | App Store screenshots, EN, in listing order (pictures · pronunciation · flashcards · chats · voice · challenges) | 1242×2688 (the max mzstatic serves; originals are PNG), 480–640 KB each | temporary placeholder |
| `store-play-01.png` … `store-play-06.png` | Google Play screenshots, same 6 designs | 1080×1920 PNG (original, `=s0`), 1.4–2.3 MB each | temporary placeholder |
| `icon-ios.png` | App icon from the App Store | 1024×1024 PNG (white corners around the squircle) | temporary placeholder |
| `icon-play.png` | App icon from Google Play | 512×512 PNG (RGBA) | temporary placeholder |
| `store-ios-preview.mp4` | App Store app-preview video, **audio stripped**; camera viewfinder over 7 scenes | 332×720 H.264, 30 fps, 15.5 s, ≈2 MB (the best variant the web HLS offers) | temporary placeholder (too low-res for the final loop) |
| `store-ios-preview-poster.jpg` | The preview's poster frame | 886×1920 | temporary placeholder |
| `store-page-ios-1440.png`, `store-page-ios-390.png` | Playwright screenshots of apps.apple.com/us/app/linkoglot/id6768303316 | 1440×900 / 390×844 viewport | temporary placeholder (reference only) |
| `store-page-play-1440.png`, `store-page-play-390.png` | Playwright screenshots of the Play listing (hl=en, gl=US) | 1440×900 / 390×844 viewport | temporary placeholder (reference only) |
| `landing-1440.png` | linkoglot.eu/en above the fold | 1440×900 | temporary placeholder (reference only) |

- A `raw/` subfolder already existed (empty). I didn't touch it.
- The Play Fest banner that the store page also loaded was downloaded by mistake and deleted. It is not the app's.
- Store-badge usage rules: `legal/compliance-and-data.md` (per the dossier).

## Open questions for the owner

- **Q-L1:** `https://www.linkoglot.eu/en` is a full landing in 30 locales (features, how-it-works, credits table, legal). Did you mean "no landing page"? May the portfolio link it as `links.live`?
- **Q-L2:** `github.com/MuchaSsak/language-ai` is public and is Linkoglot (a partial snapshot, 2026-06-03, README says auth/subscription are stripped). Link it, clean it up first (English README, a real licence instead of the Production Type font EULA, drop TODO.md / google-services.json / `supabase/.temp`), or keep it unlinked/private?
- **Q-L3:** How many UI languages does the shipped app have: 30 (store/landing) or 70 (the June snapshot's Lingui catalogs)? Are study languages the same list?
- **Q-L4:** When did development start and how many months did it take (for "Constraints")? Was `expo-i18n-auth-boilerplate` (Sep 2025) the starting point?
- **Q-L5:** How do production AI calls run? Client-side OpenRouter (as in the snapshot) or server-side (Edge Functions) with credit checks? How is the real-time voice conversation built (provider/model, WebRTC/WebSocket)? Which models sit behind "Recommended" and "Max"?
- **Q-L6:** Why Expo (dev client + CNG + EAS) rather than bare RN? Anything that nearly forced you to eject?
- **Q-L7:** Why RevenueCat over StoreKit/Play Billing directly? Why add AI credits on top of the subscription? What are the trial length and prices (store IAP range $2.49–$49.99 / 10,99–229,99 zł)?
- **Q-L8:** Who is it for (market, level, age), and where did the idea come from? Any user testing or feedback since launch?
- **Q-L9:** May the case study say Linkoglot's code style became the coding guidelines of a later production monorepo (pstryk-turborepo calls it "the matured style")? Is that a client/employer project that must stay unnamed?
- **Q-L10:** What would you do differently?
- **Q-L11:** Which part do you consider the hardest: the camera pipeline, voice, the paywall/credits, or the 1.0.1 background-refresh bug? Can you share a ≤15-line excerpt you're happy to publish?
- **Q-L12:** Which "TikTok @linkoglot" content exists? Is any of it usable as media?
- **Q-L13:** May the portfolio show the Play "10+ downloads" or state "no users yet" explicitly in copy, or just omit traction?

## Not covered

- In-app screens beyond the store creatives. I did not install the app or log in, so the paywall, trial length, prices and in-app flows are unverified.
- App Store version history before 1.0.1 (the web shows the current version only).
- Real-time voice implementation and production backend (Edge Functions, server code). Neither is in the public snapshot.
- Contents of the Privacy Policy / Terms PDFs (not read).
- The TikTok account.
- Play Store "Permissions" detail.
- iPad layout (`supportsTablet: true` in config, but the store says "Only for iPhone").
- No WebSearch was used (budget preserved).
