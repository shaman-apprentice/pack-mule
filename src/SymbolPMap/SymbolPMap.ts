import { PMap } from '../PMap';
import { IEntry } from '../IEntry';

/**
 * Can use Objects and functions as keys.
 * 
 * It makes it work through adding (and removing in case of removal of this PMaP) a Symbol to the key object.
 * This does not affect the normal behavior of your key object like e.g. `Object.keys(key)`.
 * [Here is a nice and easy to read article about Symbols](https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols), if you are interested in learning more about them.
 */
export class SymbolPMap<K extends object, V> extends PMap<K, V> {
  private _storage = {};
  private _keySymbol = Symbol();

  constructor(entries?: IEntry<K, V>[]) {
    super();
    if (entries)
      this.setAll(...entries);
  }

  *[Symbol.iterator]() {
    const internalKeys = Object.getOwnPropertySymbols(this._storage);
    while (internalKeys.length > 0)
      yield this._storage[internalKeys.pop()];
  }

  public has(key: K): boolean {
    const referenceKey = key[this._keySymbol];
    return this._storage[referenceKey] !== undefined
  }

  public get(key: K): V {
    const referenceKey = key[this._keySymbol];
    return this._storage[referenceKey]?.value;
  }

  public set(key: K, value: V): V {
    const oldValue = this.get(key);
    const referenceKey = key[this._keySymbol] || Symbol();
    key[this._keySymbol] = referenceKey;
    this._storage[referenceKey] = { key, value };
    return oldValue;
  }

  protected _deleteKey(key: any): void {
    const referenceKey = key[this._keySymbol];
    delete key[this._keySymbol];
    delete this._storage[referenceKey];
  }
}
