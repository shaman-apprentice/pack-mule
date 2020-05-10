import { PrimitivePMap } from "./PrimitivePMap"

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
