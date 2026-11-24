export function formatDuration(days: number, nights: number): string {
  return `${days} Day${days === 1 ? "" : "s"} · ${nights} Night${nights === 1 ? "" : "s"}`;
}
