import { Component, inject } from '@angular/core';
import { CountUpDirective } from '../core/count-up.directive';
import { LocaleService } from '../core/locale.service';
import { RevealDirective } from '../core/reveal.directive';
import { RichTextComponent } from '../core/rich-text';

@Component({
  selector: 'app-about',
  imports: [RichTextComponent, CountUpDirective, RevealDirective],
  template: `
    <section id="about" class="section container" aria-labelledby="about-title">
      <h2 id="about-title" class="section-title">{{ ui().sectionTitles.about }}</h2>
      <div class="about" appReveal>
        <div class="about__text">
          @for (p of cv().about; track $index) {
            <p><app-rich [text]="p" /></p>
          }
        </div>
        <ul class="stats">
          @for (s of cv().stats; track s.label) {
            <li class="stat">
              <span
                class="stat__value"
                [appCountUp]="s.value"
                [decimals]="s.decimals ?? 0"
                [suffix]="s.suffix ?? ''"
              ></span>
              <span class="stat__label">{{ s.label }}</span>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .about {
      display: grid;
      gap: 32px;
      @media (min-width: 960px) {
        grid-template-columns: 1.25fr 1fr;
        gap: 48px;
        align-items: start;
      }
    }
    .about__text {
      display: flex;
      flex-direction: column;
      gap: 14px;
      font-size: 17px;
      line-height: 1.7;
      text-wrap: pretty;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      list-style: none;
    }
    .stat {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 14px 16px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--bg-elevated);
    }
    .stat:last-child:nth-child(odd) {
      grid-column: 1 / -1;
    }
    .stat__value {
      font-family: var(--font-mono);
      font-size: 28px;
      font-weight: 700;
      line-height: 1.2;
      color: var(--green);
      font-variant-numeric: tabular-nums;
    }
    .stat__label {
      font-size: 13.5px;
      color: var(--muted);
    }
  `,
})
export class About {
  private readonly locale = inject(LocaleService);
  protected readonly cv = this.locale.cv;
  protected readonly ui = this.locale.ui;
}
