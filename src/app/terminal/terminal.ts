import {
  Component,
  DOCUMENT,
  ElementRef,
  afterRenderEffect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { LANG_PATH, LocaleService } from '../core/locale.service';
import { RichTextComponent } from '../core/rich-text';
import { ScrollService } from '../core/scroll.service';
import { SkillFilterService } from '../core/skill-filter.service';
import { ThemeService } from '../core/theme.service';
import { CommandContext, Effect, OutBlock, complete, runCommand } from './commands';

type EntryInput = { kind: 'cmd'; text: string } | { kind: 'out'; blocks: OutBlock[] };
type Entry = EntryInput & { id: number };

const SUGGESTIONS = ['help', 'whoami', 'skills', 'experience', 'filter kafka', 'contact', 'theme', 'sudo hire-me'];
const MAX_ENTRIES = 200;

@Component({
  selector: 'app-terminal',
  imports: [RichTextComponent],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss',
})
export class Terminal {
  private readonly locale = inject(LocaleService);
  private readonly theme = inject(ThemeService);
  private readonly filter = inject(SkillFilterService);
  private readonly scroller = inject(ScrollService);
  private readonly router = inject(Router);
  private readonly doc = inject(DOCUMENT);

  protected readonly ui = this.locale.ui;
  protected readonly suggestions = SUGGESTIONS;
  protected readonly input = signal('');
  protected readonly entries = signal<Entry[]>([]);
  protected readonly completions = signal<string[]>([]);

  private readonly history: string[] = [];
  private historyIndex = -1;
  private nextId = 0;

  private readonly body = viewChild.required<ElementRef<HTMLElement>>('body');
  private readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('field');

  constructor() {
    // Deterministic first screen (same on the server and in the browser → clean hydration).
    this.push({ kind: 'cmd', text: 'whoami' });
    this.push({ kind: 'out', blocks: runCommand('whoami', this.context()).output });
    this.push({ kind: 'out', blocks: [{ t: 'text', text: this.ui().terminal.welcome, tone: 'muted' }] });

    // Keep the newest output in view.
    afterRenderEffect(() => {
      this.entries();
      const el = this.body().nativeElement;
      el.scrollTop = el.scrollHeight;
    });
  }

  protected onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this.execute(this.input());
        break;
      case 'Tab': {
        // Only hijack Tab when there is something to complete — otherwise keep normal focus order.
        if (event.shiftKey || !this.input().trim()) return;
        const { value, options } = complete(this.input());
        if (value === this.input() && options.length <= 1) return;
        event.preventDefault();
        this.input.set(value);
        this.completions.set(options.length > 1 ? options : []);
        break;
      }
      case 'ArrowUp':
        event.preventDefault();
        this.browseHistory(1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.browseHistory(-1);
        break;
      case 'Escape':
        this.input.set('');
        this.completions.set([]);
        break;
      default:
        if (event.ctrlKey && event.key.toLowerCase() === 'l') {
          event.preventDefault();
          this.entries.set([]);
        }
    }
  }

  protected onInput(value: string): void {
    this.input.set(value);
    this.completions.set([]);
  }

  /** Clicking the screen focuses the prompt (unless the visitor is selecting text). */
  protected focusInput(): void {
    const selection = this.doc.defaultView?.getSelection();
    if (selection && !selection.isCollapsed) return;
    this.inputEl().nativeElement.focus({ preventScroll: true });
  }

  execute(raw: string): void {
    const value = raw.trim();
    this.input.set('');
    this.completions.set([]);
    this.historyIndex = -1;
    this.push({ kind: 'cmd', text: value });
    if (!value) return;

    this.history.push(value);
    const { output, effects } = runCommand(value, this.context());
    if (output.length) this.push({ kind: 'out', blocks: output });
    effects.forEach((e) => this.apply(e));
  }

  private context(): CommandContext {
    return {
      cv: this.locale.cv(),
      ui: this.ui(),
      lang: this.locale.lang(),
      theme: this.theme.theme(),
      history: [...this.history],
    };
  }

  private apply(effect: Effect): void {
    switch (effect.type) {
      case 'theme':
        this.theme.set(effect.theme);
        break;
      case 'lang':
        void this.router.navigate([LANG_PATH[effect.lang]], { fragment: 'terminal' });
        break;
      case 'scroll':
        // Let the visitor read the answer first, then move the page.
        this.doc.defaultView?.setTimeout(() => this.scroller.scrollTo(effect.section), 600);
        break;
      case 'filter':
        this.filter.set(effect.skill);
        break;
      case 'download': {
        const a = this.doc.createElement('a');
        a.href = effect.href;
        a.download = '';
        a.click();
        break;
      }
      case 'clear':
        this.entries.set([]);
        break;
    }
  }

  private browseHistory(step: 1 | -1): void {
    if (!this.history.length) return;
    const next = Math.min(this.history.length - 1, Math.max(-1, this.historyIndex + step));
    this.historyIndex = next;
    this.input.set(next === -1 ? '' : this.history[this.history.length - 1 - next]);
  }

  private push(entry: EntryInput): void {
    const full: Entry = { ...entry, id: this.nextId++ };
    this.entries.update((list) => [...list, full].slice(-MAX_ENTRIES));
  }
}
