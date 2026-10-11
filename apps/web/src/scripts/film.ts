import { attachSources } from "~/scripts/video-sources";

/**
 * The featured film (components/blog/case/Film.astro): one card opens one modal dialog. The film (with sound) is
 * fetched only on that click; the dialog grows out of the card's frame and shrinks back into it on close (CSS
 * transitions in styles/case.css § Film; here: --fx/--fy, the frame's centre from the viewport's, and --fs, its width
 * over the dialog's). Escape, the close button and a click on the backdrop close it; closing pauses the film.
 *
 * `?film` in the URL opens it on arrival (the GitHub profile README links the case study that way) [user 2026-10-11].
 * Arriving from another site is not a gesture on this page, so the browser may refuse sound: the film then plays
 * muted and a "Sound on" button above it asks once. Closing drops the parameter, so a reload reads the post.
 */
const card = document.querySelector<HTMLButtonElement>("[data-film-open]");
const dialog = document.querySelector<HTMLDialogElement>("[data-film]");

if (card && dialog) {
  const video = dialog.querySelector("video")!;
  const frame = card.querySelector<HTMLElement>(".fm-frame") ?? card;

  // Where the dialog comes from: the same box as `.fm-dialog`'s width in case.css (1 rem = 16 px).
  const aim = () => {
    const box = frame.getBoundingClientRect();
    const width = Math.min(1600, innerWidth - 32, ((innerHeight - 160) * 16) / 9);
    dialog.style.setProperty("--fx", `${Math.round(box.left + box.width / 2 - innerWidth / 2)}px`);
    dialog.style.setProperty("--fy", `${Math.round(box.top + box.height / 2 - innerHeight / 2)}px`);
    dialog.style.setProperty("--fs", Math.max(0.2, Math.min(1, box.width / width)).toFixed(3));
  };
  const unmute = dialog.querySelector<HTMLButtonElement>("[data-film-unmute]")!;
  const play = () => void video.play().catch(() => {});
  const close = () => {
    aim();
    dialog.close();
  };
  const open = () => {
    attachSources(video);
    aim();
    dialog.showModal();
  };

  card.addEventListener("click", () => {
    video.muted = false;
    unmute.hidden = true;
    open();
    play();
  });
  unmute.addEventListener("click", () => {
    video.muted = false;
    unmute.hidden = true;
    play();
  });
  // Sound turned on from the player's own controls.
  video.addEventListener("volumechange", () => {
    if (!video.muted) unmute.hidden = true;
  });

  if (new URLSearchParams(location.search).has("film")) {
    // The dialog grows out of the card, so bring the card into view first.
    card.scrollIntoView({ block: "center" });
    open();
    video.play().catch(() => {
      video.muted = true;
      unmute.hidden = false;
      play();
    });
  }
  // The AV1 source failed before playing and the H.264 one took over: ask again.
  video.addEventListener("sourcefallback", () => dialog.open && play());
  dialog.querySelector("[data-film-close]")!.addEventListener("click", close);
  dialog.addEventListener("cancel", aim);
  // WebKit hands focus to <main> on close, not back to the opener.
  dialog.addEventListener("close", () => {
    video.pause();
    const url = new URL(location.href);
    if (url.searchParams.has("film")) {
      url.searchParams.delete("film");
      history.replaceState(history.state, "", url);
    }
    if (document.activeElement !== card) card.focus({ preventScroll: true });
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
}
