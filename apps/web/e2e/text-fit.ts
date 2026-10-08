/**
 * The text-fit probe (working-agreement.md § 2, visual-qa.md § Locales): runs inside the page and lists text that
 * does not fit its box. Every locale gets it at every width because Polish and Spanish run longer than English
 * (a 6.5em label held "Also shipped" but not "Wypuściłem też", 2026-10-08).
 *
 * - `spill`: text pokes out of the box that draws it (a background, border or shadow) or out of a clipping box
 * - `clip`: an `overflow: hidden | clip` box cuts text off (no ellipsis)
 * - `offscreen`: text past the viewport edge (`body { overflow-x: clip }` hides it from the scroll-width check)
 * - `word-break`: a word split across two lines with no hyphen
 * - `overlap`: two pieces of text drawn on top of each other
 * - `covered`: an opaque box (a tag, a picture) drawn over text
 *
 * Opt out per element with `data-textfit="skip"` (decorative or scrolling text) or `data-textfit="stack"` (a layer that
 * sits over other text on purpose: the photo deck, the sticker on the name, the phone breaking into a title; its own
 * text is still checked for spill and clipping), with a comment saying why.
 */
export type TextIssue = {
  kind: "spill" | "clip" | "offscreen" | "word-break" | "overlap" | "covered";
  where: string;
  text: string;
  px: number;
};

export function findTextIssues(): TextIssue[] {
  const issues: TextIssue[] = [];
  const vw = document.documentElement.clientWidth;
  const TOL = 1.5;

  const where = (el: Element): string => {
    const parts: string[] = [];
    for (let node: Element | null = el; node && node !== document.body && parts.length < 4; node = node.parentElement) {
      const cls = [...node.classList].filter((c) => !c.startsWith("astro-")).slice(0, 2);
      parts.unshift(node.tagName.toLowerCase() + (node.id ? `#${node.id}` : "") + (cls.length ? `.${cls.join(".")}` : ""));
      if (node.id) break;
    }
    return parts.join(" > ");
  };
  const snippet = (s: string) => s.replace(/\s+/g, " ").trim().slice(0, 60);
  const skipped = (el: Element) => !!el.closest("[data-textfit='skip'], script, style, noscript, template, svg title");
  // Visually hidden text (sr-only: a clipped 1 px box) is for screen readers; layout sizes, because a tilted
  // parent makes the 1 px box's on-screen rect wider than 1 px.
  const visible = (el: Element) => {
    if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
    for (let node: Element | null = el; node && node !== document.body; node = node.parentElement) {
      if (getComputedStyle(node).clipPath === "inset(50%)") return false;
      if (
        node instanceof HTMLElement &&
        getComputedStyle(node).display !== "inline" &&
        (node.offsetWidth <= 1 || node.offsetHeight <= 1)
      )
        return false;
    }
    return true;
  };
  const inSvg = (el: Element) => el instanceof SVGElement;
  const placed = (from: Element, to: Element) => {
    for (let node: Element | null = from; node && node !== to; node = node.parentElement) {
      if (/absolute|fixed/.test(getComputedStyle(node).position)) return true;
    }
    return false;
  };

  // An open popover or modal covers the page: only its own text is on screen.
  const layerOnTop = document.querySelector(":popover-open, dialog:modal");

  // Every visible text node, with its line boxes.
  const texts: { node: Text; el: Element; rects: DOMRect[] }[] = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
    if (!node.data.trim()) continue;
    const el = node.parentElement;
    if (!el || skipped(el) || !visible(el)) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    const rects = [...range.getClientRects()].filter((r) => r.width > 0.5 && r.height > 0.5);
    if (rects.length && (!layerOnTop || layerOnTop.contains(el))) texts.push({ node, el, rects });
  }

  // spill / clip: a box narrower or shorter than the text inside it. Layout sizes ignore transforms, so the
  // candidate test is exact; the text is then measured with the transforms on the box's ancestors switched off.
  const boxes = new Set<Element>();
  for (const { el } of texts) {
    for (let node: Element | null = el; node && node !== document.body; node = node.parentElement) boxes.add(node);
  }
  const drawn = (cs: CSSStyleDeclaration) =>
    (cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent") ||
    cs.backgroundImage !== "none" ||
    cs.boxShadow !== "none" ||
    parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth) + parseFloat(cs.borderTopWidth) > 0;
  for (const box of boxes) {
    if (skipped(box) || !visible(box)) continue;
    const cs = getComputedStyle(box);
    if (cs.display === "inline" || cs.display === "contents") continue;
    const clips = /hidden|clip/.test(cs.overflowX + cs.overflowY);
    const scrolls = /auto|scroll/.test(cs.overflowX + cs.overflowY);
    if (scrolls || !(clips || drawn(cs))) continue;
    const overX = box.scrollWidth - box.clientWidth;
    const overY = box.scrollHeight - box.clientHeight;
    if (overX <= TOL && overY <= TOL) continue;
    if (clips && cs.textOverflow === "ellipsis") continue;
    if (clips && cs.webkitLineClamp !== "none" && cs.webkitLineClamp !== "") continue;
    // Switch transforms off up the chain so rects are layout rects.
    const chain: { el: HTMLElement; style: string | null }[] = [];
    for (let node: Element | null = box; node; node = node.parentElement) {
      if (node instanceof HTMLElement) {
        chain.push({ el: node, style: node.getAttribute("style") });
        // A transition outranks !important: without this, a transformed box keeps its old turn for the read.
        node.style.setProperty("transition", "none", "important");
        node.style.setProperty("transform", "none", "important");
        node.style.setProperty("rotate", "none", "important");
        node.style.setProperty("scale", "none", "important");
        node.style.setProperty("translate", "none", "important");
      }
    }
    const b = box.getBoundingClientRect();
    const left = b.left + box.clientLeft;
    const top = b.top + box.clientTop;
    const right = left + box.clientWidth;
    const bottom = top + box.clientHeight;
    let worst = 0;
    let worstText = "";
    for (const t of texts) {
      if (!box.contains(t.node)) continue;
      // Text inside a nested scroller or a nested drawn box is that box's business.
      let inner = false;
      for (let node: Element | null = t.el; node && node !== box; node = node.parentElement) {
        const ncs = getComputedStyle(node);
        if (/auto|scroll|hidden|clip/.test(ncs.overflowX + ncs.overflowY) || (ncs.position === "fixed" && node !== box))
          inner = true;
      }
      if (inner || placed(t.el, box)) continue;
      const range = document.createRange();
      range.selectNodeContents(t.node);
      for (const r of range.getClientRects()) {
        if (r.width < 0.5) continue;
        // A line's rect is the font's content area: tight display leading (0.8) pokes it out of its box while the
        // glyphs sit inside, so vertically only the middle 60 % (the letters' body) counts.
        const inset = r.height * 0.2;
        const out = Math.max(left - r.left, r.right - right, top - (r.top + inset), r.bottom - inset - bottom);
        if (out > worst) {
          worst = out;
          worstText = t.node.data;
        }
      }
    }
    for (const { el, style } of chain) {
      if (style === null) el.removeAttribute("style");
      else el.setAttribute("style", style);
    }
    // Glyph overhang (italic, heavy display type) is not a bug; 3 px is.
    if (worst > 3)
      issues.push({ kind: clips ? "clip" : "spill", where: where(box), text: snippet(worstText), px: Math.round(worst) });
  }

  // offscreen: visible text past the viewport, unless an ancestor clips or scrolls it (reported above).
  for (const t of texts) {
    let held = false;
    for (let node: Element | null = t.el; node && node !== document.body; node = node.parentElement) {
      const cs = getComputedStyle(node);
      if (/auto|scroll|hidden|clip/.test(cs.overflowX)) held = true;
    }
    if (held) continue;
    const out = Math.max(...t.rects.map((r) => Math.max(-r.left, r.right - vw)));
    if (out > 3) issues.push({ kind: "offscreen", where: where(t.el), text: snippet(t.node.data), px: Math.round(out) });
  }

  // word-break: a word whose letters sit on two lines (break-word / anywhere on a too-narrow box).
  for (const t of texts) {
    if (inSvg(t.el)) continue;
    for (const match of t.node.data.matchAll(/[^\s\u00a0]{2,}/g)) {
      const word = match[0];
      if (/[-‐‑–—/\u00ad.@_:()]/.test(word)) continue;
      const range = document.createRange();
      range.setStart(t.node, match.index);
      range.setEnd(t.node, match.index + word.length);
      const tops = new Set([...range.getClientRects()].filter((r) => r.width > 0.5).map((r) => Math.round(r.top / 4)));
      if (tops.size > 1) issues.push({ kind: "word-break", where: where(t.el), text: word, px: 0 });
    }
  }

  // The sticky header and stuck chapters sit over the content scrolling under them by design.
  // Text is compared only with text in the same pinned layer.
  const pinOf = (el: Element) => {
    for (let node: Element | null = el; node && node !== document.body; node = node.parentElement) {
      if (/fixed|sticky/.test(getComputedStyle(node).position)) return node;
    }
    return null;
  };
  const clipOf = (el: Element) => {
    for (let node: Element | null = el; node && node !== document.body; node = node.parentElement) {
      if (/hidden|clip/.test(getComputedStyle(node).overflowX)) return node;
    }
    return null;
  };
  // Layers placed over other text on purpose (a photo deck, the hero sticker) opt out with `data-textfit="stack"`; a flip
  // card's two faces count as one layer.
  const stackOf = (el: Element) => el.closest("[data-textfit='stack']");
  const flip = (el: Element) => {
    for (let node: Element | null = el; node; node = node.parentElement) {
      if (getComputedStyle(node).transformStyle === "preserve-3d") return node;
    }
    return null;
  };

  // overlap: line boxes of unrelated text nodes covering each other. A range's rect is the font's content area,
  // taller than tight leading: compare the middle 60 % of each line, the glyphs' body. SVG text (a curved badge) is
  // drawn on purpose.
  const lines = texts
    .filter((t) => !inSvg(t.el))
    .map((t) => ({ t, layer: stackOf(t.el) ?? flip(t.el), pin: pinOf(t.el) }))
    .flatMap(({ t, layer, pin }) => {
      // Only the part a clipping box lets through is drawn (an ellipsis name hides its tail).
      const box = clipOf(t.el)?.getBoundingClientRect();
      return t.rects.flatMap((r) => {
        const left = Math.max(r.left, box?.left ?? -Infinity);
        const right = Math.min(r.right, box?.right ?? Infinity);
        return right - left > 0.5
          ? [{ t, layer, pin, r: new DOMRect(left, r.top + r.height * 0.2, right - left, r.height * 0.6) }]
          : [];
      });
    });
  const reported = new Set<string>();
  for (let i = 0; i < lines.length; i++) {
    const a = lines[i]!;
    for (let j = i + 1; j < lines.length; j++) {
      const b = lines[j]!;
      if (a.t === b.t) continue;
      const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
      const h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
      if (w <= 2 || h <= 2) continue;
      // Neighbouring inline runs share a line box's leading; count only real cover.
      const smaller = Math.min(a.r.width * a.r.height, b.r.width * b.r.height);
      if ((w * h) / smaller < 0.3) continue;
      if ((a.layer && a.layer === b.layer) || stackOf(a.t.el) || stackOf(b.t.el) || a.pin !== b.pin) continue;
      const key = where(a.t.el) + "|" + where(b.t.el);
      if (reported.has(key)) continue;
      reported.add(key);
      issues.push({
        kind: "overlap",
        where: `${where(a.t.el)}  ×  ${where(b.t.el)}`,
        text: `${snippet(a.t.node.data)} × ${snippet(b.t.node.data)}`,
        px: Math.round(h),
      });
    }
  }

  // covered: a box drawn on top of text (a date tag over a description). The page is scanned one viewport at a time
  // (sticky chapters and the scroll a state left behind move text, so rects are read fresh at each stop); every line
  // fully inside the band gets five hit-tests, and an opaque element above the text that is not part of it hides it.
  const opaque = (el: Element) => {
    if (/^(IMG|VIDEO|PICTURE)$/.test(el.tagName)) return true;
    const cs = getComputedStyle(el);
    if (cs.backgroundImage !== "none") return true;
    const alpha = cs.backgroundColor
      .match(/rgba?\(([^)]+)\)/)?.[1]
      ?.split(/[\s,/]+/)
      .filter(Boolean)[3];
    return cs.backgroundColor !== "transparent" && (alpha === undefined || Number(alpha) >= 0.5);
  };
  const vh = innerHeight;
  const candidates = texts.filter((t) => !inSvg(t.el) && !stackOf(t.el) && !flip(t.el));
  const pins = new Map(candidates.map((t) => [t.node, pinOf(t.el)]));
  const tested = new Set<Text>();
  const hidden = new Map<Text, Element>();
  const range = document.createRange();
  const end = document.documentElement.scrollHeight;
  // Hit-testing follows paint order only for elements that take pointer events: a label with `pointer-events: none`
  // over a video read as covered by it. Everything is hit-testable during the scan.
  const hittable = document.createElement("style");
  hittable.textContent = "*, *::before, *::after { pointer-events: auto !important; }";
  document.head.append(hittable);
  for (let stop = 0; ; stop += vh * 0.6) {
    window.scrollTo({ top: stop, behavior: "instant" });
    for (const t of candidates) {
      if (tested.has(t.node)) continue;
      range.selectNodeContents(t.node);
      const rects = [...range.getClientRects()].filter((r) => r.width > 0.5 && r.top >= vh * 0.15 && r.bottom <= vh * 0.9);
      if (!rects.length) continue;
      tested.add(t.node);
      for (const r of rects) {
        for (const f of [0.1, 0.3, 0.5, 0.7, 0.9]) {
          const x = r.left + r.width * f;
          if (x < 1 || x > vw - 1 || hidden.has(t.node)) continue;
          for (const hit of document.elementsFromPoint(x, r.top + r.height / 2)) {
            if (hit === t.el || t.el.contains(hit) || hit.contains(t.el) || pinOf(hit) !== pins.get(t.node)) break;
            if (stackOf(hit)) break;
            // A caption tag laid over its own picture or video (a sibling in the same frame) is drawn on top on purpose;
            // hit-testing can skip such labels, so the media below would read as covering them.
            if (/^(IMG|VIDEO|PICTURE)$/.test(hit.tagName) && hit.parentElement?.contains(t.el)) break;
            if (opaque(hit)) {
              hidden.set(t.node, hit);
              break;
            }
          }
        }
      }
    }
    if (scrollY + vh >= end - 1 || stop > end) break;
  }
  hittable.remove();
  for (const [node, by] of hidden) {
    issues.push({
      kind: "covered",
      where: `${where(node.parentElement!)}  under  ${where(by)}`,
      text: snippet(node.data),
      px: 0,
    });
  }
  window.scrollTo({ top: 0, behavior: "instant" });
  return issues;
}
