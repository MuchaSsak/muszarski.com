# Project: Linkoglot — "Real Studying with AI."

> Dossier for flagship #2. Owns this project's facts, story angles, theme, rights and shot list.
> Fields: `content-model.md`. Raw research (store listings, 11-shot list, 13 owner questions Q-L1…Q-L13):
> `research/2026-10-05-project-linkoglot.md`.

## Facts

| Fact | Value | Source |
| --- | --- | --- |
| What | AI language learning: generated flashcards, quizzes, challenges, text chats, voice practice; snap a photo → study material | [user], store listings |
| Context | own product, solo, a few months; hand-coded first, later a lot with AI | [user] |
| Stores | App Store id 6768303316 (released 2026-07-21) · Google Play `com.linkoglot.app` (released 2026-07-10) · both v1.0.1 | [research: stores] |
| Redirect | `linkoglot.eu/Download` → App Store on iPhone, Play for everyone else | [research] |
| Model | free download → **free trial** → monthly/yearly subscription (Play in-app $2.49–$49.99 / 10,99–229,99 zł). The trial is real [user 2026-10-05]; the store text doesn't mention it, the website says "free to try". Trial length Unknown (Q38) | [user], [research] |
| Listing | Productivity (+Education) · 4+ / Everyone / PEGI 3 · 114.1 MB · **30 languages** | [research] |
| Traction | effectively none: 10+ Play downloads, no US ratings. Never quote downloads or ratings | [user], [research] |
| Stack (owner-stated) | Expo React Native, NativeWind, TanStack Query, Supabase, React Native Reusables, RevenueCat, Lingui | [user] |
| Landing | **exists:** www.linkoglot.eu/en (Next.js, 30 locales, AI-credits price table). The owner said there was none (Q38) | [research] |
| Code | private. The stripped public snapshot `MuchaSsak/language-ai` (AI keys client-side via `EXPO_PUBLIC_*`) was **made private by the owner on 2026-10-05**; key rotation and the shipped app's keys are still open (Q37) | [research], [user] |
| Spin-off | its `scripts/translate-llm.js` grew into the npm package **`lingui-translate-ai`** (v1.1.0) | [research] |
| Style note | the pstryk coding guidelines call Linkoglot "the matured style" | [repo: context/pstryk-turborepo] |
| Why Expo (Q-L6) | he knew React + TypeScript; one codebase for two stores; tooling speed (dev builds, EAS); Expo-ready libraries | [user 2026-10-14] |
| Machine | built and shipped from a **Windows PC**; never opened Xcode or Android Studio (iOS builds on EAS). Bought an iPhone to test next to his Android phone: "expo go sucks and you need those dev builds" | [user 2026-10-14] |

## Card candidates

- **Outcome** (recommended first):
  1. "Shipped a subscription AI language app to the App Store and Google Play — solo, in 30 languages."
  2. "Took a snap-a-photo-to-flashcards idea from blank repo to both app stores, alone, in a few months."
  3. "Built and launched a full AI product end-to-end: camera, voice, payments and 30 locales."
- **Proof chip:** "Live on App Store & Google Play" (alt: "30 languages").
- **Stack chips:** Expo · React Native · Supabase · RevenueCat · Lingui.
- **Context tag:** "Own product".
- **Status:** "Live, pre-traction".

## What it proves

- Shipped a real product to both stores: review processes, listings, subscription paywall.
- Product + monetisation thinking (RevenueCat: free trial → monthly/yearly plans).
- AI features beyond chat: camera → study material; voice practice.
- i18n at scale (30 locales) → his own npm tool (`lingui-translate-ai`).

## Presentation

- **Media kind:** `phone`. The phone is drawn front-on with a dimension line, plus 2 DETAIL callouts.
  - Desktop: a QR stamp + badges.
  - Phone: the visitor's OS badge first.
  - Badges: official artwork, unmodified, Apple first, equal size (`legal/compliance-and-data.md`).
- **Theme "index-card stock":**
  - light: paper `#FBF6EA`, ink `#1A1612`, accent `#C2410C`
  - dark: `#0E0C0A` / `#F4EFE6` / `#FFD138`
  - from the icon gradient `#FD9E1E→#FD4438` and the app's yellow `#FFD138`; contrast checked [research]
  - motif: viewfinder brackets snap a plant into a "la maceta" flashcard
- **Temporary media** (`assets/projects/linkoglot/`):
  - store screenshots `store-ios-01…06`, `store-play-01…06`
  - icons
  - `store-ios-preview.mp4` (332×720 only)
  - store-page and landing captures
  - The owner's own app, so it's fine as interim; replace with recordings (11-shot list in research). `placeholders.md` P8.

## Open (project-specific)

Q37 (key rotation) · Q38 (landing link, trial length) · decisions to tell (Expo vs bare, RevenueCat vs own
billing) · what he'd do differently · Q-L1…Q-L13 in the research file.
