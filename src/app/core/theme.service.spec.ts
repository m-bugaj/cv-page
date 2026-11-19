import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { THEME_STORAGE_KEY, ThemeService } from './theme.service';

describe('ThemeService', () => {
  let doc: Document;

  beforeEach(() => {
    localStorage.clear();
    doc = TestBed.inject(DOCUMENT);
    doc.documentElement.setAttribute('data-theme', 'dark');
  });

  it('is dark by default', () => {
    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
  });

  it('picks up the theme applied by the inline script', () => {
    doc.documentElement.setAttribute('data-theme', 'light');
    expect(TestBed.inject(ThemeService).theme()).toBe('light');
  });

  it('toggles, updates <html data-theme> and remembers the choice', () => {
    const service = TestBed.inject(ThemeService);
    service.toggle();
    expect(service.theme()).toBe('light');
    expect(doc.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');

    service.toggle();
    expect(doc.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });
});
