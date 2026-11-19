import { Component, afterNextRender, inject, input, signal } from '@angular/core';
import { LocaleService } from '../core/locale.service';
import { SITE, siteEmail, sitePhoneDisplay, sitePhoneHref } from '../data/site.config';

/**
 * Contact list (tel / mail / in / git). E-mail and phone are assembled only in the browser,
 * so they never appear as plain text in the prerendered HTML.
 */
@Component({
  selector: 'app-contact-links',
  template: `
    <dl class="contact" [class.contact--large]="large()">
      <dt>mail</dt>
      <dd>
        @if (revealed()) {
          <a [href]="'mailto:' + email">{{ email }}</a>
        } @else {
          <span class="muted">[{{ ui().hero.revealHint }}]</span>
        }
      </dd>
      <dt>tel</dt>
      <dd>
        @if (revealed()) {
          <a [href]="phoneHref">{{ phone }}</a>
        } @else {
          <span class="muted">[{{ ui().hero.revealHint }}]</span>
        }
      </dd>
      <dt>in</dt>
      <dd><a [href]="links.linkedin" target="_blank" rel="noopener">linkedin.com/in/michalbugaj</a></dd>
      <dt>git</dt>
      <dd><a [href]="links.github" target="_blank" rel="noopener">github.com/m-bugaj</a></dd>
    </dl>
  `,
  styles: `
    .contact {
      display: grid;
      grid-template-columns: max-content 1fr;
      column-gap: 14px;
      row-gap: 6px;
      margin: 0;
      font-family: var(--font-mono);
      font-size: 13px;
      line-height: 1.5;
    }
    dt {
      color: var(--purple);
    }
    dd {
      margin: 0;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .contact--large {
      font-size: 15px;
      row-gap: 10px;
      column-gap: 20px;
    }
  `,
})
export class ContactLinks {
  readonly large = input(false);
  protected readonly ui = inject(LocaleService).ui;
  protected readonly revealed = signal(false);
  protected readonly links = SITE.links;
  protected readonly email = siteEmail();
  protected readonly phone = sitePhoneDisplay();
  protected readonly phoneHref = sitePhoneHref();

  constructor() {
    afterNextRender(() => this.revealed.set(true));
  }
}
