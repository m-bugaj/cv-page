export interface SkillDef {
  label: string;
  /** Extra names accepted by the terminal `filter` command. */
  aliases?: string[];
  /** Rendered with the green "AI" accent from the mockup. */
  accent?: boolean;
}

/** Single source of skill ids and labels (labels are the same in every language). */
export const SKILLS = {
  java: { label: 'Java' },
  'spring-boot': { label: 'Spring Boot', aliases: ['spring', 'springboot', 'sb'] },
  'spring-cloud': { label: 'Spring Cloud' },
  microservices: { label: 'Microservices', aliases: ['mikroserwisy', 'ms'] },
  kafka: { label: 'Apache Kafka', aliases: ['kafka'] },
  rest: { label: 'REST', aliases: ['api'] },
  angular: { label: 'Angular', aliases: ['ng'] },
  typescript: { label: 'TypeScript', aliases: ['ts'] },
  tailwind: { label: 'Tailwind CSS', aliases: ['tailwind'] },
  postgresql: { label: 'PostgreSQL', aliases: ['postgres', 'psql', 'sql'] },
  mongo: { label: 'Mongo', aliases: ['mongodb'] },
  jpa: { label: 'Hibernate/JPA', aliases: ['hibernate', 'jpa'] },
  kubernetes: { label: 'Kubernetes', aliases: ['k8s'] },
  helm: { label: 'Helm' },
  docker: { label: 'Docker' },
  'gitlab-ci': { label: 'GitLab CI', aliases: ['gitlab'] },
  'github-actions': { label: 'GitHub Actions', aliases: ['gha', 'actions'] },
  jenkins: { label: 'Jenkins' },
  junit: { label: 'JUnit 5', aliases: ['junit'] },
  playwright: { label: 'Playwright' },
  sonarqube: { label: 'SonarQube', aliases: ['sonar'] },
  grafana: { label: 'Grafana' },
  kibana: { label: 'Kibana' },
  prometheus: { label: 'Prometheus' },
  'claude-code': { label: 'Claude Code', aliases: ['claude'], accent: true },
  mcp: { label: 'MCP', accent: true },
  'ai-dev': { label: 'AI-assisted dev', aliases: ['ai'], accent: true },
  csharp: { label: 'C#', aliases: ['c#', 'csharp', 'cs'] },
  dotnet: { label: '.Net', aliases: ['.net', 'dotnet', 'asp.net'] },
  python: { label: 'Python', aliases: ['py'] },
  tensorflow: { label: 'TensorFlow', aliases: ['tf'] },
} satisfies Record<string, SkillDef>;

export type SkillId = keyof typeof SKILLS;

export function skillLabel(id: string): string {
  return (SKILLS as Record<string, SkillDef>)[id]?.label ?? id;
}

export function isAccentSkill(id: string): boolean {
  return (SKILLS as Record<string, SkillDef>)[id]?.accent === true;
}

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

/** Finds a skill id by id, label or alias (case-insensitive). */
export function findSkill(query: string): SkillId | null {
  const q = normalize(query);
  if (!q) return null;
  for (const [id, def] of Object.entries(SKILLS) as [SkillId, SkillDef][]) {
    if (id === q || normalize(def.label) === q || def.aliases?.some((a) => normalize(a) === q)) {
      return id;
    }
  }
  return null;
}
