import { PrimitivePMap } from './PrimitivePMap';

it('has the key after setting it', () => {
  const map = new PrimitivePMap();
  map.set('k', 1);
  expect(map.has('k')).toBe(true);
});

it('gets the value after setting it', () => {
  const map = new PrimitivePMap();
  map.set('k', 1);
  expect(map.get('k')).toBe(1);
});

it('removes the key-value pair', () => {
  const map = new PrimitivePMap();
  map.set('k', 1);
  map.remove('k');
  expect(map.has('k')).toBe(false);
  expect(map.get('k')).toBe(undefined);
});

it('overwrites a key when setting it again', () => {
  const map = new PrimitivePMap();
  const k = 1;

  const fstReturn = map.set(k, '1');
  expect(fstReturn).toBe(undefined);
  
  const sndReturn = map.set(k, '2');
  expect(sndReturn).toBe('1');
  expect(map.get(k)).toBe('2');

  expect(map.size).toBe(1);
});

it('implements `Iterable`', () => {
  const map = new PrimitivePMap();
  map.set('k1', 1);
  map.set('k2', 2);
  const f = jest.fn();
  for (let {key, value} of map)
    f(key, value);

  expect(f).toHaveBeenCalledTimes(2);
  expect(f).toHaveBeenCalledWith('k1', 1);
  expect(f).toHaveBeenCalledWith('k2', 2);
});

it('makes `.keys()` keep the key type', () => {
  const map = new PrimitivePMap<number, string>();
  map.set(1, '1');
  const keys = map.keys();
  expect(typeof keys[0]).toBe('number');
});

it('can distinguish the keys `1` and `"1"`', () => {
  const map = new PrimitivePMap();
  map.set(1, 'fst');
  map.set('1', 'snd');

  expect(map.size).toBe(2);
  expect(map.get(1)).toBe('fst');
  expect(map.get('1')).toBe('snd');
});

it('can distinguish the keys `undefined` and `"undefined"`', () => {
  const map = new PrimitivePMap();
  map.set(undefined, 'fst');
  map.set('undefined', 'snd');

  expect(map.size).toBe(2);
  expect(map.get(undefined)).toBe('fst');
  expect(map.get('undefined')).toBe('snd');
});

it('can distinguish the keys `null` and `"null"`', () => {
  const map = new PrimitivePMap();
  map.set(null, 'fst');
  map.set('null', 'snd');

  expect(map.size).toBe(2);
  expect(map.get(null)).toBe('fst');
  expect(map.get('null')).toBe('snd');
});

it('works with symbols', () => {
  const map = new PrimitivePMap();
  const k1 = Symbol();
  const k2 = Symbol();
  map.set(k1, 1);
  map.set(k2, 2);

  expect(map.get(k1)).toBe(1);
  expect(map.get(k2)).toBe(2);
});

it('sets all entries in the constructor', () => {
  const map = new PrimitivePMap([{key: 1, value: 'one'}]);
  expect(map.size).toBe(1);
  expect(map.get(1)).toBe('one');
});
