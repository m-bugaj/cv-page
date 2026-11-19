import { Component, computed, inject } from '@angular/core';
import { LocaleService } from '../core/locale.service';
import { RichTextComponent } from '../core/rich-text';
import { SkillFilterService, countSkillMatches } from '../core/skill-filter.service';
import { isAccentSkill, skillLabel } from '../data/skills';

@Component({
  selector: 'app-skills-panel',
  imports: [RichTextComponent],
  template: `
    <section id="skills" aria-labelledby="skills-title">
      <h2 id="skills-title" class="section-title">{{ ui().sectionTitles.skills }}</h2>
      <p class="hint">{{ ui().skills.hint }}</p>

      <div class="groups">
        @for (group of cv().skillGroups; track group.label) {
          <div class="group">
            <span class="group__label" aria-hidden="true"># {{ group.label }}</span>
            <div class="chip-row" role="group" [attr.aria-label]="group.label">
              @for (id of group.skills; track id) {
                <button
                  type="button"
                  class="chip"
                  [class.chip--accent]="accent(id)"
                  [attr.aria-pressed]="filter.active() === id"
                  (click)="filter.toggle(id)"
                >
                  {{ label(id) }}
                </button>
              }
            </div>
          </div>
        }
      </div>

      <p class="status" aria-live="polite">
        @if (activeInfo(); as info) {
          <span class="status__text">
            {{ ui().skills.filterActive }}: <strong>{{ info.label }}</strong> ·
            {{ ui().skills.matches(info.count) }}
          </span>
          <button type="button" class="status__clear" (click)="filter.set(null)">
            {{ ui().skills.clearFilter }}
          </button>
        }
      </p>

      <h3 class="section-title section-title--small">{{ ui().sectionTitles.academic }}</h3>
      <div class="chip-row">
        @for (id of cv().academicSkills; track id) {
          <button
            type="button"
            class="chip"
            [attr.aria-pressed]="filter.active() === id"
            (click)="filter.toggle(id)"
          >
            {{ label(id) }}
          </button>
        }
      </div>

      <h3 class="section-title section-title--small languages-title">
        {{ ui().sectionTitles.languages }}
      </h3>
      <ul class="bullets">
        @for (l of cv().languages; track $index) {
          <li><app-rich [text]="l" /></li>
        }
      </ul>
    </section>
  `,
  styles: `
    .hint {
      margin: -12px 0 16px;
      font-size: 13.5px;
      color: var(--muted);
    }
    .groups {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .group__label {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--muted);
    }
    .status {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      min-height: 30px;
      margin: 14px 0 22px;
      font-family: var(--font-mono);
      font-size: 12.5px;
      color: var(--text);
    }
    .status__clear {
      padding: 2px 8px;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: transparent;
      font-size: 12px;
      color: var(--blue);
    }
    .status__clear:hover {
      border-color: var(--blue);
    }
    .languages-title {
      margin-top: 22px;
    }
  `,
})
export class SkillsPanel {
  private readonly locale = inject(LocaleService);
  protected readonly filter = inject(SkillFilterService);
  protected readonly cv = this.locale.cv;
  protected readonly ui = this.locale.ui;
  protected readonly label = skillLabel;
  protected readonly accent = isAccentSkill;

  protected readonly activeInfo = computed(() => {
    const id = this.filter.active();
    if (!id) return null;
    const m = countSkillMatches(this.cv(), id);
    return { label: skillLabel(id), count: m.experience + m.projects };
  });
}
