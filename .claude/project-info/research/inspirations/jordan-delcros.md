# Jordan Delcros: creative developer (France), portfolio built to launch a freelance career

- **Live:** https://jordan-delcros.com/
- **Awwwards:** https://www.awwwards.com/sites/jordan-delcros-portfolio. **Site of the Day, May 28, 2025.** SOTD **7.47** (Design 7.28 · Usability 7.30 · **Creativity 8.22** · Content 7.27). Developer score **7.28** (Semantics 7.0 · Animations 8.0 · Accessibility 6.4 · WPO 7.6 · Responsive 7.2 · Markup 7.2).
- **Awwwards description (his own):** "I rebuilt my portfolio to showcase my top projects and highlight my skills in WebGL, animation, and interactive development to mark the start of my new journey as a freelance developer." That's the same goal as ours, which makes it a useful comparison.
- **Tags (Awwwards):** Technology, Animation, Clean, Unusual Navigation, 3D, Gestures/Interaction.

## Practicality verdict
**Practicality 1/5 · Wow 5/5.** A progress-bar preloader with jokey status lines ("Making pixels fall into place", "Building suspense", "Simulating speed", "Hacking the mainframe (not really)") runs about **20 s** on a GPU desktop. Then a **"DISCOVER PORTFOLIO" button gate** has to be clicked [measured]. All content is rendered in WebGL: the DOM text is empty after entering, and the only HTML link is LinkedIn [measured]. Projects: about 2 interactions + scroll. Contact: LinkedIn icon only, with no email found. Mobile: still on the preloader ("BUILDING SUSPENSE") at about 6 s, and the throttled probe found nothing usable in 30 s [measured]. Weight: **0.28 MB at load → 10.6 MB** desktop (4.3 MB 3D) / 4.5 MB mobile [measured].

## Visual style
- After the gate: a pale blue-grey **tabletop / scrapbook scene** seen from above. A chrome-extruded "JORDAN" logo sits over gold italic "CREATIVE DEVELOPER". **Polaroid-style project cards** ("Coastal World — Hello World!"), **3D keyboard keycaps spelling the project name**, a **handwritten notebook page** explaining the build ("…the biggest project I've ever worked on, five developers… building the physics engine… runs in a subthread… Mesh-BVH…"), low-poly boat and car renders, and a 3D phone.
- The minimal chrome is just a hamburger (top-left) and a LinkedIn icon (top-right).

## Navigation
Scroll-driven camera over the desk plus the hamburger menu. There are no URLs per project (still `/` after scrolling [measured]).

## How projects are shown
This is the best part. Each project is a **physical-feeling dossier**: cover polaroid, keycap title, gameplay renders, and a **handwritten technical note about *his* contribution** (physics engine, threading, libraries). It's case-study storytelling done in 3D.

## Mobile
Very slow to first content: a long preloader, then the same WebGL-only content [measured].

## Preloader / weight [measured]
About 20 s preloader plus a click gate on desktop. DCL/load 0.8 s for a 0.28 MB shell, then about 10 MB of assets.

## Steal
- **"What I built" notes in a handwritten or annotation style** per project: technical contribution and team size, told like a lab notebook. Do it in HTML text.
- **Project title as tactile keycaps**: a cheap 3D or CSS signature tied to "developer".
- **Witty loader microcopy**, only if the loader lasts under 1 s.

## Skip
- A 20 s preloader plus a click gate, for a site meant to win clients or jobs.
- WebGL-only text (not selectable, crawlable or screen-readable) and no email.

Screenshots: `img/jordan-delcros-desktop.jpg` (preloader), `img/jordan-delcros-desktop-2.jpg` (after gate + scroll: project desk scene), `img/jordan-delcros-mobile.jpg` (preloader).
