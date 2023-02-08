export const swap = <T>(arr: T[], a: number) => {
  const tmp = arr[a];
  arr[a] = arr[a + 1];
  arr[a + 1] = tmp;
};

export const BubbleSort = <T>(
  arr: T[],
  asc = true,
  key?: keyof T,
  isDate = false
): T[] => {
  const copyOfArray = [...arr];
  for (let i = 0; i < copyOfArray.length; i++) {
    if (asc) {
      for (let j = 0; j < copyOfArray.length - 1 - i; j++) {
        if (key) {
          const v1 = isDate
            ? new Date(copyOfArray[j][key] as string)
            : copyOfArray[j][key];
          const v2 = isDate
            ? new Date(copyOfArray[j + 1][key] as string)
            : copyOfArray[j + 1][key];
          if (v1 > v2) {
            swap(copyOfArray, j);
          }
        } else {
          if (copyOfArray[j] > copyOfArray[j + 1]) {
            swap(copyOfArray, j);
          }
        }
      }
    } else {
      for (let j = 0; j < copyOfArray.length - 1 - i; j++) {
        if (key) {
          const v1 = isDate
            ? new Date(copyOfArray[j][key] as string)
            : copyOfArray[j][key];
          const v2 = isDate
            ? new Date(copyOfArray[j + 1][key] as string)
            : copyOfArray[j + 1][key];
          if (v1 < v2) {
            swap(copyOfArray, j);
          }
        } else {
          if (copyOfArray[j] < copyOfArray[j + 1]) {
            swap(copyOfArray, j);
          }
        }
      }
    }
  }
  return copyOfArray;
};
