/** True when the visitor asked the OS to reduce motion (always false outside the browser). */
export function prefersReducedMotion(win: Window | null | undefined): boolean {
  return !!win?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}
