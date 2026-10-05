# Rafa de las Heras ("RAFA / OS") — design · development · automation · AI (Spain)

- **Live:** https://rafaheras.dev/
- **Awwwards:** https://www.awwwards.com/sites/creative-developer-portfolio-2 — **Honorable Mention, Aug 17, 2025** ("Creative Developer Portfolio"; Awwwards blurb: "A timeline of web designs that tell stories, break patterns, and push pixels with personality"). No jury scores shown (HM). ⚠ The live site today is the "RAFA / OS" concept; the awarded Aug-2025 version may have looked different [unknown].
- **Role:** "Rafa de las Heras — Design · development · automation · AI" (site).

## Practicality verdict
**Practicality 3/5 · Wow 4/5** — desktop is slow: first clickable control at **12.5 s**, load event 14 s, 2.75 MB (2.2 MB images, 91 requests) in my GPU run [measured]; but an **"Enter directly →" skip button** (top-left) and **"Skip to content / Skip to desktop"** links bypass the scene. Mobile is excellent: **1.6 s** to a usable "01 Projects" tile on throttled mobile, **0.38 MB** [measured]. Projects **1 click** (`projects/` folder, 15 items); contact **1 click** (Contact window: email, WhatsApp, LinkedIn, Instagram) — `mailto:` is in the DOM from the start; mobile **works (best-in-sample adaptation)**.

## Visual style
- Desktop entry: a **photoreal, moody 1990s hacker den** — beige CRT PC with "UNIX"/"TCP/IP"/"2600" stickers, red neon kanji sign, desk lamp, rain-streaked city window, sticky notes, coffee, pizza box; red power LED; a "⏻ Turn on computer" button bottom-centre; ES/EN toggle + mute top-right. Sound-designed (fly you can "shoo").
- After "Turn on computer"/"Enter directly": a **green-phosphor terminal OS** — dark olive grid, mono type, "RAFA / OS ▾", `/home/rafa/`, items `README.txt`, `About me`, `Contact`, `projects/ 15`, `tools/`, a taskbar with clock, "← Back to the room", "Shut down".
- Mobile skips the room and opens the OS as **big tappable tiles** (01 Projects — WEB / ARCHIVE ↗ · 02 About me — RH-001 / DOSSIER · 03 Contact — LET'S TALK) in lime-on-black.

## Navigation
- Scene → OS desktop (windowed). Persistent taskbar after entering [measured: `nav.taskbar` fixed]. "← Back to the room" returns to the 3D scene — the spectacle is optional and reversible.
- Accessibility affordances: skip links ("Skip to content", "Skip to desktop"), language toggle, mute.
- Downloadable **dossier PDF** per project (`/downloads/projects/coduck-en.pdf`) [measured].

## How projects are shown
`projects/` folder (15) opening windows with project info, "Visit website ↗", "Download dossier ↓".

## Mobile
**Different, lighter product**: no 3D room, direct OS tiles, 0.38 MB vs 2.75 MB desktop [measured]. This is the strongest "progressive spectacle" pattern in the sample.

## Preloader / weight [measured]
No explicit preloader screen; the room assets (2.2 MB images) delay first interaction on desktop to ~12 s in my run. Mobile fully usable in 1.6 s throttled.

## Steal
- **Skip button on the spectacle** ("Enter directly →") + **"Back to the room"** — immersion as opt-in, never a gate.
- **Mobile gets the hub, desktop gets the scene** — same IA, different presentation, 7× lighter.
- **OS/terminal metaphor = native developer theme**: README.txt as About, folders as projects, tools/ as stack.
- **Per-project PDF dossier** — recruiter-friendly artefact to forward internally.

## Skip
- Letting a heavy scene delay the skip button itself (12 s) — render the skip/nav in HTML first, load the scene after.
- Fly/sound gimmicks without an obvious mute state on first load.

Screenshots: `img/rafa-heras-desktop.jpg` (room scene + "Enter directly"), `img/rafa-heras-desktop-2.jpg` (after skip: RAFA/OS desktop), `img/rafa-heras-mobile.jpg` (mobile hub tiles).
