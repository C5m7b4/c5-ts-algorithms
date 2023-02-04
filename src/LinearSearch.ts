export const LinearSearch = <T>(
  list: T[],
  value: number | string | Date,
  key?: keyof T
): T | undefined => {
  if (key) {
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if (element[key] === value) {
        return element;
      }
    }
  } else {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === value) {
        return list[i];
      }
    }
  }

  return undefined;
};

export type LinearSearchResult<T> = {
  index: number;
  item: T | undefined;
};

export const LinearSearch1 = <T>(
  list: T[],
  value: number | string | Date,
  key?: keyof T
): LinearSearchResult<T> => {
  let index = -1;
  console.log('key', key);
  if (key) {
    list.forEach((listItem: T, i: number) => {
      if (listItem[key] === value) {
        index = i;
      }
    });
  } else {
    list.forEach((listItem: T, i: number) => {
      if (listItem === value) {
        index = i;
      }
    });
  }
  const result = list[index] || undefined;
  return { index, item: result };
};
