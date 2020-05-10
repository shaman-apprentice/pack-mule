import { SymbolPMap } from './SymbolPMap/SymbolPMap';
import { PMap } from './PMap';

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

// todo values, keys
