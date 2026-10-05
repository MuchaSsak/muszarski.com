/**
 * The site's motion state (design.md § Motion, requirements.md F19). One module, shared by every animated part:
 * - `still`: the reader paused motion (the pause buttons, WCAG 2.2.2) or asked for reduced motion
 * - `.off` on each `.sec` while it is offscreen, so CSS loops stop where nobody sees them
 * - `.rv` elements reveal on first view (`html.rv-ready` gates the hidden state, so a failed script hides nothing)
 * JS loops subscribe with `onMotion` and check `motionStill()` each frame.
 */
const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const listeners = new Set<(still: boolean) => void>();

export const motionStill = () => reduce.matches || root.classList.contains("still");
export const prefersReducedMotion = () => reduce.matches;

export function onMotion(listener: (still: boolean) => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  const still = motionStill();
  for (const listener of listeners) listener(still);
}

export function setPaused(paused: boolean) {
  root.classList.toggle("still", paused);
  try {
    if (paused) localStorage.setItem("motion", "still");
    else localStorage.removeItem("motion");
  } catch {
    /* storage blocked: the choice lasts for this page only */
  }
  notify();
}

reduce.addEventListener("change", notify);

// Sections pause their CSS loops while offscreen.
const sections = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.target.classList.toggle("off", !e.isIntersecting)),
  {
    rootMargin: "80px 0px",
  },
);
for (const section of document.querySelectorAll(".sec")) sections.observe(section);

// Reveal on first view.
const reveals = new IntersectionObserver(
  (entries, observer) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      observer.unobserve(e.target);
    }),
  { rootMargin: "0px 0px -8% 0px" },
);
for (const el of document.querySelectorAll(".rv")) reveals.observe(el);
root.classList.add("rv-ready");
