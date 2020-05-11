import { PMap } from '../PMap';
import { IEntry } from '../IEntry';

/**
 * Can use anything as key, using the provided `hash` function as internal unique identifier, meaning:
 * 
 * ```ts
 * const hash = k => k.id;
 * const map = new HashPMap<object, string>(hash);
 * const k = { id: 1 };
 * map.set(k, 'some value');
 * map.has(k); // true
 * map.has({ id: 1 }); // true
 * map.has({ id: 2 }); // false
 * ```
 *
 * @template K type of keys
 * @template V type of values 
 */
export class HashPMap<K, V> extends PMap<K, V> {
  private _storage = {};
  private hash: (key: K) => string;

  /**
   * @param hash function for mapping keys to unique identifiers. Be aware of overwriting your stored values in case of hash collisions.
   */
  constructor(hash: (key: K) => string, entries?: IEntry<K, V>[]) {
    super();
    this.hash = hash;
    if (entries)
      this.setAll(...entries);
  }

  *[Symbol.iterator]() {
    yield* (Object.values(this._storage) as IEntry<K, V>[]);
  }

  public has(key: K): boolean {
    return this._storage[this.hash(key)] !== undefined
  }

  public get(key: K): V {
    return this._storage[this.hash(key)]?.value;
  }

  public set(key: K, value: V): V {
    const internKey = this.hash(key);
    const oldValue = this._storage[internKey]?.value;
    this._storage[internKey] = { key, value };
    return oldValue;
  }

  protected _deleteKey(key: any): void {
    delete this._storage[this.hash(key)];
  }

  public clone() {
    // @ts-ignore
    const clone = new this.constructor(this.hash);
    clone.setAll(...this.toList());
    return clone;
  }
}
