// `app/loading.tsx` only exists for as long as a route's content is still
// loading — Suspense swaps it out the instant the real page is ready. This
// turns that mount/unmount lifecycle into a signal Footer (a layout sibling,
// not a child of the same Suspense boundary) can react to, so it can hide
// itself for exactly that window.
type Listener = (loading: boolean) => void;
const listeners = new Set<Listener>();
let current = false;

export function setPageLoading(loading: boolean) {
  current = loading;
  listeners.forEach((cb) => cb(loading));
}

export function subscribePageLoading(cb: Listener): () => void {
  listeners.add(cb);
  cb(current);
  return () => listeners.delete(cb);
}
