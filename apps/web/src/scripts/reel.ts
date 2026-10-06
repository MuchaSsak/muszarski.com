import { afterInteraction, motionStill, onMotion } from "~/scripts/motion";

/**
 * Reels (design.md § Imagery, requirements.md F03): one muted loop per project. Sources are attached only after the
 * reader's first interaction AND when the reel comes near; it plays while half visible, pauses offscreen, on the pause
 * button and under reduced motion (then the poster stays, with a play button). The only control is the video itself
 * [user 2026-10-06: no playback bar]: a tap pauses or resumes it (`[data-toggle]`, a button over the frame).
 */
interface Reel {
  pauseAuto: () => void;
  resume: () => void;
}

const reels: Reel[] = [];

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
  let userPaused = false;
  let visible = false;
  let near = false;

  const setUi = (playing: boolean) => {
    figure.classList.toggle("paused", !playing);
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", String(!playing));
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
  reels.push({ pauseAuto: () => pause(false), resume: autoplay });
}

onMotion((still) => reels.forEach((reel) => (still ? reel.pauseAuto() : reel.resume())));
