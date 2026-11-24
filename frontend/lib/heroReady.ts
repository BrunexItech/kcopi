// Lets the welcome splash know the moment the hero video underneath has
// actually started playing, so it can hand off to it instead of fading out
// on a fixed timer that may fire before or long after the video is ready.
let ready = false;
const listeners = new Set<() => void>();

export function markHeroVideoReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((cb) => cb());
  listeners.clear();
}

export function onHeroVideoReady(cb: () => void): () => void {
  if (ready) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}
