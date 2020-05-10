import { HashPMap } from './HashPMap';
import { IHashable } from './IHashable';

class MyHashable implements IHashable {
  constructor(public s: string) {}
  hash() { return this.s; }
}

it('has the key after setting it', () => {
  const map = new HashPMap();
  const k = new MyHashable('k');
  map.set(k, 1);
  expect(map.has(k)).toBe(true);
});

it('gets the value after setting it', () => {
  const map = new HashPMap();
  const k = new MyHashable('k');
  map.set(k, 1);
  expect(map.get(k)).toBe(1);
});

it('removes the key-value pair', () => {
  const map = new HashPMap();
  const k = new MyHashable('k');
  map.set(k, 1);
  map.remove(k);
  expect(map.has(k)).toBe(false);
  expect(map.get(k)).toBe(undefined);
});

it('overwrites a key when setting it again', () => {
  const map = new HashPMap();
  const k = new MyHashable('k');

  const fstReturn = map.set(k, '1');
  expect(fstReturn).toBe(undefined);
  
  const sndReturn = map.set(k, '2');
  expect(sndReturn).toBe('1');
  expect(map.get(k)).toBe('2');

  expect(map.size).toBe(1);
});

it('implements `Iterable`', () => {
  const map = new HashPMap();
  const k1 = new MyHashable('k1');
  const k2 = new MyHashable('k2');
  map.set(k1, 1);
  map.set(k2, 2);
  const f = jest.fn();
  for (let {key, value} of map)
    f(key, value);

  expect(f).toHaveBeenCalledTimes(2);
  expect(f).toHaveBeenCalledWith(k1, 1);
  expect(f).toHaveBeenCalledWith(k2, 2);
});

it('overwrites a key when setting it again', () => {
  const map = new HashPMap();
  const k = new MyHashable('k');

  const fstReturn = map.set(k, '1');
  expect(fstReturn).toBe(undefined);
  
  const sndReturn = map.set(k, '2');
  expect(sndReturn).toBe('1');
  expect(map.get(k)).toBe('2');

  expect(map.size).toBe(1);
});
