import { DOCUMENT, Service, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { prefersReducedMotion } from './motion';

/** Height of the sticky header plus breathing room, used when scrolling to a section. */
export const SCROLL_OFFSET = 80;

/**
 * Scrolls to page sections. Links use this instead of plain `#id` hrefs because
 * `<base href="/">` would resolve `#id` to the English page while on /pl.
 */
@Service()
export class ScrollService {
  private readonly doc = inject(DOCUMENT);

  constructor() {
    inject(ViewportScroller).setOffset([0, SCROLL_OFFSET]);
  }

  scrollTo(id: string, options: { focus?: boolean } = {}): void {
    const win = this.doc.defaultView;
    const el = this.doc.getElementById(id);
    if (!win || !el) return;
    const top = id === 'top' ? 0 : el.getBoundingClientRect().top + win.scrollY - SCROLL_OFFSET;
    win.scrollTo({ top, behavior: prefersReducedMotion(win) ? 'auto' : 'smooth' });
    win.history.replaceState(win.history.state, '', `${win.location.pathname}#${id}`);
    if (options.focus) {
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    }
  }
}
