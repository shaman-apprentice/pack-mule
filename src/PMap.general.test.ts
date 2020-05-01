import { PMap, Unset } from ".";

describe('get', () => {
  it('returns `Unset` if it does not has the key', () => {
    const m = new PMap();
    expect(m.get({})).toBe(Unset);
  });
});

describe('iterator', () => {
  const m = new PMap();
  const k1 = {};
  const k2 = {};
  const k3 = {};
  m.add(k1, 'value-1');
  m.add(k2, 'value-2');
  m.add(k3, 'value-3');

  it('works with "for of"-loop', () => {  
    const doSomething = jest.fn();
  
    for (let {key, value} of m)
      doSomething(key, value);
  
    expect(doSomething).toHaveBeenCalledTimes(3);
    expect(doSomething).toHaveBeenCalledWith(k1, 'value-1');
    expect(doSomething).toHaveBeenCalledWith(k2, 'value-2');
    expect(doSomething).toHaveBeenCalledWith(k3, 'value-3');
  });

  it('works with `Array.from`', () => {
    const mapped = Array.from(m).map(entry => entry.value);
    expect(mapped.length).toBe(3);
    expect(mapped).toContain('value-1');
    expect(mapped).toContain('value-2');
    expect(mapped).toContain('value-3');
  });
});

describe('constructor', () => {
  it('add all entries', () => {
    const k1 = {};
    const k2 = {};
    const m = new PMap([{key: k1, value: 1}, {key: k2, value: 2}]);

    expect(m.size).toBe(2);
    expect(m.get(k1)).toBe(1);
    expect(m.get(k2)).toBe(2);
  });
});
