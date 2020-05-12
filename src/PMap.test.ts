import { PMap } from './PMap';

class Posi {
  constructor(public x: number, public y: number) {}
  static toString(p: Posi) { return `${p.x}-${p.y}`; }
}

let map;
beforeEach(() => {
  map = new PMap(Posi.toString);
});

it('sets `Symbol.toStringTag`', () => {
  expect(String(map)).toBe('[object PMap]');
});

it('has the key after setting it', () => {
  const k = new Posi(1, 2);
  map.set(k, 'some-value');
  expect(map.has(k)).toBe(true);
});

it('can get the key after setting it', () => {
  const k = new Posi(1, 2);
  map.set(k, 'some-value');
  expect(map.get(k)).toBe('some-value');
});

it('overwrites a key based on the given key transform function', () => {
  const k = new Posi(1, 2);
  map.set(k, 'some-value');
  map.set(new Posi(1, 2), 'other-value');
  expect(map.get(k)).toBe('other-value');
  expect(map.size).toBe(1);
});

it('returns `undefined` for a non present key', () => {
  expect(map.get(new Posi(1, 2))).toBe(undefined);
});

it('can iterate over `.entries()`', () => {
  const k1 = new Posi(1, 2);
  const k2 = new Posi(3, 4);
  map.set(k1, 'fst-value');
  map.set(k2, 'snd-value');
  const cb = jest.fn();

  for (const [k, v] of map.entries())
    cb(k, v);

  expect(cb).toHaveBeenCalledTimes(2);
  expect(cb).toHaveBeenCalledWith(k1, 'fst-value');
  expect(cb).toHaveBeenCalledWith(k2, 'snd-value');
});

it('can clone', () => {
  map.set(new Posi(1, 2), 'some-value');
  const m2 = map.clone();

  expect(m2.size).toBe(1);
  expect(m2.get(new Posi(1, 2))).toBe('some-value');
});

it('does a shadow clone', () => {
  const k = new Posi(1, 2);
  map.set(k, 'some-value');
  const m2 = map.clone();

  m2.delete(k);
  expect(m2.has(k)).toBe(false);
  expect(map.has(k)).toBe(true);
});
