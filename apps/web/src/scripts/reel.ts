import { afterInteraction, motionStill, onMotion } from "~/scripts/motion";

/**
 * Reels (design.md § Imagery, requirements.md F03): one muted loop per project. Sources are attached only after the
 * reader's first interaction AND when the reel comes near; it plays while half visible, pauses offscreen, on the pause
 * button and under reduced motion (then the poster stays, with a play button). Chapter chips seek and fill; expand
 * opens the same video in a dialog with native controls.
 */
interface Reel {
  pauseAuto: () => void;
  resume: () => void;
}

const reels: Reel[] = [];
const lightbox = document.querySelector<HTMLDialogElement>("dialog[data-lightbox]");
const lightboxVideo = lightbox?.querySelector("video") ?? null;

function attachSources(video: HTMLVideoElement) {
  if (video.dataset.loaded) return;
  video.dataset.loaded = "1";
  for (const source of video.querySelectorAll<HTMLSourceElement>("source[data-src]")) source.src = source.dataset.src!;
  video.load();
}

for (const figure of document.querySelectorAll<HTMLElement>("[data-reel]")) {
  const video = figure.querySelector("video");
  if (!video) continue;
  const toggle = figure.querySelector<HTMLButtonElement>("[data-toggle]");
  const chips = [...figure.querySelectorAll<HTMLButtonElement>("[data-seek]")];
  const starts = chips.map((chip) => Number(chip.dataset.seek));
  let userPaused = false;
  let visible = false;
  let near = false;

  const setUi = (playing: boolean) => {
    figure.classList.toggle("paused", !playing);
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", String(!playing));
    toggle.querySelector("[data-icon-pause]")?.toggleAttribute("hidden", !playing);
    toggle.querySelector("[data-icon-play]")?.toggleAttribute("hidden", playing);
    toggle.setAttribute("aria-label", playing ? (toggle.dataset.labelPause ?? "") : (toggle.dataset.labelPlay ?? ""));
  };
  const play = () => {
    attachSources(video);
    userPaused = false;
    video.play().then(
      () => setUi(true),
      () => setUi(false),
    );
  };
  const pause = (byUser: boolean) => {
    if (byUser) userPaused = true;
    video.pause();
    setUi(false);
  };
  const autoplay = () => {
    if (visible && !userPaused && !motionStill()) afterInteraction(play);
  };
  setUi(false);

  new IntersectionObserver(
    ([entry]) => {
      near = !!entry?.isIntersecting;
      if (near) afterInteraction(() => near && attachSources(video));
    },
    { rootMargin: "400px 0px" },
  ).observe(figure);
  new IntersectionObserver(
    ([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible) autoplay();
      else if (!video.paused) {
        video.pause();
        setUi(false);
      }
    },
    { threshold: 0.5 },
  ).observe(figure);

  toggle?.addEventListener("click", () => (video.paused ? play() : pause(true)));
  figure.querySelectorAll("[data-play]").forEach((button) => button.addEventListener("click", play));
  chips.forEach((chip, i) =>
    chip.addEventListener("click", () => {
      attachSources(video);
      const go = () => {
        video.currentTime = starts[i] ?? 0;
        play();
      };
      if (video.readyState >= 1) go();
      else video.addEventListener("loadedmetadata", go, { once: true });
    }),
  );
  video.addEventListener("timeupdate", () => {
    const t = video.currentTime;
    const end = video.duration || 1;
    chips.forEach((chip, i) => {
      const a = starts[i] ?? 0;
      const b = starts[i + 1] ?? end;
      const p = t >= b ? 1 : t <= a ? 0 : (t - a) / (b - a);
      chip.style.setProperty("--p", p.toFixed(3));
      chip.classList.toggle("on", t >= a && t < b);
      chip.setAttribute("aria-current", String(t >= a && t < b));
    });
  });

  figure.querySelector("[data-expand]")?.addEventListener("click", () => {
    if (!lightbox || !lightboxVideo) return;
    attachSources(video);
    pause(false);
    lightboxVideo.src = video.currentSrc || video.querySelector<HTMLSourceElement>("source:last-of-type")?.dataset.src || "";
    lightboxVideo.poster = video.poster;
    lightboxVideo.setAttribute("aria-label", video.getAttribute("aria-label") ?? "");
    lightbox.showModal();
    lightboxVideo.currentTime = video.currentTime || 0;
    lightboxVideo.play().catch(() => {});
    lightbox.addEventListener(
      "close",
      () => {
        video.currentTime = lightboxVideo.currentTime;
        lightboxVideo.pause();
        lightboxVideo.removeAttribute("src");
        lightboxVideo.load();
        userPaused = false;
        autoplay();
      },
      { once: true },
    );
  });

  reels.push({ pauseAuto: () => pause(false), resume: autoplay });
}

lightbox?.querySelector("[data-close]")?.addEventListener("click", () => lightbox.close());
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

onMotion((still) => reels.forEach((reel) => (still ? reel.pauseAuto() : reel.resume())));
