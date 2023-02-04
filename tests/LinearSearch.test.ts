import { LinearSearch, LinearSearch1 } from '../src';
import { employees } from '../data/data';

describe('LinearSearch tests', () => {
  test('should fin our item in an array', () => {
    const arr = [5, 3, 8, 2, 8, 10];
    const result = LinearSearch(arr, 3);
    expect(result).toEqual(3);
  });

  test('should return undefined if the item cannot be found', () => {
    const arr = [5, 3, 8, 2, 8, 10];
    const result = LinearSearch(arr, 25);
    expect(result).toBeUndefined();
  });

  test('should find employee with an id of 2', () => {
    const result = LinearSearch(employees, 2, 'id');
    expect(result).toEqual({
      id: 2,
      firstName: 'stan',
      lastName: 'phillips',
      age: 23,
      job: 'cashier',
      level: 2,
      hireDate: '4/1/2020',
    });
  });
});

describe('LinearSearch1 tests', () => {
  test('should fin our item in an array', () => {
    const arr = [5, 3, 8, 2, 8, 10];
    const result = LinearSearch1(arr, 3);
    expect(result).toEqual({ index: 1, item: 3 });
  });

  test('should return undefined if the item cannot be found', () => {
    const arr = [5, 3, 8, 2, 8, 10];
    const result = LinearSearch1(arr, 25);
    expect(result).toEqual({ index: -1, item: undefined });
  });

  test('should find employee with an id of 2', () => {
    const result = LinearSearch1(employees, 2, 'id');
    expect(result).toEqual({
      index: 1,
      item: {
        id: 2,
        firstName: 'stan',
        lastName: 'phillips',
        age: 23,
        job: 'cashier',
        level: 2,
        hireDate: '4/1/2020',
      },
    });
  });
});
