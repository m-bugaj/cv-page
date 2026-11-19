import { Component, computed, inject } from '@angular/core';
import { LocaleService } from '../core/locale.service';
import { RevealDirective } from '../core/reveal.directive';
import { RichTextComponent } from '../core/rich-text';
import { SITE } from '../data/site.config';

@Component({
  selector: 'app-music',
  imports: [RichTextComponent, RevealDirective],
  templateUrl: './music.html',
  styleUrl: './music.scss',
})
export class Music {
  private readonly locale = inject(LocaleService);
  protected readonly ui = this.locale.ui;
  protected readonly music = computed(() => this.locale.cv().music);

  /** Cards with their link resolved from site.config (cards without a configured link get none). */
  protected readonly cards = computed(() =>
    this.music().cards.map((c) => ({ ...c, href: c.linkKey ? SITE.links[c.linkKey] : '' })),
  );
}
