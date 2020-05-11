import { HashPMap } from './HashPMap';

class MyKey {
  constructor(public s: string) {}
  static hash(key: MyKey): string { return key.s; }
}

it('has the key after setting it', () => {
  const map = new HashPMap(MyKey.hash);
  const k = new MyKey('k');
  map.set(k, 1);
  expect(map.has(k)).toBe(true);
});

it('can get the value after setting it', () => {
  const map = new HashPMap(MyKey.hash);
  const k = new MyKey('k');
  map.set(k, 1);
  expect(map.get(k)).toBe(1);
});

it('can remove a key-value pair', () => {
  const map = new HashPMap(MyKey.hash);
  const k = new MyKey('k');
  map.set(k, 1);
  map.remove(k);
  expect(map.has(k)).toBe(false);
  expect(map.get(k)).toBe(undefined);
});

it('overwrites a key when setting it again', () => {
  const map = new HashPMap(MyKey.hash);
  const k = new MyKey('k');

  const fstReturn = map.set(k, '1');
  expect(fstReturn).toBe(undefined);
  
  const sndReturn = map.set(k, '2');
  expect(sndReturn).toBe('1');
  expect(map.get(k)).toBe('2');

  expect(map.size).toBe(1);
});

it('overwrites a key in case of hash collision', () => {
  const map = new HashPMap(MyKey.hash);

  const fstReturn = map.set(new MyKey('k'), '1');
  expect(fstReturn).toBe(undefined);
  
  const sndReturn = map.set(new MyKey('k'), '2');
  expect(sndReturn).toBe('1');
  expect(map.get(new MyKey('k'))).toBe('2');

  expect(map.size).toBe(1);
});

it('implements `Iterable`', () => {
  const map = new HashPMap(MyKey.hash);
  const k1 = new MyKey('k1');
  const k2 = new MyKey('k2');
  map.set(k1, 1);
  map.set(k2, 2);
  const f = jest.fn();
  for (let {key, value} of map)
    f(key, value);

  expect(f).toHaveBeenCalledTimes(2);
  expect(f).toHaveBeenCalledWith(k1, 1);
  expect(f).toHaveBeenCalledWith(k2, 2);
});

it('can retrieve a stored element after cloning a HashPMap', () => {
  const map = new HashPMap(MyKey.hash);
  map.set(new MyKey('k'), 'some value');
  const clone = map.clone();
  expect(clone.get(new MyKey('k'))).toBe('some value');
});
