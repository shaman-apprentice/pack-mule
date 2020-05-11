import { KrakenPMap } from './KrakenPMap';
import { HashPMap } from '../HashPMap/HashPMap';
import { IHashable } from '../HashPMap/IHashable';

describe('primitive keys', () => {
  it('has the primitive key after setting it', () => {
    const map = new KrakenPMap();
    map.set('k', 1);
    expect(map.has('k')).toBe(true);
  });

  it('gets the value after storing it with a primitive key', () => {
    const map = new KrakenPMap();
    map.set('k', 1);
    expect(map.get('k')).toBe(1);
  });

  it('removes the primitive key-value pair', () => {
    const map = new KrakenPMap();
    map.set('k', 1);
    map.remove('k');
    expect(map.has('k')).toBe(false);
    expect(map.get('k')).toBe(undefined);
  });
});

describe('object keys', () => {
  it('has the key after setting it', () => {
    const map = new KrakenPMap();
    const k = {};
    map.set(k, 1);
    expect(map.has(k)).toBe(true);
  });
  
  it('gets the value after setting it', () => {
    const map = new KrakenPMap();
    const k = {};
    map.set(k, 1);
    expect(map.get(k)).toBe(1);
  });
  
  it('removes the key-value pair', () => {
    const map = new KrakenPMap();
    const k = {};
    map.set(k, 1);
    map.remove(k);
    expect(map.has(k)).toBe(false);
    expect(map.get(k)).toBe(undefined);
  });
});

describe('primitive and object keys', () => {
  it('can deal with primitive and object keys', () => {
    const map = new KrakenPMap();
    const objectK = {};
    map.set(1, 'one');
    map.set(objectK, 'two');

    expect(map.size).toBe(2);
    expect(map.get(1)).toBe('one');
    expect(map.get(objectK)).toBe('two');
  });

  it('can customize `OtherStorage` for e.g. to force key collision with string-keys and hashable objects', () => {
    class MyHashable implements IHashable {
      constructor(public s: string) {}
      hash() { return this.s; }
    }

    const map = new KrakenPMap<string | IHashable, string>(undefined, HashPMap, () => true);
    map.set('s', 'string value');
    map.set(n)

  });
});
