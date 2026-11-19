import { DOCUMENT, Service, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Lang } from '../data/cv.model';
import { CV_EN } from '../data/cv.en';
import { SITE } from '../data/site.config';
import { UI_EN } from '../data/ui.en';
import { UI_PL } from '../data/ui.pl';
import { LANG_PATH } from './locale.service';

const UI = { en: UI_EN, pl: UI_PL };

/** Sets <html lang>, title, description, Open Graph, canonical/hreflang and JSON-LD per language. */
@Service()
export class SeoService {
  private readonly doc = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  apply(lang: Lang): void {
    const ui = UI[lang];
    this.doc.documentElement.setAttribute('lang', lang);
    this.title.setTitle(ui.meta.title);

    const image = SITE.url ? SITE.url + SITE.ogImage : SITE.ogImage;
    const tags: Record<string, string> = {
      description: ui.meta.description,
      'og:title': ui.meta.title,
      'og:description': ui.meta.description,
      'og:type': 'profile',
      'og:locale': ui.meta.locale,
      'og:image': image,
      'og:image:width': '1200',
      'og:image:height': '630',
      'profile:first_name': 'Michał',
      'profile:last_name': 'Bugaj',
      'twitter:card': 'summary_large_image',
    };
    for (const [name, content] of Object.entries(tags)) {
      const attr = name.startsWith('og:') || name.startsWith('profile:') ? 'property' : 'name';
      this.meta.updateTag({ [attr]: name, content }, `${attr}="${name}"`);
    }

    if (SITE.url) {
      const url = (l: Lang) => SITE.url + (LANG_PATH[l] === '/' ? '/' : LANG_PATH[l] + '/');
      this.meta.updateTag({ property: 'og:url', content: url(lang) }, 'property="og:url"');
      this.setLink('canonical', url(lang));
      this.setLink('alternate', url('en'), 'en');
      this.setLink('alternate', url('pl'), 'pl');
      this.setLink('alternate', url('en'), 'x-default');
    }

    this.setJsonLd(lang);
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
    let link = this.doc.head.querySelector<HTMLLinkElement>(selector);
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', rel);
      if (hreflang) link.setAttribute('hreflang', hreflang);
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private setJsonLd(lang: Lang): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: CV_EN.name,
      jobTitle: CV_EN.role,
      worksFor: { '@type': 'Organization', name: 'Comarch', url: 'https://www.comarch.pl' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Politechnika Śląska' },
      knowsLanguage: ['pl', 'en'],
      description: UI[lang].meta.description,
      ...(SITE.url ? { url: SITE.url + '/', image: SITE.url + SITE.photo } : {}),
      sameAs: [SITE.links.linkedin, SITE.links.github],
    };
    let script = this.doc.head.querySelector<HTMLScriptElement>('script#ld-person');
    if (!script) {
      script = this.doc.createElement('script');
      script.id = 'ld-person';
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
