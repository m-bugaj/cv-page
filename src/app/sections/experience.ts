import { Component, inject } from '@angular/core';
import { LocaleService } from '../core/locale.service';
import { RevealDirective } from '../core/reveal.directive';
import { RichTextComponent } from '../core/rich-text';
import { SkillFilterService } from '../core/skill-filter.service';

@Component({
  selector: 'app-experience',
  imports: [RichTextComponent, RevealDirective],
  template: `
    <section id="experience" class="block" aria-labelledby="experience-title">
      <h2 id="experience-title" class="section-title">{{ ui().sectionTitles.experience }}</h2>
      @for (job of cv().experience; track job.company) {
        <article class="job" appReveal>
          <header class="job__head">
            <h3 class="job__title">
              {{ job.role }} <span class="muted job__at">{{ ui().experience.at }}</span>
              <a class="link" [href]="job.companyUrl" target="_blank" rel="noopener">
                {{ job.company
                }}<svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                <span class="sr-only">({{ ui().experience.openSite }})</span>
              </a>
            </h3>
            <p class="date">{{ job.period }}</p>
          </header>
          <ul class="bullets">
            @for (b of job.bullets; track $index) {
              @let st = filter.state(b.skills);
              <li [class.is-match]="st.match" [class.is-dimmed]="st.dimmed">
                <app-rich [text]="b.text" />
              </li>
            }
          </ul>
        </article>
      }
    </section>
  `,
  styles: `
    .job__head {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: baseline;
      gap: 4px 16px;
      margin-bottom: 12px;
    }
    .job__title {
      font-size: 19px;
      line-height: 1.35;
      font-weight: 600;
      color: var(--text-strong);
    }
    .job__at {
      font-weight: 400;
    }
    .bullets {
      gap: 8px;
    }
    .bullets > li {
      padding-block: 2px;
      padding-right: 6px;
    }
  `,
})
export class Experience {
  private readonly locale = inject(LocaleService);
  protected readonly filter = inject(SkillFilterService);
  protected readonly cv = this.locale.cv;
  protected readonly ui = this.locale.ui;
}
