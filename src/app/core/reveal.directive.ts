import { DOCUMENT, DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';
import { prefersReducedMotion } from './motion';

/**
 * Fades an element in when it scrolls into view. Runs only in the browser and only for
 * elements below the fold, so prerendered HTML stays fully visible (SEO, no-JS, reduced motion).
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const win = inject(DOCUMENT).defaultView;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!win || !('IntersectionObserver' in win) || prefersReducedMotion(win)) return;
      if (el.getBoundingClientRect().top < win.innerHeight * 0.9) return;

      el.classList.add('reveal');
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            el.classList.add('is-visible');
            observer.disconnect();
          }
        },
        { rootMargin: '0px 0px -8% 0px' },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
