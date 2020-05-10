/**
 * In the context of PMap something is object like, if it can store custom keys.
 * This distinction is necessary when storing something into a PMap,
 * to use new unique Symbols as references for object likes
 * and the value otherwise.
 */
export const isObjectLike = (o: any): boolean => {
  if (o === null)
    return false;

  const oType = typeof o;
  return oType === 'object' || oType === 'function';
}

export type Primitive = undefined | null | string | number | symbol;

/** Used e.g. to distinguish between the key `1` and the key `"1"` or the key `undefined` and `"undefined"` */
export const primitive2Key = (x: any): string | symbol => {
  switch (typeof x) {
    case 'symbol':
      return x;
    case 'string':
      return '_' + x;
    default:
      return String(x);
  }
}
