import { Service, computed, signal } from '@angular/core';
import { CvContent, Lang } from '../data/cv.model';
import { CV_EN } from '../data/cv.en';
import { CV_PL } from '../data/cv.pl';
import { UI_EN, UiStrings } from '../data/ui.en';
import { UI_PL } from '../data/ui.pl';

const CONTENT: Record<Lang, { cv: CvContent; ui: UiStrings }> = {
  en: { cv: CV_EN, ui: UI_EN },
  pl: { cv: CV_PL, ui: UI_PL },
};

/** Route path of each language version (EN is the root). */
export const LANG_PATH: Record<Lang, string> = { en: '/', pl: '/pl' };

/** Current language, set by the page from its route data. */
@Service()
export class LocaleService {
  readonly lang = signal<Lang>('en');
  readonly cv = computed(() => CONTENT[this.lang()].cv);
  readonly ui = computed(() => CONTENT[this.lang()].ui);
  readonly path = computed(() => LANG_PATH[this.lang()]);
  readonly otherLang = computed<Lang>(() => (this.lang() === 'en' ? 'pl' : 'en'));
  readonly otherPath = computed(() => LANG_PATH[this.otherLang()]);
}
