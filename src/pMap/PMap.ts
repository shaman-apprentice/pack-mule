// todo move into test setup for f*** babel
import "regenerator-runtime/runtime.js";

export class PMap<K extends Object, V> implements Iterable<[K, V]> {
  private storageKey = Symbol();
  private storage = {};
  private _size = 0;

  public get size() {
    return this._size
  }

  public add(k: K, v: V): V | typeof Unset {
    const existingRef = k[this.storageKey] as symbol;

    if (existingRef) { // update existing key
      const oldV: V = this.storage[existingRef].v;
      this.storage[existingRef].v = v;
      return oldV;
    }

    const ref = Symbol();
    k[this.storageKey] = ref;
    this.storage[ref] = { k, v };

    this._size++;

    return Unset;
  }

  public has(k: K): boolean {
    return Object.getOwnPropertySymbols(this.storage).includes(k[this.storageKey]);
  }

  public get(k: K): V | typeof Unset {
    if (!this.has(k))
      return Unset;

    const ref = k[this.storageKey];
    return this.storage[ref].v;
  } 

  public remove(k: K): V | typeof Unset {
    if (!this.has(k))
      return Unset;

    const ref = k[this.storageKey];
    const oldV = this.storage[ref].v;

    delete k[this.storageKey];
    delete this.storage[ref];
    this._size--;

    return oldV;
  }

  *[Symbol.iterator]() {
    const storageKeys = Object.getOwnPropertySymbols(this.storage);

    while (storageKeys.length > 0) {
      const storageKey = storageKeys.pop();
      const { k, v } = this.storage[storageKey];
      // todo: FR @TS for Symbols as key type 
      // a la type StorageEntry = { [key: Symbol]: {...} }
      // to avoid this hack and get type safety while developing
      yield [k, v] as [K, V];
    }
  }
}

export const Unset: unique symbol = Symbol('PMap-unset');
