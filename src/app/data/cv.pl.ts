import { CvContent } from './cv.model';
import { CV_EN } from './cv.en';

/** Polish translation. Skill ids, links and numbers are shared with the English version. */
export const CV_PL: CvContent = {
  name: 'Michał Bugaj',
  role: 'Java Software Developer',
  tagline: 'Backend · DevOps · Angular',
  about: [
    'Java Software Developer w Comarchu, magister informatyki. Buduję mikroserwisy od początku do końca: od kodu w Spring Boot, Kafki i PostgreSQL po Kubernetesa, Helma i GitLab CI. Ostatnio prowadziłem migrację platformy zespołu na Kubernetesa oraz aktualizację do Java 25 / Spring Boot 4.',
    'Po godzinach rozwijam **Beatsy** — marketplace full-stack w Javie i Angularze. Poza IT prowadzę internetowy biznes muzyczny i kanał na YouTube, a moje produkcje zdobyły {platinum:2× platynę} i {gold:3× złoto}.',
  ],
  stats: [
    { value: 2.5, decimals: 1, label: 'roku w Comarchu' },
    { value: 21, label: 'mikroserwisów w TNA' },
    { value: 1900, suffix: '+', label: 'commitów (27% zespołu)' },
    { value: 150, suffix: '+', label: 'merge requestów' },
    { value: 24, label: 'charty Helm w migracji na K8s' },
  ],
  skillGroups: CV_EN.skillGroups,
  academicSkills: CV_EN.academicSkills,
  languages: ['Angielski na poziomie **C1**', 'Polski – **ojczysty**'],
  certificates: [
    { date: 'paź 2026', issuer: 'Comarch', name: 'Kubernetes', detail: '(Intermediate)' },
    { date: 'cze 2026', issuer: 'Comarch', name: 'AI Academy', detail: '(Level 0 i 1)' },
    {
      date: 'paź 2025',
      issuer: 'Comarch',
      name: 'Microservices Architecture',
      detail: '(Spring i Docker)',
    },
  ],
  experience: [
    {
      role: 'Java Software Developer',
      company: 'COMARCH',
      companyUrl: 'https://www.comarch.pl',
      period: '07.2024 → obecnie · 2,5 roku',
      bullets: [
        {
          text: 'Rozwijam [TNA](https://tna.comarch.com) — platformę SaaS do zarządzania czasem pracy złożoną z **21 mikroserwisów** (Java, Spring Boot, PostgreSQL, MongoDB, Kafka); **1900+ commitów** (27% zespołu) i **150+ merge requestów**.',
          skills: CV_EN.experience[0].bullets[0].skills,
        },
        {
          text: 'Prowadziłem migrację całej platformy z **Dockera na Kubernetesa**: 24 charty Helm, nowe środowisko testowe i przełączenie produkcji bez przestoju.',
          skills: CV_EN.experience[0].bullets[1].skills,
        },
        {
          text: 'Przeniosłem CI/CD 19 serwisów z **Jenkinsa do GitLab CI**, integrując buildy Dockera, SonarQube, JaCoCo i skanowanie SBOM.',
          skills: CV_EN.experience[0].bullets[2].skills,
        },
        {
          text: 'Aktualizuję 14 serwisów z Java 8 / SB 2 do **Java 25 / Spring Boot 4**.',
          skills: CV_EN.experience[0].bullets[3].skills,
        },
        {
          text: 'Dostarczyłem dwukierunkową synchronizację ustawień z **Comarch ERP Optima** (Java + C#) oraz obsługę pracy zdalnej i wniosków o nadgodziny.',
          skills: CV_EN.experience[0].bullets[4].skills,
        },
        {
          text: 'Rozwiązywałem incydenty produkcyjne, obsłużyłem **90 zgłoszeń serwisowych** i zbudowałem narzędzia do analizy logów w Kibanie z własnym **serwerem MCP**.',
          skills: CV_EN.experience[0].bullets[5].skills,
        },
        {
          text: 'Zorganizowałem w zespole **pracę wspieraną przez AI** (skille i agenci Claude Code, testy regresji w Playwright) i wdrożyłem nowego programistę.',
          skills: CV_EN.experience[0].bullets[6].skills,
        },
        {
          text: 'Główny developer **Janusa** — nowego SSO Comarchu: rozwijam SDK dla wielu produktów i adaptery dla starszych systemów oraz prowadzę migracje produktów.',
          skills: CV_EN.experience[0].bullets[7].skills,
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Beatsy',
      subtitle: 'Marketplace dla producentów muzycznych',
      url: CV_EN.projects[0].url,
      period: '02.2025 → obecnie',
      bullets: [
        {
          text: '**Platforma full-stack**, na której producenci sprzedają bity i sound kity na konfigurowalnych licencjach; rozwijana na bieżąco (480+ commitów).',
          skills: CV_EN.projects[0].bullets[0].skills,
        },
        {
          text: '**Backend:** 9 mikroserwisów Spring Boot (Java 23) za Spring Cloud Gateway z autoryzacją JWT i rotacją refresh tokenów; osobna baza PostgreSQL na serwis z Flyway; przepływ zamówienie → płatność przez Kafkę.',
          skills: CV_EN.projects[0].bullets[1].skills,
        },
        {
          text: '**Frontend:** Angular 22 (SSR), Tailwind CSS, motywy oparte na tokenach, i18n i odtwarzacz Web Audio API ze zmianą tempa i tonacji.',
          skills: CV_EN.projects[0].bullets[2].skills,
        },
        {
          text: '**Jakość i CI/CD:** GitHub Actions, Vitest, Playwright (E2E, dostępność, testy wizualne), budżety rozmiaru paczek i Docker (GHCR).',
          skills: CV_EN.projects[0].bullets[3].skills,
        },
      ],
    },
    {
      name: 'AutoRent',
      subtitle: 'Platforma wynajmu samochodów',
      url: CV_EN.projects[1].url,
      period: '01.2024 · 2 miesiące',
      bullets: [
        {
          text: 'Aplikacja webowa w ASP.NET Core, w której użytkownicy wystawiają swoje auta do wynajęcia i rezerwują auta innych.',
          skills: CV_EN.projects[1].bullets[0].skills,
        },
        {
          text: 'Zbudowana w C#, ASP.NET Core, JavaScript, HTML, CSS, SQL Server, Entity Framework, Bootstrap i Google Cloud API.',
          skills: CV_EN.projects[1].bullets[1].skills,
        },
      ],
    },
  ],
  education: [
    {
      school: 'Politechnika Śląska',
      period: '2019 → 2024 · 5 lat',
      degrees: [
        'Informatyka – studia **magisterskie** (1,5 roku)',
        'Automatyka i Robotyka – studia **inżynierskie** (3,5 roku)',
      ],
      notes: ['Politechnika Śląska w Gliwicach', 'Wydział Automatyki, Elektroniki i Informatyki'],
    },
  ],
  music: {
    intro:
      'Obok kodu jest muzyka. Produkuję bity, prowadzę internetowy biznes muzyczny i kanał na YouTube — a moje produkcje zdobyły {platinum:2× platynę} i {gold:3× złoto}.',
    records: [
      { count: '2×', label: 'Platynowe płyty', tone: 'platinum' },
      { count: '3×', label: 'Złote płyty', tone: 'gold' },
    ],
    cards: [
      {
        title: 'Produkcja muzyczna',
        text: 'Bity i podkłady dla artystów — praca, która stoi za platynowymi i złotymi certyfikatami.',
      },
      {
        title: 'Biznes muzyczny online',
        text: 'Sprzedaż bitów i licencji w internecie: codzienność małej firmy, od marketingu po obsługę klientów.',
        linkKey: 'musicBusiness',
      },
      {
        title: 'Kanał YouTube',
        text: 'Publikuję bity i materiały o produkcji dla społeczności artystów i producentów.',
        linkKey: 'youtube',
      },
      {
        title: 'Gdzie muzyka spotyka kod',
        text: 'To doświadczenie zamieniło się w **Beatsy** — marketplace, który buduję, żeby producenci mogli sprzedawać bity i sound kity.',
        linkKey: 'beatsy',
      },
    ],
  },
};
