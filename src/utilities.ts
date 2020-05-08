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

/** Used to distinguish between the key `1` and the key `"1"` */
export const primitive2Key = (x: any): string | symbol => {
  const type = typeof x;
  return type === 'symbol' ? x : x + type;
}
