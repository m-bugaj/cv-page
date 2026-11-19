import { CV_EN } from '../data/cv.en';
import { CV_PL } from '../data/cv.pl';
import { UI_EN } from '../data/ui.en';
import { UI_PL } from '../data/ui.pl';
import { CommandContext, complete, parseInput, runCommand } from './commands';

const ctx = (over: Partial<CommandContext> = {}): CommandContext => ({
  cv: CV_EN,
  ui: UI_EN,
  lang: 'en',
  theme: 'dark',
  history: [],
  ...over,
});

const firstText = (raw: string, c = ctx()) => {
  const block = runCommand(raw, c).output[0];
  return block?.t === 'text' ? block.text : '';
};

describe('terminal commands', () => {
  it('parses the command name case-insensitively and keeps the argument', () => {
    expect(parseInput('  FILTER  Spring Boot ')).toEqual({ name: 'filter', arg: 'Spring Boot' });
    expect(parseInput('help')).toEqual({ name: 'help', arg: '' });
  });

  it('prints help as a table of commands', () => {
    const { output } = runCommand('help', ctx());
    const table = output.find((b) => b.t === 'table');
    expect(table?.t === 'table' && table.rows.map((r) => r.key)).toContain('cv');
  });

  it('reports unknown commands without interpreting user markup', () => {
    const { output, effects } = runCommand('**rm** -rf', ctx());
    expect(output[0]).toMatchObject({ t: 'text', tone: 'error' });
    expect(firstText('**rm**')).not.toContain('**rm**');
    expect(effects).toEqual([]);
  });

  it('switches the theme, or toggles it without an argument', () => {
    expect(runCommand('theme light', ctx()).effects).toEqual([{ type: 'theme', theme: 'light' }]);
    expect(runCommand('theme', ctx({ theme: 'light' })).effects).toEqual([{ type: 'theme', theme: 'dark' }]);
    expect(runCommand('theme dark', ctx()).effects).toEqual([]);
    expect(runCommand('theme blue', ctx()).output[0]).toMatchObject({ tone: 'error' });
  });

  it('switches the language', () => {
    expect(runCommand('lang pl', ctx()).effects).toEqual([{ type: 'lang', lang: 'pl' }]);
    expect(runCommand('lang', ctx({ lang: 'pl', cv: CV_PL, ui: UI_PL })).effects).toEqual([
      { type: 'lang', lang: 'en' },
    ]);
  });

  it('filters by skill alias and scrolls to the first match', () => {
    const { effects } = runCommand('filter k8s', ctx());
    expect(effects).toEqual([
      { type: 'filter', skill: 'kubernetes' },
      { type: 'scroll', section: 'experience' },
    ]);
    expect(runCommand('filter off', ctx()).effects).toEqual([{ type: 'filter', skill: null }]);
    expect(runCommand('filter cobol', ctx()).effects).toEqual([]);
  });

  it('scrolls to sections by id or localized name', () => {
    expect(runCommand('goto music', ctx()).effects).toEqual([{ type: 'scroll', section: 'music' }]);
    expect(runCommand('goto doświadczenie', ctx({ ui: UI_PL })).effects).toEqual([
      { type: 'scroll', section: 'experience' },
    ]);
    expect(runCommand('goto nowhere', ctx()).effects).toEqual([]);
  });

  it('downloads the CV in the current language', () => {
    expect(runCommand('cv', ctx({ lang: 'pl' })).effects).toEqual([
      { type: 'download', href: '/cv/michal-bugaj-cv-pl.pdf' },
    ]);
  });

  it('maps cat to commands and handles missing files', () => {
    expect(runCommand('cat about.txt', ctx()).output).toEqual(runCommand('about', ctx()).output);
    expect(runCommand('cat secrets.env', ctx()).output[0]).toMatchObject({ tone: 'error' });
  });

  it('has an easter egg for sudo hire-me only', () => {
    expect(runCommand('sudo hire-me', ctx()).output.some((b) => b.t === 'table')).toBe(true);
    expect(runCommand('sudo rm -rf /', ctx()).output[0]).toMatchObject({ tone: 'error' });
  });

  it('clears the screen', () => {
    expect(runCommand('clear', ctx()).effects).toEqual([{ type: 'clear' }]);
  });

  it('answers in the page language', () => {
    expect(firstText('exit', ctx({ ui: UI_PL }))).toBe(UI_PL.terminal.exit);
  });
});

describe('tab completion', () => {
  it('completes a unique command and adds a space when it takes an argument', () => {
    expect(complete('fil').value).toBe('filter ');
    expect(complete('who').value).toBe('whoami');
  });

  it('completes the common prefix and lists candidates', () => {
    const { value, options } = complete('e');
    expect(value).toBe('e');
    expect(options).toEqual(expect.arrayContaining(['experience', 'education', 'echo', 'exit']));
  });

  it('completes arguments', () => {
    expect(complete('theme l').value).toBe('theme light');
    expect(complete('cat ab').value).toBe('cat about.txt');
  });

  it('leaves unknown input alone', () => {
    expect(complete('xyz')).toEqual({ value: 'xyz', options: [] });
  });
});
