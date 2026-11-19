import { Service, signal } from '@angular/core';
import { CvContent } from '../data/cv.model';

export interface FilterState {
  /** true when this item should be highlighted */
  match: boolean;
  /** true when another skill is active and this item does not use it */
  dimmed: boolean;
}

/** Counts how many experience bullets and projects use a skill. */
export function countSkillMatches(cv: CvContent, skill: string): { experience: number; projects: number } {
  const experience = cv.experience
    .flatMap((e) => e.bullets)
    .filter((b) => b.skills.includes(skill)).length;
  const projects = cv.projects.filter((p) => p.bullets.some((b) => b.skills.includes(skill))).length;
  return { experience, projects };
}

/** The skill currently highlighted across the page (null = no filter). */
@Service()
export class SkillFilterService {
  readonly active = signal<string | null>(null);

  toggle(skill: string): void {
    this.active.update((current) => (current === skill ? null : skill));
  }

  set(skill: string | null): void {
    this.active.set(skill);
  }

  /** Highlight state for an item tagged with `skills`. Reads the signal, so use it in templates/computed. */
  state(skills: readonly string[]): FilterState {
    const active = this.active();
    if (!active) return { match: false, dimmed: false };
    const match = skills.includes(active);
    return { match, dimmed: !match };
  }
}
