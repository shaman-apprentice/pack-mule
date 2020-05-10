import { PMap } from '../PMap';
import { Primitive, primitive2Key } from '../utilities/utilities';

/** Can use Primitives := undefined | null | string | number | symbol as keys */
export class PrimitivePMap<K extends Primitive, V> extends PMap<K, V> {
  private _storage = {};

  *[Symbol.iterator]() {
    const internKeys = Object.keys(this._storage);
    while(internKeys.length > 0)
      yield this._storage[internKeys.pop()];
  }

  public has(key: K): boolean {
    return this._storage[primitive2Key(key)] !== undefined;
  }

  public get(key: K): V {
    return this._storage[primitive2Key(key)]?.value;
  }

  public set(key: K, value: V): V {
    const internKey = primitive2Key(key);
    const oldValue = this._storage[internKey]?.value;
    this._storage[internKey] = { key, value };
    return oldValue;
  }

  public _deleteKey(key: K) {
    delete this._storage[primitive2Key(key)];
  }
}
