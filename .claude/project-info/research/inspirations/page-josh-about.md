# Josh W. Comeau: about page bento of personal facts

Date: 2026-10-05 · Page type: /my-life · URL: https://www.joshwcomeau.com/about-josh/
Screenshots: `img/page-life-josh-about-1440.jpg`, `-390.jpg`, `img/page-life-josh-about-cards-1440.jpg`

## What works [measured]
- **Hero:**
  - a dark band with H1 "Hi there! I'm Josh.";
  - three short career-fact paragraphs ("building on the web since 2007", "senior positions at Gatsby (acq. Netlify), DigitalOcean, Khan Academy", "solo indie hacker");
  - a cut-out photo of him on stage;
  - a cloud-shaped divider.

  On mobile the photo fills the screen behind the H1.
- **Bento of light-blue cards.** Each card holds one fact and one visual:
  - a map: "I'm from Montréal, roughly 6,192 km away from your current location" (IP-based), with a credit "Thanks to Jane for this whimsical idea!";
  - pronouns;
  - **pronunciation "kəum əʊ" with a 🔊 button**;
  - "I'm 188 cm tall" with a stick figure;
  - QWER keycaps, for his open-source packages ("~600,000 downloads/month");
  - a desk photo: "6 months unable to use a keyboard, learned to code by voice";
  - a talk photo;
  - "cat person allergic to cats";
  - a career-switch story.
- Mascot stickers (a cat, a box character) peek from the edges.

## Steal
- Card anatomy: **one concrete, specific fact + one visual**, and some facts double as proof (npm downloads).
- A pronunciation-with-audio card.
- Map cards for "where I'm from".
- Mixed card sizes in a grid, with no overlapping.

## Skip / adapt
- **IP-based distance.** It needs geolocation, which means a privacy notice and possibly a third party. Use a static "Poland · CET" instead.
- Mascots: those are Josh's brand. Draw the cards in the site's own line-art style instead.
- `og:description` here is the site default, and there's no JSON-LD. Give `/my-life` its own `AboutPage` markup.
