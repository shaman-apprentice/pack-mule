import { PMap } from '../PMap';
import { IEntry } from '../IEntry';
import { PrimitivePMap } from '../PrimitivePMap/PrimitivePMap';
import { SymbolPMap } from '../SymbolPMap/SymbolPMap';

/**
 * While this class can use all its tentacle to grab / utilise anything as key,
 * you should reconsider your design, if you really want to do it -
 * maybe there is a better way of handling your data than to use this class ;)
 */
export class KrakenPMap<K, V> extends PMap<K, V> {
  private _primitiveStorage;
  private _otherStorage;

  /**
   * @param OtherStorage constructor of a PMap for storing non-{@link Primitive} keys. It is your responsibility to make sure, that the provided `OtherStorage` can store all keys for whom `useOtherStorage(key) === true`.
   * @param useOtherStorage optionally overwrites `this.useOtherStorage`. When `this.useOtherStorage(key) === true` `this.set(key, value)` will store the key internally in the OtherStorage-PMap, otherwise in an internal PrimitivePMap. This might be useful in case you want to force key collision in combination with {@link HashPMap}.
   */
  constructor(
    entries?: IEntry<K, V>[],
    OtherStorage?: {new() : PMap<K, V>},
    useOtherStorage?: (key: K) => boolean
  ) {
    super();

    this._primitiveStorage = new PrimitivePMap();
    this._otherStorage = OtherStorage ? new OtherStorage() : new SymbolPMap();

    if (useOtherStorage)
      this.useOtherStorage = useOtherStorage;

    if (entries)
      this.setAll(...entries);
  }

  public useOtherStorage(key: K): boolean {
    if (key === null)
      return false;

    const keyType = typeof key;
    return keyType === 'object' || keyType === 'function';
  }
  
  *[Symbol.iterator]() {
    yield* this._primitiveStorage;
    yield* this._otherStorage;
  }

  public has(key: K): boolean {
    return this.useOtherStorage(key)
      ? this._otherStorage.has(key)
      : this._primitiveStorage.has(key);
  }

  public get(key: K): V {
    return this.useOtherStorage(key)
      ? this._otherStorage.get(key)
      : this._primitiveStorage.get(key);
  }

  public set(key: K, value: V): V {
    return this.useOtherStorage(key)
      ? this._otherStorage.set(key, value)
      : this._primitiveStorage.set(key, value);
  }

  protected _deleteKey(key: K): void {
    this.useOtherStorage(key)
      ? this._otherStorage._deleteKey(key)
      : this._primitiveStorage._deleteKey(key);
  }
}
