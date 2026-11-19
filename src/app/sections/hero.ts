import { Component, DOCUMENT, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LocaleService } from '../core/locale.service';
import { ScrollService } from '../core/scroll.service';
import { SITE } from '../data/site.config';
import { ContactLinks } from './contact-links';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, ContactLinks],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly locale = inject(LocaleService);
  private readonly scroller = inject(ScrollService);
  private readonly doc = inject(DOCUMENT);

  protected readonly cv = this.locale.cv;
  protected readonly ui = this.locale.ui;
  protected readonly photo = SITE.photo;
  protected readonly cvHref = computed(() => SITE.cvPdf[this.locale.lang()]);

  protected openTerminal(): void {
    this.scroller.scrollTo('terminal');
    this.doc.getElementById('terminal-input')?.focus({ preventScroll: true });
  }
}
