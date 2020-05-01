/**
 * A class providing some Map functionality, which depends an objects as its keys
 */
export class PMap<K extends Object, V> implements Iterable<Entry<K, V>> {
  private storageKey = Symbol();
  private storage = {};
  private _size = 0;

  constructor(entries?: Entry<K, V>[]) {
    if (entries)
      this.addAll(...entries);
  }

  public get size(): number {
    return this._size
  }

  public add(key: K, value: V): V | typeof Unset {
    const existingRef = key[this.storageKey] as symbol;

    if (existingRef) { // update existing key
      const oldV: V = this.storage[existingRef].value;
      this.storage[existingRef].value = value;
      return oldV;
    }

    const ref = Symbol();
    key[this.storageKey] = ref;
    this.storage[ref] = { key, value };

    this._size++;

    return Unset;
  }

  public addAll(...entries: Entry<K, V>[]): (V | typeof Unset)[] {
    return entries.map(e => this.add(e.key, e.value));
  }

  public has(key: K): boolean {
    return Object.getOwnPropertySymbols(this.storage).includes(key[this.storageKey]);
  }

  public get(key: K): V | typeof Unset {
    if (!this.has(key))
      return Unset;

    const ref = key[this.storageKey];
    return this.storage[ref].value;
  } 

  public remove(key: K): V | typeof Unset {
    if (!this.has(key))
      return Unset;

    const ref = key[this.storageKey];
    const oldV = this.storage[ref].value;

    delete key[this.storageKey];
    delete this.storage[ref];
    this._size--;

    return oldV;
  }

  public removeAll(...keys: K[]): (V | typeof Unset)[] {
    return keys.map(k => this.remove(k));
  }

  public keys(): K[] {
    return this.toList().map(e => e.key)
  }

  public values(): V[] {
    return this.toList().map(e => e.value);
  }

  public toList(): Entry<K, V>[] {
    return Array.from<Entry<K, V>>(this);
  }

  public clone(): PMap<K, V> {
    return new PMap<K, V>(this.toList());
  }

  /**
   * @param mergeF In case of both PMaps having the same key, this function returns the new Value. `v1` is from `this` and `v2` is from `other`
   */
  public union(other: PMap<K, any>, mergeF: (key: K, v1: V, v2: V) => any = (k,v1,v2) => v1): PMap<K, any> {
    const result = this.clone();

    for (let {key, value} of other)
      result.add(key, this.has(key) ? mergeF(key, this.get(key) as V, value) : value)

    return result;
  }

  public intersectionKeys(other: PMap<K, any>): K[] {
    return this.toList()
      .filter(entry => other.has(entry.key))
      .map(entry => entry.key);
  }

  public difference(other: PMap<K, any>): PMap<K, V> {
    const result = this.clone();
    result.removeAll(...other.keys());
    return result;
  }

  *[Symbol.iterator]() {
    const storageKeys = Object.getOwnPropertySymbols(this.storage);

    while (storageKeys.length > 0) {
      const storageKey = storageKeys.pop();
      yield this.storage[storageKey];
    }
  }
}

/**
 * Used as unique value, when a key has not been set,
 * which is less error prone than using `null` or `undefined`
 */
export const Unset: unique symbol = Symbol('PMap-unset');

interface Entry<K, V> {
  key: K,
  value: V,
}
