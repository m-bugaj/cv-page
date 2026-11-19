import { Component, inject } from '@angular/core';
import { LocaleService } from '../core/locale.service';
import { SITE } from '../data/site.config';

@Component({
  selector: 'app-site-footer',
  template: `
    <footer class="footer">
      <div class="container footer__inner">
        <p>© {{ year }} Michał Bugaj</p>
        <p class="muted">{{ ui().footer.builtWith }}</p>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      border-top: 1px solid var(--border-muted);
      padding-block: 24px 96px;
      font-family: var(--font-mono);
      font-size: 13px;
    }
    .footer__inner {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 8px 24px;
    }
  `,
})
export class SiteFooter {
  protected readonly ui = inject(LocaleService).ui;
  protected readonly year = SITE.year;
}
