import { PMap, Unset } from "./PMap";

describe('get', () => {
  it('returns `Unset` if it does not has the key', () => {
    const m = new PMap();
    expect(m.get({})).toBe(Unset);
  });
});

describe('iterator', () => {
  it('works with "for of"-loop', () => {
    const m = new PMap();
    const k1 = {};
    const k2 = {};
    const k3 = {};
    m.add(k1, 'value-1');
    m.add(k2, 'value-2');
    m.add(k3, 'value-3');
  
    const doSomething = jest.fn();
  
    for (let [key, value] of m)
      doSomething(key, value);
  
    expect(doSomething).toHaveBeenCalledTimes(3);
    expect(doSomething).toHaveBeenCalledWith(k1, 'value-1');
    expect(doSomething).toHaveBeenCalledWith(k2, 'value-2');
    expect(doSomething).toHaveBeenCalledWith(k3, 'value-3');
  });
});
