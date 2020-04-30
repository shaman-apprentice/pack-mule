import { PMap, Unset } from "./PMap";

it('returns `Unset` if it has not the key', () => {
  const m = new PMap();
  expect(m.remove({})).toBe(Unset);
});

it('returns the old value, if it had the key', () => {
  const m = new PMap();
  const k = {};
  m.add(k, 'remove-me');
  expect(m.remove(k)).toBe('remove-me');
})

it('keeps size if it removes nothing', () => {
  const m = new PMap();
  m.remove({});
  expect(m.size).toBe(0);
})

it('decreases the size after removing one entry', () => {
  const m = new PMap();
  const k = {};
  m.add(k, 1);
  expect(m.size).toBe(1);

  m.remove(k);
  expect(m.size).toBe(0);
});

it('removes the entry', () => {
  const m = new PMap();
  const k = {};
  m.add(k, 1);
  m.remove(k);
  expect(m.has(k)).toBe(false);
});

it('removes symbol-reference when removing entry', () => {
  const m = new PMap();
  const k = {};
  m.add(k, 1);
  m.remove(k);
  expect(Object.getOwnPropertySymbols(k).length).toBe(0);
});
