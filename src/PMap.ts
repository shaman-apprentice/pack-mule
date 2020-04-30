export default class PMap<K extends Object, V> {
  private storageKey: Symbol;
  private storage: Object;

  constructor() {
    this.storageKey = Symbol();
    this.storage = {};
  }

  public size(): number {
    return Object.values(this.storage).length;
  }
}

export interface StorageEntry<K, V> {
  k: K,
  v: V,
}