import { PMap, Unset } from "."

it('creates an empty PMap with size 0', () => {
  const m = new PMap();
  expect(m.size).toBe(0);
});

it('has size 2 after adding 2 different keys', () => {
  const m = new PMap();
  m.add({}, 1);
  m.add({}, 2);
  expect(m.size).toBe(2);
});

it('has size 1 after adding twice the same key', () => {
  const m = new PMap();
  const k = {};
  m.add(k, 1);
  m.add(k, 2);
  expect(m.size).toBe(1);
});

it('returns `Unset` when adding a new key', () => {
  const m = new PMap();
  expect(m.add({}, 1)).toBe(Unset);
});

it('returns old Value when updating a key', () => {
  const m = new PMap();
  const k = {};
  m.add(k, 1);
  expect(m.add(k, 2)).toBe(1);
});

it('contains key/value pair, after adding it', () => {
  const m = new PMap();
  const k = {};
  m.add(k, 1);
  expect(m.has(k)).toBe(true);
  expect(m.get(k)).toBe(1);
});

it('works with `addAll`', () => {
  const m = new PMap<Object, number>();
  const k1 = {};
  const k2 = {};
  const addResult = m.addAll({key: k1, value: 1}, {key: k2, value: 2});

  expect(m.size).toBe(2);
  expect(addResult).toEqual([Unset, Unset]);
});
