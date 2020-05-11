import { PMap } from '../PMap';
import { Primitive } from './Primitive';
import { IEntry } from '../IEntry';

/**
 * PrimitivePMap is basically a {@link HashPMap},
 * but provides out of the box collision protection for e.g. `1` and `"1"` or `undefined` and `"undefined"`.
 *  
 * @template K type of keys - `K` must extend {@link Primitive}
 * @template V type of values
 */
export class PrimitivePMap<K extends Primitive, V> extends PMap<K, V> {
  private _storage = {};

  constructor(entries?: IEntry<K, V>[]) {
    super();
    if (entries)
      this.setAll(...entries);
  }

  *[Symbol.iterator]() {
    yield* (Object.values(this._storage) as IEntry<K, V>[]);
  }

  public has(key: K): boolean {
    return this._storage[this._primitive2Key(key)] !== undefined;
  }

  public get(key: K): V {
    return this._storage[this._primitive2Key(key)]?.value;
  }

  public set(key: K, value: V): V {
    const internKey = this._primitive2Key(key);
    const oldValue = this._storage[internKey]?.value;
    this._storage[internKey] = { key, value };
    return oldValue;
  }

  public _deleteKey(key: K) {
    delete this._storage[this._primitive2Key(key)];
  }

  /** This transformation is necessary to e.g. distinguish between the keys `1` and `"1"` or the keys `undefined` and `"undefined"` */
  private _primitive2Key(x: any): string | symbol {
    switch (typeof x) {
      case 'symbol':
        return x;
      case 'string':
        return '_' + x;
      default:
        return String(x);
    }
  }
}
