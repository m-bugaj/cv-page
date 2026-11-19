import { Component, inject } from '@angular/core';
import { LocaleService } from '../core/locale.service';
import { RevealDirective } from '../core/reveal.directive';
import { RichTextComponent } from '../core/rich-text';

@Component({
  selector: 'app-education',
  imports: [RichTextComponent, RevealDirective],
  template: `
    <section id="education" class="block" aria-labelledby="education-title">
      <h2 id="education-title" class="section-title">{{ ui().sectionTitles.education }}</h2>
      @for (e of cv().education; track e.school) {
        <article appReveal>
          <header class="head">
            <h3 class="title">{{ e.school }}</h3>
            <p class="date">{{ e.period }}</p>
          </header>
          <ul class="bullets">
            @for (d of e.degrees; track $index) {
              <li><app-rich [text]="d" /></li>
            }
          </ul>
          <p class="notes muted">
            @for (n of e.notes; track $index) {
              <span>{{ n }}</span>
            }
          </p>
        </article>
      }
    </section>

    <section id="certificates" class="block" aria-labelledby="certificates-title">
      <h2 id="certificates-title" class="section-title">{{ ui().sectionTitles.certificates }}</h2>
      <ul class="certs" appReveal>
        @for (c of cv().certificates; track c.name) {
          <li class="cert">
            <span class="meta">{{ c.date }} | {{ c.issuer }}</span>
            <span><strong>{{ c.name }}</strong> {{ c.detail }}</span>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    :host {
      display: contents;
    }
    .head {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: baseline;
      gap: 4px 16px;
      margin-bottom: 10px;
    }
    .title {
      font-size: 19px;
      line-height: 1.35;
      font-weight: 600;
      color: var(--text-strong);
    }
    .notes {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      font-size: 14.5px;
    }
    .certs {
      display: grid;
      gap: 12px;
      list-style: none;
      @media (min-width: 640px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
    .cert {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 14px 16px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--bg-elevated);
    }
  `,
})
export class Education {
  private readonly locale = inject(LocaleService);
  protected readonly cv = this.locale.cv;
  protected readonly ui = this.locale.ui;
}
