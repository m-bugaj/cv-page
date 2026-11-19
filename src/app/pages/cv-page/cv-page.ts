import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocaleService } from '../../core/locale.service';
import { ScrollService } from '../../core/scroll.service';
import { SeoService } from '../../core/seo.service';
import { SkillFilterService } from '../../core/skill-filter.service';
import { Lang } from '../../data/cv.model';
import { FilterPill } from '../../layout/filter-pill';
import { SiteFooter } from '../../layout/site-footer';
import { SiteHeader } from '../../layout/site-header';
import { About } from '../../sections/about';
import { Contact } from '../../sections/contact';
import { Education } from '../../sections/education';
import { Experience } from '../../sections/experience';
import { Hero } from '../../sections/hero';
import { Music } from '../../sections/music';
import { Projects } from '../../sections/projects';
import { SkillsPanel } from '../../sections/skills-panel';
import { Terminal } from '../../terminal/terminal';

/** The whole CV. One instance per language route ('' = EN, 'pl' = PL). */
@Component({
  selector: 'app-cv-page',
  imports: [
    SiteHeader,
    Hero,
    Terminal,
    About,
    SkillsPanel,
    Experience,
    Projects,
    Education,
    Music,
    Contact,
    SiteFooter,
    FilterPill,
  ],
  templateUrl: './cv-page.html',
  styleUrl: './cv-page.scss',
})
export class CvPage {
  private readonly locale = inject(LocaleService);
  private readonly scroller = inject(ScrollService);
  protected readonly ui = this.locale.ui;

  constructor() {
    const lang = (inject(ActivatedRoute).snapshot.data['lang'] as Lang | undefined) ?? 'en';
    this.locale.lang.set(lang);
    inject(SeoService).apply(lang);
    inject(SkillFilterService).set(null);
  }

  protected skipToMain(event: Event): void {
    event.preventDefault();
    this.scroller.scrollTo('main', { focus: true });
  }
}
