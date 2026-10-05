# Antoine Wodniack (AW Portfolio): creative developer, France

- **Live:** https://wodniack.dev/
- **Awwwards:** https://www.awwwards.com/sites/aw-portfolio. **Site of the Day, Dec 12, 2024.** SOTD **7.56** (Design 7.53 · Usability 7.30 · Creativity 7.96 · Content 7.69). Developer score **7.58** (Semantics 7.2 · Animations 8.4 · Accessibility 6.2 · WPO 7.8 · Responsive 7.8 · Markup 7.6). The site also appears in Awwwards' portfolio-winners listing (https://www.awwwards.com/websites/winner_category_portfolio/).
- **Role:** "Creative Developer specializing in animation-driven, high-impact websites. Partnering with designers…" (Awwwards description). The site lists its own awards: 2025 Webby winner (Best Home Page), Awwwards SOTD ×16, Honors ×1, FWA SOTD ×4 / MOTD ×2. These are self-reported and I didn't verify them.
- **Tags on Awwwards:** Technology, Experimental, Minimal, Portfolio, Retro, Scrolling, Single page, Typography.

## Practicality verdict
**Practicality 4/5 · Wow 4/5.** Text paints at 0.5 s, but the intro choreography (logo stroke-draw, "PREPARING" label) keeps the nav un-clickable until **5.8 s** on desktop and **7.6 s** on throttled mobile [measured]. Projects: **1 click** (WORK anchor). Contact: **0 clicks** ("Hire me" `mailto:` in the header, plus "Available for freelance work → Hire me"). Mobile: **works**, with a purpose-built header. Weight: **0.48 MB** [measured], the lightest high-wow site in the sample. Minus one point for the gated intro and a 24-screen single page with no sticky nav.

## Visual style
- Two colours only: saturated crimson/red (#f0123f-ish) and near-black. Full-bleed, with a hairline black grid that frames every module, like a technical spec sheet or a ticket.
- Type: ultra-condensed black display caps ("CREATIVE ✦ DEVELOPER" across the full width), a condensed serif for the secondary lines ("Coding globally from France."), and mono binary strings (`1010011…`) as decorative rules.
- Hero: a canvas of hundreds of vertical lines warped by a moving sine field (the cursor bends them). On scroll, the grid turns into a 3D perspective tunnel (desktop-2 shot) that leads into AWARDS / WORK modules. A vertical "WORK" pill sits on the grid.
- Extras: a contrast toggle (◐), a QR code in the header, CodePen and LinkedIn icons.

## Navigation
- Header row: logo · ABOUT · WORK · CONTACT (anchors) · CodePen · LinkedIn · contrast toggle · location line · "Hire me".
- The header **doesn't stick**. After scrolling there are no fixed nav elements [measured], so returning to the menu means scrolling back up. The document is **24 screens tall** on desktop and 23 on mobile [measured].
- No per-project URLs: projects link out to the live sites (waaark.com, incredibles.dev, …).

## How projects are shown
Inside the single page: about, awards grid, then WORK with 34 `<video>` elements [measured] (looping previews) and outbound links to the live sites. No case studies.

## Mobile
Works. The header is rebuilt as an icon grid (logo · CodePen · in · **Hire me** · contrast) so the hire CTA keeps first-row priority. The hero lines canvas still runs, and the giant type wraps to two lines. No overflow [measured].

## Preloader / weight [measured]
- No separate preloader screen. The intro is an animated header/logo draw of about 5–6 s while content is already readable.
- Desktop: 0.25 MB at load (JS 0.07 MB), 0.48 MB after scroll. Load event 1.0–1.7 s. Mobile: 0.48–0.86 MB (lazy videos).

## Steal
- **Strict two-colour system + hairline grid.** It gives a strong identity at near-zero bytes, using CSS and a small 2D canvas instead of 3D.
- **Cursor-reactive line field** as the hero signature: one cheap canvas, instantly "developer-made".
- **"Hire me" + availability line in the header on every breakpoint.**
- **Binary/mono microtype as rules and dividers.** It signals "developer" without stock code imagery.

## Skip
- Gating nav clicks behind a 6 s intro.
- A 24-screen single page with a non-sticky header. Use separate routes or a sticky mini-nav.
- Outbound-only project links with no role or stack context.

Screenshots: `img/antoine-wodniack-desktop.jpg`, `img/antoine-wodniack-desktop-2.jpg` (scroll → 3D grid tunnel + awards), `img/antoine-wodniack-mobile.jpg`.
