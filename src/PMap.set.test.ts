import { PMap } from "./index"

it('creates an empty PMap with size 0', () => {
  const m = new PMap();
  expect(m.size).toBe(0);
});

it('has size 2 after setting 2 different keys', () => {
  const m = new PMap();
  m.set({}, 1);
  m.set({}, 2);
  expect(m.size).toBe(2);
});

it('has size 1 after setting twice the same key', () => {
  const m = new PMap();
  const k = {};
  m.set(k, 1);
  m.set(k, 2);
  expect(m.size).toBe(1);
});

it('returns `undefined` when setting a new key', () => {
  const m = new PMap();
  expect(m.set({}, 1)).toBe(undefined);
});

it('returns old Value when updating a key', () => {
  const m = new PMap();
  const k = {};
  m.set(k, 1);
  expect(m.set(k, 2)).toBe(1);
});

it('contains key/value pair, after setting it', () => {
  const m = new PMap();
  const k = {};
  m.set(k, 1);
  expect(m.has(k)).toBe(true);
  expect(m.get(k)).toBe(1);
});

it('works with `setAll`', () => {
  const m = new PMap<Object, number>();
  const k1 = {};
  const k2 = {};
  const setResult = m.setAll({key: k1, value: 1}, {key: k2, value: 2});

  expect(m.size).toBe(2);
  expect(setResult).toEqual([undefined, undefined]);
});
