/**
 * The site's motion state (design.md § Motion, requirements.md F19). One module, shared by every animated part:
 * - `still`: the reader paused motion (the pause buttons, WCAG 2.2.2) or asked for reduced motion
 * - `.near` on each `.sec` while it is near the viewport: CSS loops run only there, so they stop where nobody sees them
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

// Sections run their CSS loops only while near the viewport (global.css).
const sections = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.target.classList.toggle("near", e.isIntersecting)),
  {
    rootMargin: "80px 0px",
  },
);
for (const section of document.querySelectorAll(".sec")) sections.observe(section);

// Reveal on first view: `.rv` fades up, `.draw` draws its rule, `[data-count]` inside counts up once.
function countUp(el: HTMLElement) {
  const end = Number(el.dataset.count);
  if (!Number.isFinite(end) || motionStill()) return;
  const start = performance.now();
  const duration = 1100;
  const tick = (now: number) => {
    const k = Math.min(1, (now - start) / duration);
    el.textContent = String(Math.round(end * (1 - Math.pow(1 - k, 3))));
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const reveal: IntersectionObserverCallback = (entries, observer) =>
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    observer.unobserve(e.target);
    for (const el of e.target.querySelectorAll<HTMLElement>("[data-count]")) countUp(el);
  });
const reveals = new IntersectionObserver(reveal, { rootMargin: "0px 0px -8% 0px" });
// On phones the project chapters reveal just before they scroll in, so a fast scroll never lands on empty space [owner].
const early = matchMedia("(max-width: 40rem)").matches ? new IntersectionObserver(reveal, { rootMargin: "0px 0px 15% 0px" }) : reveals;
for (const el of document.querySelectorAll(".rv, .draw")) (el.closest(".chapter") ? early : reveals).observe(el);
root.classList.add("rv-ready");

/**
 * Heavy media (loops) waits for the reader's first interaction as well as for visibility: a loop that starts during
 * page load costs main-thread time on phones (lessons.md). Resolves at once if the page was already used.
 */
let interacted = false;
const interactionWaiters: (() => void)[] = [];
const INTERACTIONS = ["pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;
function markInteracted() {
  if (interacted) return;
  interacted = true;
  for (const type of INTERACTIONS) removeEventListener(type, markInteracted, true);
  interactionWaiters.splice(0).forEach((fn) => fn());
}
for (const type of INTERACTIONS) addEventListener(type, markInteracted, { capture: true, passive: true });
if (scrollY > 0) markInteracted();

export const afterInteraction = (fn: () => void) => (interacted ? fn() : interactionWaiters.push(fn));

// CSS loops that wait for the first move key off `html.woke` (global.css); a mouse move counts too.
const wake = () => root.classList.add("woke");
afterInteraction(wake);
addEventListener("pointermove", wake, { once: true, passive: true });

/** A short status line at the bottom of the screen (copy email, form states). */
export function toast(message: string) {
  let el = document.querySelector<HTMLElement>(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    document.body.append(el);
  }
  el.textContent = message;
  el.classList.add("on");
  clearTimeout(Number(el.dataset.timer));
  el.dataset.timer = String(setTimeout(() => el.classList.remove("on"), 2600));
}

/** Copy text; falls back to selecting nothing and returning false when the clipboard is refused. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// Copy buttons anywhere: `data-copy` holds the text, `data-copied` the confirmation.
document.addEventListener("click", async (event) => {
  const button = (event.target as Element | null)?.closest<HTMLElement>("[data-copy]");
  if (!button) return;
  const ok = await copyText(button.dataset.copy ?? "");
  toast(ok ? (button.dataset.copied ?? "Copied") : (button.dataset.copyFailed ?? button.dataset.copy ?? ""));
  const umami = (window as unknown as { umami?: { track: (e: string, d?: object) => void } }).umami;
  if (ok && button.dataset.copyEvent) umami?.track(button.dataset.copyEvent, { source: button.dataset.copySource ?? "page" });
});
