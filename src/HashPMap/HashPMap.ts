import { PMap } from '../PMap';
import { IEntry } from '../IEntry';
import { IHashable } from './IHashable';

/**
 * Can use anything as key as long as it implements IHashable:
 * The calculated value from `.hash()` is used internally as unique identifier. 
 */
export class HashPMap<K extends IHashable, V> extends PMap<K, V> {
  private _storage = {};

  constructor(entries?: IEntry<K, V>[]) {
    super();
    if (entries)
      this.setAll(...entries);
  }

  *[Symbol.iterator]() {
    for (const entry of Object.values(this._storage))
      yield entry as IEntry<K, V>;
  }

  public has(key: K): boolean {
    return this._storage[key.hash()] !== undefined
  }

  public get(key: K): V {
    return this._storage[key.hash()]?.value;
  }

  public set(key: K, value: V): V {
    const internKey = key.hash();
    const oldValue = this._storage[internKey]?.value;
    this._storage[internKey] = { key, value };
    return oldValue;
  }

  protected _deleteKey(key: any): void {
    delete this._storage[key.hash()];
  }
}
