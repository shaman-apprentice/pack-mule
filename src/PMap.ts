import { IEntry } from './IEntry';

/**
 * **PMap** implements builtin [Map interface](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es2015.collection.d.ts).
 * PMap transforms a key into a string and stores the original key-value pair internally with the transformed key into a native Map.
 * 
 * Example usage:
 * ```ts
 * class Position {
 *   constructor(public x: int, public y: int) {}
 *   static toString(p: Posi) { return `${p.x}-${p.y}`; }
 * }
 * 
 * const map = new PMap<Position, string>(P.toString);
 * const myKey = new Position(1, 2);
 * map.set(myKey, 'here is a treasure hidden');
 * console.log(map.get(myKey)); // 'here is a treasure hidden'
 * console.log(map.get(new Position(1, 2))); // 'here is a treasure hidden'
 * ``` 
 * 
 * As `PMap` uses internally a native `Map`, sublinear average access is guaranteed ([ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-map-objects)) -
 * but it should be a safe guess, that all modern JS engines provide highly optimized `Map`s with *O(1)* average access.
 * 
 * @template K type of PMap's keys
 * @template V type of PMap's values
 */
export class PMap<K, V> implements Map<K, V> {
  private _transformKey: (key: K) => string;
  private _map: Map<string, IEntry<K, V>>;

  /**
   * @param transformKey its result is used as unique identifier for internal storage
   * @param entries optional list of initial entries
   */
  constructor(transformKey: (key: K) => string, entries?: [K, V][]) {
    this._transformKey = transformKey;
    this._map = new Map<string, IEntry<K, V>>();
    if (entries)
      this.setAll(...entries);
  }

  set(key: K, value: V): this {
    this._map.set(this._transformKey(key), {key, value});
    return this;
  }

  has(key: K): boolean {
    return this._map.has(this._transformKey(key));
  }

  get(key: K): V {
    return this._map.get(this._transformKey(key))?.value;
  }

  clear(): void {
    this._map = new Map<string, IEntry<K, V>>();
  }

  delete(key: K): boolean {
    return this._map.delete(this._transformKey(key));
  }

  forEach(callbackfn: (value: V, key: K, map: PMap<K, V>) => void, thisArg?: any): void {
    this._map.forEach(entry => callbackfn(entry.value, entry.key, this));
  }

  setAll(...entries: [K, V][]): this {
    entries.forEach(([key, value]) => this.set(key, value));
    return this;
  }

  deleteAll(...keys: K[]): boolean[] {
    return keys.map(key => this.delete(key));
  }

  /** I have no clue, why this is part of the Map interface, as [Symbol.iterator]() does exactly the same. */
  *entries(): IterableIterator<[K, V]> {
    yield* this[Symbol.iterator]();
  }

  *keys(): IterableIterator<K> {
    for (const [_, entry] of this._map)
      yield entry.key;
  }
  
  *values(): IterableIterator<V> {
    for (const [_, entry] of this._map)
      yield entry.value;
  }

  get [Symbol.toStringTag]() {
    return 'PMap';
  }

  get size() {
    return this._map.size;
  }

  *[Symbol.iterator](): IterableIterator<[K, V]> {
    for (const [_, entry] of this._map)
      yield [entry.key, entry.value];
  }

  /** Returns a shallow clone. */
  clone(): PMap<K, V> {
    return new PMap<K, V>(this._transformKey, [...this]);
  }
}
