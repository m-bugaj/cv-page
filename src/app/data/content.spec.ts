import { CV_EN } from './cv.en';
import { CV_PL } from './cv.pl';
import { CvContent } from './cv.model';
import { SKILLS, findSkill } from './skills';

const allSkillIds = (cv: CvContent) => [
  ...cv.skillGroups.flatMap((g) => g.skills),
  ...cv.academicSkills,
  ...cv.experience.flatMap((e) => e.bullets.flatMap((b) => b.skills)),
  ...cv.projects.flatMap((p) => p.bullets.flatMap((b) => b.skills)),
];

describe('CV content', () => {
  it.each([
    ['en', CV_EN],
    ['pl', CV_PL],
  ])('%s: every skill id exists in SKILLS', (_, cv) => {
    const unknown = allSkillIds(cv).filter((id) => !(id in SKILLS));
    expect(unknown).toEqual([]);
  });

  it('PL mirrors the EN structure', () => {
    const shape = (cv: CvContent) => ({
      about: cv.about.length,
      stats: cv.stats.map((s) => s.value),
      experience: cv.experience.map((e) => e.bullets.map((b) => b.skills)),
      projects: cv.projects.map((p) => [p.url, p.bullets.map((b) => b.skills)]),
      certificates: cv.certificates.length,
      education: cv.education.map((e) => e.degrees.length),
      music: cv.music.cards.map((c) => c.linkKey),
    });
    expect(shape(CV_PL)).toEqual(shape(CV_EN));
  });

  it('finds skills by id, label and alias', () => {
    expect(findSkill('Spring Boot')).toBe('spring-boot');
    expect(findSkill('K8S')).toBe('kubernetes');
    expect(findSkill('c#')).toBe('csharp');
    expect(findSkill('cobol')).toBeNull();
  });
});
