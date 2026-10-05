# swyx: about page with intro-length tabs and a "what brings you here" router

Date: 2026-10-05 · Page type: /my-life, about · URL: https://www.swyx.io/about
Screenshot: `img/page-life-swyx-about-1440.jpg`

## What works [measured]
- **Header block:**
  - a photo with a caption ("Out of office, Niseko.");
  - "Hey, I'm swyx." with "Pronounced 'swicks'. Shawn works too." underneath;
  - **"Intro: Short · Medium · Long"** tabs plus a **"Copy intro"** link.
- **"WHAT BRINGS YOU HERE?"**: a numbered two-column router.
  - Something to read
  - What I'm building
  - Building a company?
  - Sponsor my work
  - **Bio & photos**
  - The longer story
- **Italic sidenotes** in the right margin ("'swyx' is the initials of my English and Chinese names…").
- Numbered H2 sections matching the router. A ⌘K search box sits in the header.
- **JSON-LD:** `ProfilePage` (`@id` `#profile`) whose `mainEntity` is a `Person` (`@id` `#person`, `alternateName` "swyx", `image`, `sameAs`). This is exactly the pattern Google's ProfilePage docs describe for personal About pages.

## Steal
- **Short / Long intro + Copy.** Recruiters and meetup organisers paste bios, so this is direct utility.
- A pronunciation line: "Muszarski · /muˈʂar.ski/ 🔊".
- A router at the top of a long page.
- Sidenotes on wide screens that fall back inline on mobile.
- A "Bio & photos" press-kit link (approved headshots).

## Skip
- The "Live readers" presence pill.
- Long numbered essays on the About page. /my-life should stay light.
