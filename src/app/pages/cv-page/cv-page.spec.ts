import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';

describe('CvPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  it('renders the English CV at /', async () => {
    const harness = await RouterTestingHarness.create('/');
    const el = harness.routeNativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Michał Bugaj');
    expect(el.querySelector('#experience h2')?.textContent).toContain('Work Experience');
    expect(el.querySelector('#terminal-input')).toBeTruthy();
    expect(document.documentElement.lang).toBe('en');
  });

  it('renders the Polish CV at /pl', async () => {
    const harness = await RouterTestingHarness.create('/pl');
    const el = harness.routeNativeElement as HTMLElement;
    expect(el.querySelector('#experience h2')?.textContent).toContain('Doświadczenie');
    expect(el.querySelector('#music h2')?.textContent).toContain('Poza kodem');
    expect(document.documentElement.lang).toBe('pl');
  });

  it('highlights experience when a skill chip is clicked', async () => {
    const harness = await RouterTestingHarness.create('/');
    const el = harness.routeNativeElement as HTMLElement;
    const helm = [...el.querySelectorAll<HTMLButtonElement>('#skills button.chip')].find(
      (b) => b.textContent?.trim() === 'Helm',
    );
    helm?.click();
    await harness.fixture.whenStable();
    expect(helm?.getAttribute('aria-pressed')).toBe('true');
    expect(el.querySelectorAll('#experience li.is-match').length).toBe(1);
  });
});
