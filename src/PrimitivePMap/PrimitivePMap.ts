import { PMap } from '../PMap';
import { Primitive } from './Primitive';
import { IEntry } from '../IEntry';

/** Can use Primitives := undefined | null | string | number | symbol as keys */
export class PrimitivePMap<K extends Primitive, V> extends PMap<K, V> {
  private _storage = {};

  constructor(entries?: IEntry<K, V>[]) {
    super();
    if (entries)
      this.setAll(...entries);
  }

  *[Symbol.iterator]() {
    const internKeys = Object.keys(this._storage);
    while(internKeys.length > 0)
      yield this._storage[internKeys.pop()];
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
