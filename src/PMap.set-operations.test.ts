import { PMap } from "./index";

describe('union', () => {
  it('sets all entries', () => {
    const m1 = new PMap();
    m1.set({}, 1);
    const m2 = new PMap();
    m2.set({}, 2);
    
    const m3 = m1.union(m2);
    expect(m3.size).toBe(2);
  });

  it('handles default `mergeF` correctly', () => {
    const commonKey = {};
    const m1 = new PMap([{key: commonKey, value: 'm1-1'}]);
    const m2 = new PMap([{key: commonKey, value: 'm2-1'}]);

    const m3 = m1.union(m2);
    expect(m3.size).toBe(1);
    expect(m3.get(commonKey)).toBe('m1-1');
  });

  it('uses given `mergeF`', () => {
    const commonKey = {};
    const m1 = new PMap([{key: commonKey, value: 'm1-1'}]);
    const m2 = new PMap([{key: commonKey, value: 'm2-1'}]);
    const mergeF = jest.fn((key, v1, v2) => 'm2+m1-1');

    const m3 = m1.union(m2, mergeF);
    expect(m3.size).toBe(1);
    expect(mergeF).toHaveBeenCalledTimes(1);
    expect(mergeF).toHaveBeenCalledWith(commonKey, 'm1-1', 'm2-1');
    expect(m3.get(commonKey)).toBe('m2+m1-1');
  });
});

describe('intersectionKeys', () => {
  it('intersectionKeys works', () => {
    const commonKey = {};
    const m1 = new PMap([{key: commonKey, value: 1}, {key: {}, value: 2}]);
    const m2 = new PMap([{key: commonKey, value: 1}, {key: {}, value: 3}]);
  
    expect(m1.intersectionKeys(m2)).toEqual([commonKey]);
  });
});

describe('difference', () => {
  it('difference works', () => {
    const commonKey = {};
    const m1UniqueKey = {};
    const m1 = new PMap([{key: commonKey, value: 1}, {key: m1UniqueKey, value: 2}]);
    const m2 = new PMap([{key: commonKey, value: 1}, {key: {}, value: 3}]);
  
    const difference = m1.difference(m2);
    expect(difference.toList()).toEqual([{key: m1UniqueKey, value: 2}]);
  });
});
