import { PMap } from '../PMap';
import { IEntry } from '../IEntry';

/**
 * Can use Objects and functions as keys. The keys work by reference, meaning:
 * ```ts
 * const map = new SymbolPMap<object, string>();
 * const k = {};
 * map.set(k, 'some value');
 * map.has(k); // true
 * map.has({}); // false
 * ```
 * 
 * If you want the behavior of the key to be value-like see {@link HashPMap}.
 * 
 * `SymbolPMap` makes it work internally through adding (and removing in case of removal) a Symbol to the key object.
 * This does not affect the normal behavior of your key like e.g. in `Object.keys(key)`.
 * [Here is a nice and easy to read article about Symbols](https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols),
 * if you are interested in learning more about Symbols.
 * 
 * @template K type of keys
 * @template V type of values 
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
    for (const internalKey of Object.getOwnPropertySymbols(this._storage))
      yield this._storage[internalKey];
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
