import { Component, computed, input } from '@angular/core';
import { RichText } from '../data/cv.model';

export type RichSegment =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string }
  | { kind: 'link'; text: string; href: string }
  | { kind: 'tone'; text: string; tone: 'platinum' | 'gold' };

const TOKEN = /\*\*(.+?)\*\*|\[(.+?)\]\((https?:\/\/[^)\s]+)\)|\{(platinum|gold):(.+?)\}/g;

/** Parses the tiny inline markup used in the content files (see RichText). */
export function parseRich(source: RichText): RichSegment[] {
  const out: RichSegment[] = [];
  let last = 0;
  for (const m of source.matchAll(TOKEN)) {
    const index = m.index ?? 0;
    if (index > last) out.push({ kind: 'text', text: source.slice(last, index) });
    if (m[1] !== undefined) out.push({ kind: 'strong', text: m[1] });
    else if (m[2] !== undefined) out.push({ kind: 'link', text: m[2], href: m[3] });
    else out.push({ kind: 'tone', text: m[5], tone: m[4] as 'platinum' | 'gold' });
    last = index + m[0].length;
  }
  if (last < source.length) out.push({ kind: 'text', text: source.slice(last) });
  return out;
}

/** Plain-text version (markup removed), e.g. for meta tags. */
export function richToPlain(source: RichText): string {
  return parseRich(source)
    .map((s) => s.text)
    .join('');
}

@Component({
  selector: 'app-rich',
  template: `@for (seg of segments(); track $index) {
    @switch (seg.kind) {
      @case ('strong') {
        <strong>{{ seg.text }}</strong>
      }
      @case ('link') {
        <a class="link" [href]="seg.href" target="_blank" rel="noopener">{{ seg.text }}</a>
      }
      @case ('tone') {
        <strong class="tone" [class]="'tone--' + seg.tone">{{ seg.text }}</strong>
      }
      @default {
        <span>{{ seg.text }}</span>
      }
    }
  }`,
  styles: `
    .tone {
      white-space: nowrap;
    }
    .tone--platinum {
      color: var(--text-platinum);
    }
    .tone--gold {
      color: var(--gold);
    }
  `,
})
export class RichTextComponent {
  readonly text = input.required<RichText>();
  protected readonly segments = computed(() => parseRich(this.text()));
}
