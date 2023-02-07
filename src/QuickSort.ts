const qs = <T>(
  arr: T[],
  lo: number,
  hi: number,
  asc: boolean,
  key?: keyof T,
  isDate?: boolean
): void => {
  if (lo >= hi) {
    return;
  }

  const pivotIdx = partition(arr, lo, hi, asc, key, isDate);

  qs(arr, lo, pivotIdx - 1, asc, key, isDate);
  qs(arr, pivotIdx + 1, hi, asc, key, isDate);
};

const partition = <T>(
  arr: T[],
  lo: number,
  hi: number,
  asc: boolean,
  key?: keyof T,
  isDate?: boolean
): number => {
  const pivot = arr[hi];
  let idx = lo - 1;

  if (asc) {
    for (let i = lo; i < hi; i++) {
      if (key) {
        const condition = isDate
          ? new Date(arr[i][key] as string) <= new Date(pivot[key] as string)
          : arr[i][key] <= pivot[key];
        if (condition) {
          idx++;
          const tmp = arr[i];
          arr[i] = arr[idx];
          arr[idx] = tmp;
        }
      } else {
        if (arr[i] <= pivot) {
          idx++;
          const tmp = arr[i];
          arr[i] = arr[idx];
          arr[idx] = tmp;
        }
      }
    }
  } else {
    for (let i = lo; i < hi; i++) {
      if (key) {
        const condition = isDate
          ? new Date(arr[i][key] as string) >= new Date(pivot[key] as string)
          : arr[i][key] >= pivot[key];
        if (condition) {
          idx++;
          const tmp = arr[i];
          arr[i] = arr[idx];
          arr[idx] = tmp;
        }
      } else {
        if (arr[i] >= pivot) {
          idx++;
          const tmp = arr[i];
          arr[i] = arr[idx];
          arr[idx] = tmp;
        }
      }
    }
  }

  idx++;
  arr[hi] = arr[idx];
  arr[idx] = pivot;

  return idx;
};

export const QuickSort = <T>(
  arr: T[],
  asc = true,
  key?: keyof T,
  isDate = false
): T[] => {
  const copyOfArray = [...arr];
  qs(copyOfArray, 0, arr.length - 1, asc, key, isDate);
  return copyOfArray;
};
