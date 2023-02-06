export const BinarySearch = <T>(
  haystack: T[],
  needle: string | number | Date,
  key?: keyof T
): T | null => {
  let lo = 0;
  let hi = haystack.length;
  do {
    const m = Math.floor(lo + (hi - lo) / 2);
    const v = haystack[m];
    if (key) {
      if (v[key] === needle) {
        return v;
      } else if (v[key] > needle) {
        hi = m;
      } else {
        lo = m + 1;
      }
    } else {
      if (v === needle) {
        return v;
      } else if (v > needle) {
        hi = m; // hi is inclusive
        // lo is exclusive
      } else {
        lo = m + 1;
      }
    }
  } while (lo < hi);

  return null;
};
