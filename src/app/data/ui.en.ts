import { SectionId } from './cv.model';

export interface UiStrings {
  meta: { title: string; description: string; locale: string };
  skipToContent: string;
  nav: Partial<Record<SectionId, string>>;
  sectionTitles: Record<
    | 'about'
    | 'skills'
    | 'academic'
    | 'languages'
    | 'certificates'
    | 'experience'
    | 'projects'
    | 'education'
    | 'music'
    | 'contact',
    string
  >;
  header: {
    menu: string;
    closeMenu: string;
    switchToLight: string;
    switchToDark: string;
    languageLabel: string;
    otherLanguageName: string;
    downloadCv: string;
  };
  hero: {
    photoAlt: string;
    downloadCv: string;
    openTerminal: string;
    contactLabel: string;
    revealHint: string;
  };
  skills: {
    hint: string;
    filterActive: string;
    clearFilter: string;
    matches: (n: number) => string;
  };
  experience: { at: string; openSite: string };
  projects: { openRepo: string; stack: string };
  music: { linkSoon: string; open: string };
  contact: { lead: string; downloadCv: string };
  footer: { builtWith: string };
  terminal: {
    title: string;
    inputLabel: string;
    welcome: string;
    suggestions: string;
    notFound: (cmd: string) => string;
    help: {
      intro: string;
      tip: string;
      commands: Record<string, string>;
    };
    usage: (usage: string) => string;
    themeNow: (theme: string) => string;
    themeSet: (theme: string) => string;
    langSet: (lang: string) => string;
    langNow: (lang: string) => string;
    gotoDone: (section: string) => string;
    gotoUnknown: (section: string) => string;
    filterSet: (skill: string, exp: number, proj: number) => string;
    filterOff: string;
    filterUnknown: (q: string) => string;
    skillsTip: string;
    cvDownload: (file: string) => string;
    noSuchFile: (file: string) => string;
    binaryFile: string;
    sudoPassword: string;
    sudoGranted: string;
    sudoDenied: string;
    exit: string;
    historyEmpty: string;
    contactTip: string;
  };
}

export const UI_EN: UiStrings = {
  meta: {
    title: 'Michał Bugaj – Java Software Developer',
    description:
      'Interactive CV of Michał Bugaj: Java Software Developer at Comarch. Spring Boot microservices, Kafka, Kubernetes, GitLab CI and Angular.',
    locale: 'en_US',
  },
  skipToContent: 'Skip to content',
  nav: {
    about: 'about',
    skills: 'skills',
    experience: 'experience',
    projects: 'projects',
    music: 'music',
    contact: 'contact',
  },
  sectionTitles: {
    about: 'About Me',
    skills: 'Skills',
    academic: 'Academic Skills',
    languages: 'Languages',
    certificates: 'Certificates',
    experience: 'Work Experience',
    projects: 'Projects',
    education: 'Education',
    music: 'Beyond Code',
    contact: 'Contact',
  },
  header: {
    menu: 'Open menu',
    closeMenu: 'Close menu',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    languageLabel: 'Language',
    otherLanguageName: 'Polski',
    downloadCv: 'Download CV (PDF)',
  },
  hero: {
    photoAlt: 'Photo of Michał Bugaj',
    downloadCv: 'Download CV',
    openTerminal: 'Open terminal',
    contactLabel: 'Contact details',
    revealHint: 'enable JavaScript to see',
  },
  skills: {
    hint: 'Click a skill to highlight where I used it.',
    filterActive: 'Filter',
    clearFilter: 'Clear skill filter',
    matches: (n) => (n === 1 ? '1 match' : `${n} matches`),
  },
  experience: { at: 'at', openSite: 'opens the company website' },
  projects: { openRepo: 'opens the repository on GitHub', stack: 'Stack' },
  music: { linkSoon: 'link coming soon', open: 'Open' },
  contact: {
    lead: "Open to new challenges in backend, DevOps and full-stack work. Let's talk.",
    downloadCv: 'Download CV (PDF)',
  },
  footer: { builtWith: 'Built with Angular, served as static files.' },
  terminal: {
    title: 'guest@michalbugaj: ~',
    inputLabel: 'Terminal command',
    welcome: 'Welcome! Type **help** to see the available commands, or tap one below.',
    suggestions: 'Suggested commands',
    notFound: (cmd) => `command not found: ${cmd}. Type **help** to see the available commands.`,
    help: {
      intro: 'Available commands:',
      tip: 'Tip: **Tab** completes, **↑/↓** browse history, **Ctrl+L** clears.',
      commands: {
        help: 'show this help',
        whoami: 'who am I, in one line',
        about: 'a few words about me',
        skills: 'my tech stack',
        experience: 'work experience',
        projects: 'side projects',
        education: 'education',
        certs: 'certificates',
        music: 'music: platinum & gold records',
        contact: 'how to reach me',
        cv: 'download my CV as PDF',
        'theme [dark|light]': 'switch the colour theme',
        'lang [en|pl]': 'switch the language',
        'goto <section>': 'scroll to a section',
        'filter <skill|off>': 'highlight where I used a skill',
        'ls / cat <file>': 'browse my files',
        history: 'commands you typed',
        clear: 'clear the screen',
      },
    },
    usage: (u) => `usage: ${u}`,
    themeNow: (t) => `Current theme: **${t}**.`,
    themeSet: (t) => `Theme switched to **${t}**.`,
    langSet: (l) => `Switching language to **${l}**…`,
    langNow: (l) => `Current language: **${l}**.`,
    gotoDone: (s) => `Scrolling to **${s}**…`,
    gotoUnknown: (s) => `No such section: ${s}.`,
    filterSet: (skill, exp, proj) =>
      `Filter: **${skill}** → ${exp} in experience, ${proj} in projects. Scrolling…`,
    filterOff: 'Skill filter cleared.',
    filterUnknown: (q) => `Unknown skill: ${q}. Try **skills** to see the list.`,
    skillsTip: 'Tip: **filter kafka** highlights where I used Kafka.',
    cvDownload: (f) => `Downloading **${f}**…`,
    noSuchFile: (f) => `cat: ${f}: No such file or directory`,
    binaryFile: 'cat: music.mp3: binary file — try **music** instead. 🎧',
    sudoPassword: '[sudo] password for guest: ********',
    sudoGranted: 'Permission granted. Great choice! Here is how to reach me:',
    sudoDenied: 'guest is not in the sudoers file. This incident will be reported.',
    exit: "There's no exit from a good CV. Try **contact** instead.",
    historyEmpty: 'No commands yet.',
    contactTip: 'Or try **sudo hire-me**.',
  },
};
