const merge = <T>(
  left: T[],
  right: T[],
  asc: boolean,
  key?: keyof T,
  isDate?: boolean
): T[] => {
  const results: T[] = [];

  while (left.length && right.length) {
    if (asc) {
      if (key) {
        const v1 = isDate ? new Date(left[0][key] as string) : left[0][key];
        const v2 = isDate ? new Date(right[0][key] as string) : right[0][key];
        if (v1 <= v2) {
          results.push(left.shift()!);
        } else {
          results.push(right.shift()!);
        }
      } else {
        if (left[0] <= right[0]) {
          results.push(left.shift()!);
        } else {
          results.push(right.shift()!);
        }
      }
    } else {
      if (key) {
        const v1 = isDate ? new Date(left[0][key] as string) : left[0][key];
        const v2 = isDate ? new Date(right[0][key] as string) : right[0][key];
        if (v1 >= v2) {
          results.push(left.shift()!);
        } else {
          results.push(right.shift()!);
        }
      } else {
        if (left[0] >= right[0]) {
          results.push(left.shift()!);
        } else {
          results.push(right.shift()!);
        }
      }
    }
  }

  return results.concat(left, right);
};

export const MergeSort = <T>(
  arr: T[],
  asc = true,
  key?: keyof T,
  isDate = false
): T[] => {
  if (arr.length < 2) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const sortedLeft = MergeSort(left, asc, key, isDate);
  const sortedRight = MergeSort(right, asc, key, isDate);

  return merge(sortedLeft, sortedRight, asc, key, isDate);
};
