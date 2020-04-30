import { PMap, Unset } from "./PMap";

describe('get', () => {
  it('returns `Unset` if it does not has the key', () => {
    const m = new PMap();
    expect(m.get({})).toBe(Unset);
  });
});