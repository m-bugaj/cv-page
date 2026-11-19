import { Component, computed, inject } from '@angular/core';
import { LocaleService } from '../core/locale.service';
import { RevealDirective } from '../core/reveal.directive';
import { RichTextComponent } from '../core/rich-text';
import { SITE } from '../data/site.config';
import { ContactLinks } from './contact-links';

@Component({
  selector: 'app-contact',
  imports: [ContactLinks, RevealDirective, RichTextComponent],
  template: `
    <section id="contact" class="section container" aria-labelledby="contact-title">
      <h2 id="contact-title" class="section-title">{{ ui().sectionTitles.contact }}</h2>
      <div class="box" appReveal>
        <div class="box__text">
          <p class="prompt"><span class="prompt__sign" aria-hidden="true">$</span> contact --michal-bugaj</p>
          <p class="lead"><app-rich [text]="ui().contact.lead" /></p>
          <a class="btn btn--primary" [href]="cvHref()" download>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
            </svg>
            {{ ui().contact.downloadCv }}
          </a>
        </div>
        <app-contact-links [large]="true" />
      </div>
    </section>
  `,
  styles: `
    .box {
      display: grid;
      gap: 28px;
      padding: 28px;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background:
        radial-gradient(120% 140% at 0% 0%, var(--highlight-bg), transparent 60%),
        var(--bg-elevated);
      @media (min-width: 768px) {
        grid-template-columns: 1.2fr 1fr;
        align-items: center;
        padding: 40px;
      }
    }
    .box__text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }
    .prompt {
      font-family: var(--font-mono);
      font-size: 14px;
      color: var(--muted);
    }
    .prompt__sign {
      color: var(--green);
      font-weight: 700;
    }
    .lead {
      font-size: clamp(20px, 3vw, 26px);
      line-height: 1.4;
      font-weight: 600;
      color: var(--text-strong);
      text-wrap: balance;
    }
  `,
})
export class Contact {
  private readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly cvHref = computed(() => SITE.cvPdf[this.locale.lang()]);
}
