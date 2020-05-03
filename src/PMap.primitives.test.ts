import { PMap } from "./index";

describe('primitives', () => {
  it('can use numbers to set entries', () => {
    const m = new PMap<number, string>();
    m.set(1, 'oe');
    m.set(1, 'one');
    m.set(2, 'two');

    expect(m.size).toBe(2);
    expect(m.get(1)).toBe('one');
    expect(m.get(2)).toBe('two');
  });

  it('can use symbols to set entries', () => {
    const m = new PMap<symbol, string>();
    const s1 = Symbol();
    const s2 = Symbol();
    m.set(s1, 'oe');
    m.set(s1, 'one');
    m.set(s2, 'two');

    expect(m.size).toBe(2);
    expect(m.get(s1)).toBe('one');
    expect(m.get(s2)).toBe('two');
  });

  it('can use strings to set entries', () => {
    const m = new PMap<string, string>();
    m.set('1', 'oe');
    m.set('1', 'one');
    m.set('2', 'two');

    expect(m.size).toBe(2);
    expect(m.get('1')).toBe('one');
    expect(m.get('2')).toBe('two');
  });
});

