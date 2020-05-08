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

  it('has the key, when the key is a number', () => {
    const m = new PMap([{ key: 1, value: 1}]);
    expect(m.has(1)).toBe(true);
  });
});

describe('handling of undefined and null', () => {
  it('distinguishes the keys `undefined` and `"undefined"`', () => {
    const m = new PMap();
    m.set(undefined, 1);
    m.set('undefined', 2);

    expect(m.get(undefined)).toBe(1);
    expect(m.get('undefined')).toBe(2);
  });

  it('distinguishes the keys `null` and `"null"`', () => {
    const m = new PMap();
    m.set(null, 1);
    m.set('null', 2);

    expect(m.get(null)).toBe(1);
    expect(m.get('null')).toBe(2);
  });
});
