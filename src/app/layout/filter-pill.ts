import { Component, computed, inject } from '@angular/core';
import { LocaleService } from '../core/locale.service';
import { SkillFilterService } from '../core/skill-filter.service';
import { skillLabel } from '../data/skills';

/** Floating reminder of the active skill filter, visible wherever the visitor scrolls. */
@Component({
  selector: 'app-filter-pill',
  template: `
    @if (label(); as l) {
      <div class="pill">
        <span class="pill__text">
          {{ ui().skills.filterActive }}: <strong>{{ l }}</strong>
        </span>
        <button
          type="button"
          class="pill__clear"
          (click)="filter.set(null)"
          [attr.aria-label]="ui().skills.clearFilter"
          [attr.title]="ui().skills.clearFilter"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    }
  `,
  styles: `
    .pill {
      position: fixed;
      left: 50%;
      bottom: 20px;
      z-index: 40;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 6px 6px 16px;
      border: 1px solid var(--accent-border);
      border-radius: 999px;
      background: var(--bg-elevated);
      box-shadow: var(--shadow-lg);
      font-family: var(--font-mono);
      font-size: 13px;
      white-space: nowrap;
      animation: pop 0.2s ease-out;
    }
    .pill__clear {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      padding: 0;
      border: 0;
      border-radius: 50%;
      background: var(--bg-hover);
      color: var(--text);
    }
    .pill__clear:hover {
      color: var(--text-strong);
      background: var(--border);
    }
    svg {
      width: 14px;
      height: 14px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.4;
      stroke-linecap: round;
    }
    @keyframes pop {
      from {
        opacity: 0;
        transform: translate(-50%, 8px);
      }
    }
  `,
})
export class FilterPill {
  protected readonly filter = inject(SkillFilterService);
  protected readonly ui = inject(LocaleService).ui;
  protected readonly label = computed(() => {
    const id = this.filter.active();
    return id ? skillLabel(id) : null;
  });
}
