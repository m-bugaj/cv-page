import { Component, computed, inject } from '@angular/core';
import { LocaleService } from '../core/locale.service';
import { RevealDirective } from '../core/reveal.directive';
import { RichTextComponent } from '../core/rich-text';
import { SkillFilterService } from '../core/skill-filter.service';
import { isAccentSkill, skillLabel } from '../data/skills';

@Component({
  selector: 'app-projects',
  imports: [RichTextComponent, RevealDirective],
  template: `
    <section id="projects" class="block" aria-labelledby="projects-title">
      <h2 id="projects-title" class="section-title">{{ ui().sectionTitles.projects }}</h2>
      <div class="projects">
        @for (p of projects(); track p.name) {
          @let st = filter.state(p.skills);
          <article class="card" [class.is-dimmed]="st.dimmed" [class.card--match]="st.match" appReveal>
            <header class="card__head">
              <h3 class="card__title">
                <a [href]="p.url" target="_blank" rel="noopener">
                  <span class="card__name">{{ p.name }}</span>
                  <span class="muted card__subtitle"> – {{ p.subtitle }}</span>
                  <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                  <span class="sr-only">({{ ui().projects.openRepo }})</span>
                </a>
              </h3>
              <p class="date">{{ p.period }}</p>
            </header>
            <ul class="bullets">
              @for (b of p.bullets; track $index) {
                @let bst = filter.state(b.skills);
                <li [class.is-match]="bst.match" [class.is-dimmed]="bst.dimmed && !st.dimmed">
                  <app-rich [text]="b.text" />
                </li>
              }
            </ul>
            <div class="card__stack">
              <span class="sr-only">{{ ui().projects.stack }}:</span>
              @for (id of p.skills; track id) {
                <span
                  class="chip chip--sm"
                  [class.chip--accent]="accent(id) || filter.active() === id"
                  >{{ label(id) }}</span
                >
              }
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .projects {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .card {
      padding: 20px;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: var(--bg-elevated);
      transition:
        opacity 0.2s ease,
        border-color 0.2s ease;
    }
    .card--match {
      border-color: var(--accent-border);
    }
    .card__head {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: baseline;
      gap: 4px 16px;
      margin-bottom: 12px;
    }
    .card__title {
      font-size: 18px;
      line-height: 1.35;
      font-weight: 600;
      color: var(--text-strong);
    }
    .card__name {
      color: var(--blue);
    }
    .card__subtitle {
      font-weight: 400;
    }
    .card__title a:hover .card__name {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .card__stack {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 16px;
      padding-top: 14px;
      border-top: 1px dashed var(--border);
    }
    .bullets > li {
      padding-block: 2px;
      padding-right: 6px;
    }
  `,
})
export class Projects {
  private readonly locale = inject(LocaleService);
  protected readonly filter = inject(SkillFilterService);
  protected readonly ui = this.locale.ui;
  protected readonly label = skillLabel;
  protected readonly accent = isAccentSkill;

  /** Projects with the union of their bullets' skills (shown as the stack row). */
  protected readonly projects = computed(() =>
    this.locale.cv().projects.map((p) => ({
      ...p,
      skills: [...new Set(p.bullets.flatMap((b) => b.skills))],
    })),
  );
}
