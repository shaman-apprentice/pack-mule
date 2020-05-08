import { PMap } from "./index";

describe('get', () => {
  it('returns `undefined` if it has not the key', () => {
    const m = new PMap();
    expect(m.get({})).toBe(undefined);
  });

  it('returns `undefined` if it has not the key, but `undefined` as key', () => {
    const m = new PMap();
    m.set(undefined, 'yolo');
    expect(m.get({})).toBe(undefined);
  });

  it('can distinguish the keys `1` and "1"', () => {
    const m = new PMap();
    m.set(1, 'number');
    m.set('1', 'string');
    expect(m.get(1)).toBe('number');
    expect(m.get('1')).toBe('string');
  });
});

describe('iterator', () => {
  const m = new PMap();
  const k1 = {};
  const k2 = {};
  const k3 = {};
  m.set(k1, 'value-1');
  m.set(k2, 'value-2');
  m.set(k3, 'value-3');

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

  it('can handle `.values()` with number as key', () => {
    const m = new PMap<number, string>([{ key: 1, value: 'one'}]);
    expect(m.values()).toEqual(['one']);
  });

  it('can handle `.keys()` with number as key', () => {
    const m = new PMap<number, string>([{ key: 1, value: 'one'}]);
    expect(m.keys()).toEqual([1]);
  });
});

describe('constructor', () => {
  it('sets all entries', () => {
    const k1 = {};
    const k2 = {};
    const m = new PMap([{key: k1, value: 1}, {key: k2, value: 2}]);

    expect(m.size).toBe(2);
    expect(m.get(k1)).toBe(1);
    expect(m.get(k2)).toBe(2);
  });
});

describe('clone', () => {
  it('has the same entries', () => {
    const k = {};
    const m1 = new PMap([{key: k, value: 'v1'}]);
    const m2 = m1.clone();

    expect(m1.size).toBe(1);
    expect(m1.get(k)).toBe('v1');

    expect(m2.size).toBe(1);
    expect(m2.get(k)).toBe('v1');
  });

  it('keeps the entry in the original PMap, when deleting a key from the clone', () => {
    const k = {};
    const m1 = new PMap([{key: k, value: 1}]);
    const m2 = m1.clone();

    const m3 = new PMap<number, object>();

    m2.remove(k);
    expect(m2.has(k)).toBe(false);
    expect(m1.has(k)).toBe(true);
  });
});
