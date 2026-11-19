import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LANG_PATH, LocaleService } from '../core/locale.service';
import { ScrollService } from '../core/scroll.service';
import { ThemeService } from '../core/theme.service';
import { Lang, SectionId } from '../data/cv.model';
import { SITE } from '../data/site.config';

const NAV: SectionId[] = ['about', 'skills', 'experience', 'projects', 'music', 'contact'];

@Component({
  selector: 'app-site-header',
  imports: [RouterLink],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  host: { '(document:keydown.escape)': 'menuOpen.set(false)' },
})
export class SiteHeader {
  protected readonly locale = inject(LocaleService);
  protected readonly theme = inject(ThemeService);
  private readonly scroller = inject(ScrollService);

  protected readonly ui = this.locale.ui;
  protected readonly menuOpen = signal(false);
  protected readonly langs: Lang[] = ['en', 'pl'];
  protected readonly langPath = LANG_PATH;

  protected readonly nav = computed(() =>
    NAV.map((id) => ({ id, label: this.ui().nav[id] ?? id, href: `${this.locale.path()}#${id}` })),
  );
  protected readonly cvHref = computed(() => SITE.cvPdf[this.locale.lang()]);
  protected readonly themeLabel = computed(() =>
    this.theme.theme() === 'dark' ? this.ui().header.switchToLight : this.ui().header.switchToDark,
  );

  protected go(event: Event, id: string): void {
    event.preventDefault();
    this.menuOpen.set(false);
    this.scroller.scrollTo(id, { focus: id !== 'top' });
  }
}
