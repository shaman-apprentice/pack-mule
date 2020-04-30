import PMap from "./PMap"

it('creates an empty PMap with size 0', () => {
  const m = new PMap();
  expect(m.size()).toBe(0);
});