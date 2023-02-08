type valueType = string | number | Date;

const getValue = <T>(item: T, key: keyof T, isDate: boolean): valueType => {
  if (isDate) {
    return new Date(item[key] as string);
  } else {
    return item[key] as valueType;
  }
};

export const InsertionSort = <T>(
  list: T[],
  asc = true,
  key?: keyof T,
  isDate = false
): T[] => {
  const arr = [...list];
  for (let i = 1; i < arr.length; i++) {
    const recordToInsert = arr[i];
    let j;

    if (asc) {
      if (key) {
        for (
          j = i - 1;
          j >= 0 &&
          getValue(arr[j], key, isDate) > getValue(recordToInsert, key, isDate);
          j--
        ) {
          arr[j + 1] = arr[j];
        }
      } else {
        for (j = i - 1; j >= 0 && arr[j] > recordToInsert; j--) {
          arr[j + 1] = arr[j];
        }
      }
    } else {
      if (key) {
        for (
          j = i - 1;
          j >= 0 &&
          getValue(arr[j], key, isDate) < getValue(recordToInsert, key, isDate);
          j--
        ) {
          arr[j + 1] = arr[j];
        }
      } else {
        for (j = i - 1; j >= 0 && arr[j] < recordToInsert; j--) {
          arr[j + 1] = arr[j];
        }
      }
    }

    arr[j + 1] = recordToInsert;
  }
  return arr;
};
