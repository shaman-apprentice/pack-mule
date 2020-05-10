import { IEntry } from "./IEntry";

/**
 * A generic interface defining the functionality of PMaps.
 * 
 * @template K type of PMap's keys
 * @template V type of PMap's values
 */
export abstract class PMap<K, V> implements Iterable<IEntry<K, V>> {
  
  abstract [Symbol.iterator]();
  
  public abstract has(key: K): boolean;
  
  public abstract get(key: K): V;
  
  /** Returns the previous under `key` stored value. */
  public abstract set(key: K, value: V): V;
  
  /** Called within `this.remove` */
  protected abstract _deleteKey(key): void;
  
  /** Returns the amount of key-value pairs stored. */
  public get size(): number {
    return this.toList().length;
  }

  /** Returns the previous stored value. */
  public remove(key: K): V {
    const oldValue = this.get(key);
    this._deleteKey(key);
    return oldValue;
  }

  /** Returns the previous under `entry.key` stored values. */
  public setAll(...entries: IEntry<K, V>[]): V[] {
    return entries.map(e => this.set(e.key, e.value));
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

  public toList(): IEntry<K, V>[] {
    return Array.from<IEntry<K, V>>(this);
  }

  /** Returns a shallow clone. */
  public clone(): this {
    // @ts-ignore
    const clone = new this.constructor();
    clone.setAll(...this.toList());
    return clone;
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
}
