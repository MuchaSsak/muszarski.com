/**
 * Video sources, attached late (after the first interaction, near view): until then they wait in an inert `<template>`
 * inside the `<video>`, so the browser sees no source at all (Firefox warned "no src attribute" for each empty
 * `<source>`). The older form, `<source data-src>`, still works.
 * AV1 comes first where the browser says it plays it; if it then fails to decode (a browser that claims AV1 without
 * a decoder: the frame stayed blank), the AV1 source is dropped and the H.264 one loads, playing on if it was; if it
 * failed before playing, a `sourcefallback` event lets the page ask again.
 */
export function attachSources(video: HTMLVideoElement) {
  if (video.dataset.loaded) return;
  video.dataset.loaded = "1";
  const template = video.querySelector("template");
  if (template) video.append(template.content.cloneNode(true));
  for (const source of video.querySelectorAll<HTMLSourceElement>("source[data-src]")) source.src = source.dataset.src!;
  video.addEventListener("error", () => {
    const av1 = [...video.querySelectorAll("source")].filter((source) => source.type.includes("av01"));
    const failed = video.error && video.error.code >= MediaError.MEDIA_ERR_DECODE && video.currentSrc.includes(".av1.");
    if (!failed || !av1.length) return;
    const playing = !video.paused;
    av1.forEach((source) => source.remove());
    video.load();
    if (playing) video.play().catch(() => {});
    // A failure before playback began rejected the play request: the owner decides again (reel.ts).
    else video.dispatchEvent(new Event("sourcefallback"));
  });
  video.load();
}
