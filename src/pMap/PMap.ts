export class PMap<K extends Object, V> {
  private storageKey = Symbol();
  private storage = {};
  private _size = 0;

  public get size() {
    return this._size
  }

  public add(k: K, v: V): V | typeof Unset {
    const existingRef = k[this.storageKey];

    if (existingRef) { // update existing key
      const oldV = this.storage[existingRef];
      this.storage[existingRef] = v;
      return oldV;
    }

    const ref = Symbol();
    k[this.storageKey] = ref;
    this.storage[ref] = v;

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
    return this.storage[ref];
  } 

  public remove(k: K): V | typeof Unset {
    if (!this.has(k))
      return Unset;

    const ref = k[this.storageKey];
    const oldV = this.storage[ref];

    delete k[this.storageKey];
    delete this.storage[ref];
    this._size--;

    return oldV;
  }
}

export const Unset: unique symbol = Symbol('PMap-unset');
