import {
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { LocaleService } from './locale.service';
import { prefersReducedMotion } from './motion';

const DURATION_MS = 1400;

export function formatStat(value: number, decimals: number, locale: string, suffix = ''): string {
  return (
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value) + suffix
  );
}

/**
 * Renders a number and, in the browser, counts it up from 0 the first time it scrolls into view.
 * The prerendered HTML always contains the final value.
 */
@Directive({
  selector: '[appCountUp]',
  host: { '[textContent]': 'text()' },
})
export class CountUpDirective {
  readonly value = input.required<number>({ alias: 'appCountUp' });
  readonly decimals = input(0);
  readonly suffix = input('');

  private readonly locale = inject(LocaleService);
  private readonly progress = signal(1);

  protected readonly text = computed(() =>
    formatStat(
      this.value() * this.progress(),
      this.decimals(),
      this.locale.lang() === 'pl' ? 'pl-PL' : 'en-US',
      this.suffix(),
    ),
  );

  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const win = inject(DOCUMENT).defaultView;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!win || !('IntersectionObserver' in win) || prefersReducedMotion(win)) return;
      if (el.getBoundingClientRect().top < win.innerHeight) return; // already visible: keep final value

      let frame = 0;
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const start = win.performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          this.progress.set(1 - Math.pow(1 - t, 3)); // ease-out cubic
          if (t < 1) frame = win.requestAnimationFrame(tick);
        };
        this.progress.set(0);
        frame = win.requestAnimationFrame(tick);
      });
      observer.observe(el);
      destroyRef.onDestroy(() => {
        observer.disconnect();
        win.cancelAnimationFrame(frame);
      });
    });
  }
}
