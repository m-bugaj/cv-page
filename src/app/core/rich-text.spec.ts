import { parseRich, richToPlain } from './rich-text';

describe('parseRich', () => {
  it('splits bold, links and tones', () => {
    expect(parseRich('A **b** [c](https://x.dev) {gold:3× gold}.')).toEqual([
      { kind: 'text', text: 'A ' },
      { kind: 'strong', text: 'b' },
      { kind: 'text', text: ' ' },
      { kind: 'link', text: 'c', href: 'https://x.dev' },
      { kind: 'text', text: ' ' },
      { kind: 'tone', text: '3× gold', tone: 'gold' },
      { kind: 'text', text: '.' },
    ]);
  });

  it('only turns http(s) URLs into links', () => {
    expect(parseRich('[x](javascript:alert(1))')).toEqual([
      { kind: 'text', text: '[x](javascript:alert(1))' },
    ]);
  });

  it('returns plain text without markup', () => {
    expect(richToPlain('I have **2×** {platinum:platinum}')).toBe('I have 2× platinum');
  });
});
