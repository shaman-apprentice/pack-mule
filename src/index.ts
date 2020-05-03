import { isObjectLike } from './utilities';

/**
 * A generic class providing some Map functionality, which allows primitives and objects as its keys.
 * Note that a key is assumed to be not present, if it stores the value `undefined`. 
 */
export class PMap<K, V> implements Iterable<Entry<K, V>> {
  private _storageKey = Symbol();
  private _storage = {};

  constructor(entries?: Entry<K, V>[]) {
    if (entries)
      this.setAll(...entries);
  }

  /** returns the amount of key-value pairs stored not equal to `undefined`. */
  public get size(): number {
    return this.toList().filter(e => e.value !== undefined).length;
  }

  public set(key: K, value: V): V {
    return isObjectLike(key)
      ? this._setObjectLike(key, value)
      : this._setPrimitiveLike(key, value);
  }

  public setAll(...entries: Entry<K, V>[]): V[] {
    return entries.map(e => this.set(e.key, e.value));
  }

  /** Note that a key is assumed to be not present, if it stores the value `undefined`. */
  public has(key: K): boolean {
    return isObjectLike(key)
      ? key[this._storageKey] !== undefined && this._storage[key[this._storageKey]] !== undefined
      : this._storage.hasOwnProperty(key as any);
  }

  public get(key: K): V {
    if (isObjectLike(key) && key[this._storageKey] === undefined)
      return undefined;

    const storageKey = isObjectLike(key) ? key[this._storageKey] : key;
    return this._storage[storageKey as any]?.value;
  } 

  public remove(key: K): V {
    const oldV = this.get(key);
    this._deleteKey(key);
    return oldV;
  }

  public removeAll(...keys: K[]): V[] {
    return keys.map(k => this.remove(k));
  }

  public keys(): K[] {
    return this.toList().map(e => e.key);
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
  public union(other: PMap<K, any>, mergeF: (key: K, v1: V, v2: any) => any = (k,v1,v2) => v1): PMap<K, any> {
    const result = this.clone();

    for (let {key, value} of other)
      result.set(key, this.has(key) ? mergeF(key, this.get(key), value) : value)

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
    const storageSymbols = Object.getOwnPropertySymbols(this._storage);
    while (storageSymbols.length > 0) {
      const storageKey = storageSymbols.pop();
      yield this._storage[storageKey];
    }

    const storageKeys = Object.keys(this._storage);
    while (storageKeys.length > 0) {
      const storageKey = storageKeys.pop();
      yield { key: storageKey, value: this._storage[storageKey] };
    }
  }

  private _setObjectLike(key: K, value: V) {
    const storageKey = key[this._storageKey];

    if (storageKey) { // update existing key
      const oldV = this.get(key);
      this._storage[storageKey].value = value;
      return oldV;
    }

    const newStorageKey = Symbol();
    key[this._storageKey] = newStorageKey;
    this._storage[newStorageKey] = { key, value };

    return undefined;
  }

  private _setPrimitiveLike(key: any, value: V) {
    const entry = this._storage[key] ?? {};
    const oldV = entry.value

    entry.key = key;
    entry.value = value
    this._storage[key] = entry;

    return oldV;
  }

  private _deleteKey(key: K) {
    if (isObjectLike(key)) {
      const storageKey = key[this._storageKey];  
      delete this._storage[storageKey];
      delete key[this._storageKey];
    } else {
      delete this._storage[key as any];
    }
  }
}

export interface Entry<K, V> {
  key: K,
  value: V,
}
