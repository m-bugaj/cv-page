import { CvContent } from './cv.model';

const SKILL_GROUPS = [
  { label: 'backend', skills: ['java', 'spring-boot', 'spring-cloud', 'microservices', 'kafka', 'rest'] },
  { label: 'frontend', skills: ['angular', 'typescript', 'tailwind'] },
  { label: 'data', skills: ['postgresql', 'mongo', 'jpa'] },
  { label: 'devops', skills: ['kubernetes', 'helm', 'docker', 'gitlab-ci', 'github-actions', 'jenkins'] },
  { label: 'quality', skills: ['junit', 'playwright', 'sonarqube'] },
  { label: 'observability', skills: ['grafana', 'kibana', 'prometheus'] },
  { label: 'ai', skills: ['claude-code', 'mcp', 'ai-dev'] },
];

export const CV_EN: CvContent = {
  name: 'Michał Bugaj',
  role: 'Java Software Developer',
  tagline: 'Backend · DevOps · Angular',
  about: [
    "Java Software Developer at Comarch with a Master's in Computer Science. I build microservices end to end: from Spring Boot code, Kafka, PostgreSQL to Kubernetes, Helm and GitLab CI. Recently led my team's Kubernetes migration and the Java 25 / Spring Boot 4 upgrade.",
    'After hours I develop **Beatsy**, a full-stack Java + Angular marketplace. Outside IT, I run an online music business and YouTube channel and have earned {platinum:2× platinum} and {gold:3× gold} records in music production.',
  ],
  stats: [
    { value: 2.5, decimals: 1, label: 'years at Comarch' },
    { value: 21, label: 'microservices in TNA' },
    { value: 1900, suffix: '+', label: 'commits (27% of the team)' },
    { value: 150, suffix: '+', label: 'merge requests' },
    { value: 24, label: 'Helm charts in the K8s migration' },
  ],
  skillGroups: SKILL_GROUPS,
  academicSkills: ['csharp', 'dotnet', 'python', 'tensorflow'],
  languages: ['English at the **C1 level**', 'Polish – **native**'],
  certificates: [
    { date: 'Oct 2026', issuer: 'Comarch', name: 'Kubernetes', detail: '(Intermediate)' },
    { date: 'Jun 2026', issuer: 'Comarch', name: 'AI Academy', detail: '(Level 0 & 1)' },
    {
      date: 'Oct 2025',
      issuer: 'Comarch',
      name: 'Microservices Architecture',
      detail: '(Spring & Docker)',
    },
  ],
  experience: [
    {
      role: 'Java Software Developer',
      company: 'COMARCH',
      companyUrl: 'https://www.comarch.pl',
      period: '07.2024 → Present · 2.5 years',
      bullets: [
        {
          text: 'Developing [TNA](https://tna.comarch.com), a SaaS work-time management platform of **21 microservices** (Java, Spring Boot, PostgreSQL, MongoDB, Kafka); **1,900+ commits** (27% of the team) and **150+ merge requests**.',
          skills: ['java', 'spring-boot', 'microservices', 'postgresql', 'mongo', 'kafka', 'rest', 'jpa'],
        },
        {
          text: 'Led the migration of the whole platform from **Docker to Kubernetes**: 24 Helm charts, a new test environment and a zero-downtime production cutover.',
          skills: ['kubernetes', 'helm', 'docker', 'microservices'],
        },
        {
          text: 'Migrated CI/CD for 19 services from **Jenkins to GitLab CI**, integrating Docker builds, SonarQube, JaCoCo and SBOM scanning.',
          skills: ['gitlab-ci', 'jenkins', 'docker', 'sonarqube', 'junit'],
        },
        {
          text: 'Upgrading 14 services from Java 8 / SB 2 to **Java 25 / Spring Boot 4**.',
          skills: ['java', 'spring-boot', 'microservices'],
        },
        {
          text: 'Delivered two-way sync settings with **Comarch ERP Optima** (Java + C#) and remote-work management and overtime requests.',
          skills: ['java', 'csharp', 'rest'],
        },
        {
          text: 'Resolved production incidents, handled **90 service requests** and built log tooling on Kibana with a custom **MCP server**.',
          skills: ['kibana', 'grafana', 'prometheus', 'mcp'],
        },
        {
          text: "Set up the team's **AI-assisted workflow** (Claude Code skills, agents, Playwright regression checks) and onboarded a new developer.",
          skills: ['claude-code', 'ai-dev', 'playwright', 'mcp'],
        },
        {
          text: "Lead developer of **Janus**, Comarch's new SSO, developing a cross-product SDK and legacy adapters, and driving product migrations.",
          skills: ['java', 'spring-boot'],
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Beatsy',
      subtitle: 'Marketplace for Music Producers',
      url: 'https://github.com/m-bugaj/beatsy-preview',
      period: '02.2025 → Present',
      bullets: [
        {
          text: '**Full-stack platform** where producers sell beats and sound kits under configurable licences; developed continuously (480+ commits).',
          skills: ['java', 'angular', 'spring-boot'],
        },
        {
          text: '**Backend:** 9 Spring Boot microservices (Java 23) behind Spring Cloud Gateway with JWT auth and refresh-token rotation; PostgreSQL per service with Flyway; order-to-payment flow over Kafka.',
          skills: ['java', 'spring-boot', 'spring-cloud', 'microservices', 'postgresql', 'kafka', 'rest', 'jpa'],
        },
        {
          text: '**Frontend:** Angular 22 (SSR), Tailwind CSS, token-based theming, i18n and Web Audio API player with tempo/key shifting.',
          skills: ['angular', 'typescript', 'tailwind'],
        },
        {
          text: '**Quality & CI/CD:** GitHub Actions, Vitest, Playwright (E2E, accessibility, visual tests), bundle-size budgets and Docker (GHCR).',
          skills: ['github-actions', 'playwright', 'docker'],
        },
      ],
    },
    {
      name: 'AutoRent',
      subtitle: 'Car Rental Platform',
      url: 'https://github.com/m-bugaj/Car-Rental-Hub',
      period: '01.2024 · 2 months',
      bullets: [
        {
          text: "ASP.NET Core web app where users list their cars for rent and book other users' cars.",
          skills: ['csharp', 'dotnet'],
        },
        {
          text: 'Built with C#, ASP.NET Core, JavaScript, HTML, CSS, SQL Server, Entity Framework, Bootstrap and Google Cloud API.',
          skills: ['csharp', 'dotnet'],
        },
      ],
    },
  ],
  education: [
    {
      school: 'Politechnika Śląska',
      period: '2019 → 2024 · 5 years',
      degrees: [
        "Computer Science – **Master's** studies (1.5 years)",
        'Automation and Robotics – **Engineering** studies (3.5 years)',
      ],
      notes: [
        'Silesian University of Technology in Gliwice',
        'Faculty of Automatic Control, Electronics and Computer Science',
      ],
    },
  ],
  music: {
    intro:
      'Before and alongside code, there is music. I produce beats, run an online music business and a YouTube channel — and my productions have earned {platinum:2× platinum} and {gold:3× gold} records.',
    records: [
      { count: '2×', label: 'Platinum records', tone: 'platinum' },
      { count: '3×', label: 'Gold records', tone: 'gold' },
    ],
    cards: [
      {
        title: 'Music production',
        text: 'Beats and instrumentals for artists — the work behind the platinum and gold certifications.',
      },
      {
        title: 'Online music business',
        text: 'Selling beats and licences online: the day-to-day of a small business, from marketing to customer support.',
        linkKey: 'musicBusiness',
      },
      {
        title: 'YouTube channel',
        text: 'Publishing beats and production content for a community of artists and producers.',
        linkKey: 'youtube',
      },
      {
        title: 'Where music meets code',
        text: 'That experience became **Beatsy** — a marketplace I build so producers can sell beats and sound kits.',
        linkKey: 'beatsy',
      },
    ],
  },
};
