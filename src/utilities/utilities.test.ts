import { isObjectLike } from './utilities';

describe('isObjectLike', () => {
  it('identifies `null` as not object like', () => {
    expect(isObjectLike(null)).toBe(false);
  });

  it('identifies `undefined` as not object like', () => {
    expect(isObjectLike(undefined)).toBe(false);
  });

  it('identifies `{}` as object like', () => {
    expect(isObjectLike({})).toBe(true);
  });

  it('identifies an anonymous function as object like', () => {
    expect(isObjectLike(() => 1)).toBe(true);
  });

  it('identifies a function as object like', () => {
    function f() {}
    expect(isObjectLike(f)).toBe(true);
  });
});
