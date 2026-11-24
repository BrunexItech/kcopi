// Scroll-reveal animations must never finish playing underneath the opaque
// WelcomeIntro splash (it holds the screen for 2-4.5s) — otherwise a visitor
// scrolls past it, the splash clears, and the content is already sitting in
// its final animated state with nothing left to see. WelcomeIntro calls
// markIntroDismissed() the moment it actually starts leaving (or immediately
// if it's not going to show at all); reveal components gate on this before
// animating in, even if they're already in viewport.
type Listener = () => void;
const listeners = new Set<Listener>();
let dismissed = false;

export function markIntroDismissed() {
  if (dismissed) return;
  dismissed = true;
  listeners.forEach((cb) => cb());
}

export function isIntroDismissed() {
  return dismissed;
}

export function subscribeIntroDismissed(cb: Listener): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
