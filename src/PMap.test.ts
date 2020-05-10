import { SymbolPMap } from './SymbolPMap/SymbolPMap';
import { PMap } from './PMap';
import { PrimitivePMap } from './PrimitivePMap/PrimitivePMap';

describe('`clone()`', () => {
  it('derives the correct Child-Class type when cloning', () => {
    const map = new SymbolPMap<object, number>();
    const clone: SymbolPMap<object, number> = map.clone();
    expect(clone).toBeInstanceOf(SymbolPMap);
  
    // todo: check for real negative testing
    // The following two is correctly not allowed
    // const clone2: SymbolPMap<Function, number> = map.clone();
    // const clone3: PMap<object, string> = map.clone();
  });

  it('can assign a clone to its base class', () => {
    const map = new SymbolPMap<object, number>();
    const clone: PMap<object, number> = map.clone();
    expect(clone).toBeInstanceOf(PMap);
  });

  it('does a shallow clone', () => {
    const origin = new SymbolPMap<object, string>();
    const k = {};
    const v = 'some v'
    origin.set(k, v);
    const clone = origin.clone();

    expect(clone.size).toBe(1);
    expect(clone.get(k)).toBe(v);

    clone.set({}, 'another value');
    expect(clone.size).toBe(2);
    expect(origin.size).toBe(1);

    clone.set(k, 'not v');
    expect(clone.get(k)).toBe('not v');
    expect(origin.get(k)).toBe(v);

    origin.remove(k);
    expect(clone.has(k)).toBe(true);
  });
});

describe('utility functions of PMap', () => {
  it('calculates `.keys()` correctly', () => {
    const map = new PrimitivePMap();
    map.set(1, '1');
    map.set(2, '2');
    const keys = map.keys();
    
    expect(keys.length).toBe(2);
    expect(keys).toContain(1);
    expect(keys).toContain(2);
  });

  it('calculates `.values()` correctly', () => {
    const map = new PrimitivePMap();
    map.set(1, '1');
    map.set(2, '2');
    const values = map.values();
    
    expect(values.length).toBe(2);
    expect(values).toContain('1');
    expect(values).toContain('2');
  });

  it('can remove all entries', () => {
    const map = new PrimitivePMap();
    map.set(1, '1');
    map.set(2, '2');

    map.removeAll(1, 2);
    expect(map.size).toBe(0);
  });

  it('can set all entries', () => {
    const map = new PrimitivePMap();
    map.setAll({key: 1, value: '1'}, {key: 2, value: '2'});

    expect(map.size).toBe(2);
    expect(map.get(1)).toBe('1');
    expect(map.get(2)).toBe('2');
  });
});

describe('union', () => {
  it('sets all entries', () => {
    const m1 = new PrimitivePMap();
    m1.set(1, '1');
    const m2 = new PrimitivePMap();
    m2.set(2, '2');
    
    const m3 = m1.union(m2);
    expect(m3.size).toBe(2);
    expect(m3.get(1)).toBe('1');
    expect(m3.get(2)).toBe('2');
  });

  it('handles default `mergeF` correctly', () => {
    const m1 = new PrimitivePMap([{key: 1, value: 'm1-1'}]);
    const m2 = new PrimitivePMap([{key: 1, value: 'm2-1'}]);

    const m3 = m1.union(m2);
    expect(m3.size).toBe(1);
    expect(m3.get(1)).toBe('m1-1');
  });

  it('uses given `mergeF`', () => {
    const m1 = new PrimitivePMap([{key: 1, value: 'm1-1'}]);
    const m2 = new PrimitivePMap([{key: 1, value: 'm2-1'}]);
    const mergeF = jest.fn((key, v1, v2) => '(m2+m1)-1');

    const m3 = m1.union(m2, mergeF);
    expect(m3.size).toBe(1);
    expect(mergeF).toHaveBeenCalledTimes(1);
    expect(mergeF).toHaveBeenCalledWith(1, 'm1-1', 'm2-1');
    expect(m3.get(1)).toBe('(m2+m1)-1');
  });
});

describe('intersectionKeys', () => {
  it('intersectionKeys works', () => {
    const m1 = new PrimitivePMap<number, number>([{key: 1, value: 1}, {key: 2, value: 2}]);
    const m2 = new PrimitivePMap<number, number>([{key: 1, value: 1}, {key: 3, value: 3}]);
  
    expect(m1.intersectionKeys(m2)).toEqual([1]);
  });
});

describe('difference', () => {
  it('difference works', () => {
    const m1 = new PrimitivePMap<number, number>([{key: 1, value: 1}, {key: 2, value: 2}]);
    const m2 = new PrimitivePMap<number, number>([{key: 1, value: 1}, {key: 3, value: 3}]);
  
    const difference = m1.difference(m2);
    expect(difference.toList()).toEqual([{key: 2, value: 2}]);
  });
});
