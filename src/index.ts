/**
 * A class providing Map functionality, which depends an objects as key
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
