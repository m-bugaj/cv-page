import { DOCUMENT, Service, inject, signal } from '@angular/core';
import { Theme } from '../data/cv.model';

export const THEME_STORAGE_KEY = 'theme';
const THEME_COLOR: Record<Theme, string> = { dark: '#0d1117', light: '#ffffff' };

/**
 * Dark by default. The saved choice is applied before Angular starts by the inline
 * script in index.html; this service reads it from <html data-theme> and keeps it in sync.
 */
@Service()
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly theme = signal<Theme>(this.readInitial());

  toggle(): void {
    this.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    if (theme === this.theme()) return;
    const root = this.doc.documentElement;
    const win = this.doc.defaultView;
    root.classList.add('theme-transition');
    this.theme.set(theme);
    root.setAttribute('data-theme', theme);
    this.doc.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
    try {
      win?.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage can be blocked (private mode); the theme still works for this visit.
    }
    win?.setTimeout(() => root.classList.remove('theme-transition'), 300);
  }

  private readInitial(): Theme {
    return this.doc.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }
}
