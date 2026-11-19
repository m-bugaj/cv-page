export type Lang = 'en' | 'pl';
export type Theme = 'dark' | 'light';

/** Ids of the page sections, used for anchors, the nav and the terminal `goto` command. */
export type SectionId =
  | 'top'
  | 'terminal'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'education'
  | 'music'
  | 'contact';

/**
 * Text with a tiny inline markup, parsed by `parseRich()`:
 * `**bold**`, `[label](https://url)`, `{platinum:text}`, `{gold:text}`.
 */
export type RichText = string;

export interface Bullet {
  text: RichText;
  /** Skill ids (see skills.ts) used in this item — drives the skill filter. */
  skills: string[];
}

export interface SkillGroup {
  /** Short lowercase label shown as `# backend`. */
  label: string;
  skills: string[];
}

export interface Stat {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  companyUrl: string;
  period: string;
  bullets: Bullet[];
}

export interface Project {
  name: string;
  subtitle: string;
  url: string;
  period: string;
  bullets: Bullet[];
}

export interface EducationItem {
  school: string;
  period: string;
  degrees: RichText[];
  notes: string[];
}

export interface Certificate {
  date: string;
  issuer: string;
  name: string;
  detail: string;
}

export interface MusicRecord {
  count: string;
  label: string;
  tone: 'platinum' | 'gold';
}

export interface MusicCard {
  title: string;
  text: RichText;
  /** Key of a link in SITE.links (may be empty until configured). */
  linkKey?: 'youtube' | 'musicBusiness' | 'beatsy';
}

export interface CvContent {
  name: string;
  role: string;
  tagline: string;
  about: RichText[];
  stats: Stat[];
  skillGroups: SkillGroup[];
  academicSkills: string[];
  languages: RichText[];
  certificates: Certificate[];
  experience: ExperienceItem[];
  projects: Project[];
  education: EducationItem[];
  music: {
    intro: RichText;
    records: MusicRecord[];
    cards: MusicCard[];
  };
}
