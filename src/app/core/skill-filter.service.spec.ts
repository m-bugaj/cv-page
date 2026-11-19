import { TestBed } from '@angular/core/testing';
import { CV_EN } from '../data/cv.en';
import { SkillFilterService, countSkillMatches } from './skill-filter.service';

describe('SkillFilterService', () => {
  it('toggles a skill on and off', () => {
    const filter = TestBed.inject(SkillFilterService);
    filter.toggle('kafka');
    expect(filter.active()).toBe('kafka');
    filter.toggle('kafka');
    expect(filter.active()).toBeNull();
  });

  it('marks matching items and dims the rest only while a filter is active', () => {
    const filter = TestBed.inject(SkillFilterService);
    expect(filter.state(['java'])).toEqual({ match: false, dimmed: false });
    filter.set('java');
    expect(filter.state(['java', 'kafka'])).toEqual({ match: true, dimmed: false });
    expect(filter.state(['helm'])).toEqual({ match: false, dimmed: true });
  });

  it('counts matches in experience bullets and projects', () => {
    expect(countSkillMatches(CV_EN, 'kafka')).toEqual({ experience: 1, projects: 1 });
    expect(countSkillMatches(CV_EN, 'csharp')).toEqual({ experience: 1, projects: 1 });
  });
});
