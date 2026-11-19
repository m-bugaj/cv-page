import { CvContent, Lang, RichText, SectionId, Theme } from '../data/cv.model';
import { SITE, siteEmail, sitePhoneDisplay, sitePhoneHref } from '../data/site.config';
import { findSkill, skillLabel } from '../data/skills';
import { UiStrings } from '../data/ui.en';
import { countSkillMatches } from '../core/skill-filter.service';

/* ----------------------------------------------------------------------------------------------
 * Pure command logic of the terminal: text in → output blocks + side effects out.
 * The component applies the effects (theme, language, scrolling...), which keeps this testable.
 * -------------------------------------------------------------------------------------------- */

export type OutBlock =
  | { t: 'text'; text: RichText; tone?: 'muted' | 'error' | 'success'; plain?: boolean }
  | { t: 'list'; items: RichText[] }
  | { t: 'table'; rows: { key: string; value: string; href?: string }[] }
  | { t: 'chips'; label?: string; items: string[] };

export type Effect =
  | { type: 'theme'; theme: Theme }
  | { type: 'lang'; lang: Lang }
  | { type: 'scroll'; section: SectionId }
  | { type: 'filter'; skill: string | null }
  | { type: 'download'; href: string }
  | { type: 'clear' };

export interface CommandContext {
  cv: CvContent;
  ui: UiStrings;
  lang: Lang;
  theme: Theme;
  history: readonly string[];
}

export interface CommandResult {
  output: OutBlock[];
  effects: Effect[];
}

export const COMMANDS = [
  'help',
  'whoami',
  'about',
  'skills',
  'experience',
  'projects',
  'education',
  'certs',
  'music',
  'contact',
  'cv',
  'theme',
  'lang',
  'goto',
  'filter',
  'ls',
  'cat',
  'history',
  'clear',
  'echo',
  'pwd',
  'sudo',
  'exit',
] as const;

const ALIASES: Record<string, string> = {
  '?': 'help',
  man: 'help',
  exp: 'experience',
  work: 'experience',
  edu: 'education',
  certificates: 'certs',
  resume: 'cv',
  download: 'cv',
  cls: 'clear',
  cd: 'goto',
  dir: 'ls',
};

export const GOTO_SECTIONS: SectionId[] = [
  'about',
  'terminal',
  'skills',
  'experience',
  'projects',
  'education',
  'music',
  'contact',
];

/** Pseudo files for `ls` / `cat`, each mapped to the command that prints it. */
export const FILES: Record<string, string> = {
  'about.txt': 'about',
  'skills.json': 'skills',
  'experience.log': 'experience',
  'projects.md': 'projects',
  'education.md': 'education',
  'certs.txt': 'certs',
  'contact.vcf': 'contact',
  'music.mp3': '',
  'cv.pdf': 'cv',
};

const THEMES: Theme[] = ['dark', 'light'];
const LANGS: Lang[] = ['en', 'pl'];

const text = (t: RichText, tone?: 'muted' | 'error' | 'success'): OutBlock => ({ t: 'text', text: t, tone });
const plain = (t: string, tone?: 'muted' | 'error' | 'success'): OutBlock => ({ t: 'text', text: t, tone, plain: true });
const result = (output: OutBlock[], effects: Effect[] = []): CommandResult => ({ output, effects });

/** Splits "filter  Spring Boot" into ["filter", "Spring Boot"]. */
export function parseInput(raw: string): { name: string; arg: string } {
  const trimmed = raw.trim();
  const space = trimmed.search(/\s/);
  if (space === -1) return { name: trimmed.toLowerCase(), arg: '' };
  return { name: trimmed.slice(0, space).toLowerCase(), arg: trimmed.slice(space + 1).trim() };
}

export function resolveCommand(name: string): string | null {
  const n = ALIASES[name] ?? name;
  return (COMMANDS as readonly string[]).includes(n) ? n : null;
}

export function runCommand(raw: string, ctx: CommandContext): CommandResult {
  const { name, arg } = parseInput(raw);
  if (!name) return result([]);
  const cmd = resolveCommand(name);
  if (!cmd) return result([text(ctx.ui.terminal.notFound(escapeRich(name)), 'error')]);
  const { ui, cv } = ctx;
  const t = ui.terminal;

  switch (cmd) {
    case 'help':
      return result([
        text(t.help.intro),
        {
          t: 'table',
          rows: Object.entries(t.help.commands).map(([key, value]) => ({ key, value })),
        },
        text(t.help.tip, 'muted'),
      ]);

    case 'whoami':
      return result([text(`**${cv.name}** — ${cv.role} @ Comarch`), plain(`// ${cv.tagline}`, 'muted')]);

    case 'about':
      return result(cv.about.map((p) => text(p)));

    case 'skills':
      return result([
        {
          t: 'table',
          rows: [
            ...cv.skillGroups.map((g) => ({ key: g.label, value: g.skills.map(skillLabel).join(', ') })),
            { key: 'academic', value: cv.academicSkills.map(skillLabel).join(', ') },
          ],
        },
        text(t.skillsTip, 'muted'),
      ]);

    case 'experience':
      return result(
        cv.experience.flatMap((job) => [
          text(`**${job.role}** @ [${job.company}](${job.companyUrl})`),
          plain(job.period, 'success'),
          { t: 'list', items: job.bullets.map((b) => b.text) } as OutBlock,
        ]),
      );

    case 'projects':
      return result(
        cv.projects.flatMap((p) => [
          text(`[${p.name}](${p.url}) – ${p.subtitle}`),
          plain(p.period, 'success'),
        ]),
      );

    case 'education':
      return result(
        cv.education.flatMap((e) => [
          text(`**${e.school}**`),
          plain(e.period, 'success'),
          { t: 'list', items: e.degrees } as OutBlock,
        ]),
      );

    case 'certs':
      return result([{ t: 'list', items: cv.certificates.map((c) => `${c.date} | ${c.issuer} — **${c.name}** ${c.detail}`) }]);

    case 'music':
      return result([text(cv.music.intro)]);

    case 'contact':
      return result([contactTable(), text(t.contactTip, 'muted')]);

    case 'cv': {
      const href = SITE.cvPdf[ctx.lang];
      return result([text(t.cvDownload(href.split('/').pop() ?? href), 'success')], [{ type: 'download', href }]);
    }

    case 'theme': {
      const wanted = arg.toLowerCase();
      if (wanted && !THEMES.includes(wanted as Theme)) return result([plain(t.usage('theme [dark|light]'), 'error')]);
      const theme: Theme = (wanted as Theme) || (ctx.theme === 'dark' ? 'light' : 'dark');
      if (theme === ctx.theme) return result([text(t.themeNow(theme))]);
      return result([text(t.themeSet(theme), 'success')], [{ type: 'theme', theme }]);
    }

    case 'lang': {
      const wanted = arg.toLowerCase();
      if (wanted && !LANGS.includes(wanted as Lang)) return result([plain(t.usage('lang [en|pl]'), 'error')]);
      const lang: Lang = (wanted as Lang) || (ctx.lang === 'en' ? 'pl' : 'en');
      if (lang === ctx.lang) return result([text(t.langNow(lang))]);
      return result([text(t.langSet(lang), 'success')], [{ type: 'lang', lang }]);
    }

    case 'goto': {
      const section = resolveSection(arg, ui);
      if (!arg) return result([plain(t.usage(`goto <${GOTO_SECTIONS.join('|')}>`), 'error')]);
      if (!section) return result([plain(t.gotoUnknown(arg), 'error'), plain(GOTO_SECTIONS.join('  '), 'muted')]);
      return result([text(t.gotoDone(ui.nav[section] ?? section))], [{ type: 'scroll', section }]);
    }

    case 'filter': {
      if (!arg) return result([plain(t.usage('filter <skill|off>'), 'error')]);
      if (['off', 'clear', 'none', 'reset'].includes(arg.toLowerCase())) {
        return result([text(t.filterOff)], [{ type: 'filter', skill: null }]);
      }
      const skill = findSkill(arg);
      if (!skill) return result([text(t.filterUnknown(escapeRich(arg)), 'error')]);
      const m = countSkillMatches(cv, skill);
      const section: SectionId = m.experience > 0 ? 'experience' : m.projects > 0 ? 'projects' : 'skills';
      return result(
        [text(t.filterSet(skillLabel(skill), m.experience, m.projects), 'success')],
        [
          { type: 'filter', skill },
          { type: 'scroll', section },
        ],
      );
    }

    case 'ls':
      return result([{ t: 'chips', items: Object.keys(FILES) }]);

    case 'cat': {
      if (!arg) return result([plain(t.usage('cat <file>'), 'error')]);
      const target = FILES[arg];
      if (target === undefined) return result([plain(t.noSuchFile(arg), 'error')]);
      if (target === '') return result([text(t.binaryFile, 'muted')]);
      return runCommand(target, ctx);
    }

    case 'history':
      return result(
        ctx.history.length
          ? [{ t: 'list', items: ctx.history.map((h, i) => `${i + 1}  ${escapeRich(h)}`) }]
          : [plain(t.historyEmpty, 'muted')],
      );

    case 'clear':
      return result([], [{ type: 'clear' }]);

    case 'echo':
      return result([plain(arg)]);

    case 'pwd':
      return result([plain('/home/guest')]);

    case 'sudo':
      if (arg.toLowerCase().replace(/\s+/g, '-') === 'hire-me') {
        return result([plain(t.sudoPassword, 'muted'), text(t.sudoGranted, 'success'), contactTable()]);
      }
      return result([plain(t.sudoDenied, 'error')]);

    case 'exit':
      return result([text(t.exit, 'muted')]);
  }
  return result([]);
}

function contactTable(): OutBlock {
  return {
    t: 'table',
    rows: [
      { key: 'mail', value: siteEmail(), href: `mailto:${siteEmail()}` },
      { key: 'tel', value: sitePhoneDisplay(), href: sitePhoneHref() },
      { key: 'in', value: 'linkedin.com/in/michalbugaj', href: SITE.links.linkedin },
      { key: 'git', value: 'github.com/m-bugaj', href: SITE.links.github },
    ],
  };
}

/** Accepts section ids and the localized nav labels ("doświadczenie"). */
function resolveSection(arg: string, ui: UiStrings): SectionId | null {
  const q = arg.trim().toLowerCase().replace(/^#/, '');
  if (!q) return null;
  return (
    GOTO_SECTIONS.find((s) => s === q || ui.nav[s]?.toLowerCase() === q) ??
    GOTO_SECTIONS.find((s) => s.startsWith(q)) ??
    null
  );
}

/** Prevents user-typed text from being interpreted as markup. */
function escapeRich(s: string): string {
  return s.replace(/\*\*/g, '* *').replace(/\[/g, '［').replace(/\{/g, '｛');
}

/** Candidates for Tab completion of the current input. */
export function completionOptions(input: string): string[] {
  const value = input.replace(/^\s+/, '');
  const space = value.search(/\s/);
  if (space === -1) {
    const q = value.toLowerCase();
    return COMMANDS.filter((c) => c.startsWith(q));
  }
  const name = resolveCommand(value.slice(0, space).toLowerCase());
  const argQ = value.slice(space + 1).trimStart().toLowerCase();
  const pool: Record<string, readonly string[]> = {
    theme: THEMES,
    lang: LANGS,
    goto: GOTO_SECTIONS,
    cat: Object.keys(FILES),
    sudo: ['hire-me'],
    filter: ['off', 'java', 'spring', 'kafka', 'kubernetes', 'helm', 'docker', 'angular', 'postgres', 'gitlab', 'playwright', 'claude', 'mcp'],
  };
  return (pool[name ?? ''] ?? []).filter((o) => o.startsWith(argQ)).map((o) => `${value.slice(0, space)} ${o}`);
}

/**
 * Tab completion: a single candidate completes fully (plus a trailing space for commands
 * taking arguments); several candidates complete their common prefix.
 */
export function complete(input: string): { value: string; options: string[] } {
  const options = completionOptions(input);
  if (options.length === 0) return { value: input, options };
  if (options.length === 1) {
    const only = options[0];
    const takesArg = ['theme', 'lang', 'goto', 'filter', 'cat', 'sudo', 'echo'].includes(only);
    return { value: takesArg ? only + ' ' : only, options };
  }
  return { value: commonPrefix(options) || input, options };
}

function commonPrefix(values: string[]): string {
  let prefix = values[0];
  for (const v of values.slice(1)) {
    while (!v.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}
