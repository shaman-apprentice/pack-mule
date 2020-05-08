import { isObjectLike, primitive2Key } from './utilities';

/**
 * A generic class providing some Map functionality, which allows primitives and objects as its keys.
 * 
 * @template K type of PMap's keys
 * @template V type of PMap's values
 */
export class PMap<K, V> implements Iterable<Entry<K, V>> {
  private _storageKey = Symbol();
  private _storage = {};

  /** @param entries All entries will be added to the new created PMap. */
  constructor(entries?: Entry<K, V>[]) {
    if (entries)
      this.setAll(...entries);
  }

  /** Returns the amount of key-value pairs stored. */
  public get size(): number {
    return this.toList().length;
  }

  /** Returns the previous under `key` stored value. */
  public set(key: K, value: V): V {
    return isObjectLike(key)
      ? this._setObjectLike(key, value)
      : this._setPrimitiveLike(key, value);
  }

  /** Returns the previous under `entry.key` stored values. */
  public setAll(...entries: Entry<K, V>[]): V[] {
    return entries.map(e => this.set(e.key, e.value));
  }

  public has(key: K): boolean {
    const entry = isObjectLike(key)
      ? this._storage[key[this._storageKey]]
      : this._storage[primitive2Key(key)];
    return entry !== undefined;
  }

  public get(key: K): V {
    const storageKey = isObjectLike(key) ? key[this._storageKey] : primitive2Key(key);
    return this._storage[storageKey]?.value;
  } 

  /** Returns the previous stored value. */
  public remove(key: K): V {
    const oldV = this.get(key);
    this._deleteKey(key);
    return oldV;
  }

  /** Returns the previous stored values. */
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

  /** Returns a shallow clone. */
  public clone(): PMap<K, V> {
    return new PMap<K, V>(this.toList());
  }

  /**
   * Returns a shallow clone containing all key-value pairs of `this` and `other`.
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

  /** Returns a shallow clone without the keys of `other`. */
  public difference(other: PMap<K, any>): PMap<K, V> {
    const result = this.clone();
    result.removeAll(...other.keys());
    return result;
  }

  /** @ignore (hide from typedoc as the interface already tells the story) */
  *[Symbol.iterator]() {
    const keys = [
      ...Object.getOwnPropertySymbols(this._storage),
      ...Object.keys(this._storage),
    ];

    while (keys.length > 0)
      yield this._storage[keys.pop()];
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
    const entry = this._storage[primitive2Key(key)] ?? {};
    const oldV = entry.value

    entry.key = key;
    entry.value = value;
    this._storage[primitive2Key(key)] = entry;

    return oldV;
  }

  private _deleteKey(key: K) {
    if (isObjectLike(key)) {
      const storageKey = key[this._storageKey];  
      delete this._storage[storageKey];
      delete key[this._storageKey];
    } else {
      delete this._storage[primitive2Key(key)];
    }
  }
}

export interface Entry<K, V> {
  key: K,
  value: V,
}
