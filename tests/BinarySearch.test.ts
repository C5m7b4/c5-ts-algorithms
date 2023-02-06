import { BinarySearch } from '../src';
import { employees } from '../data/data';

describe('BinarySearchTests', () => {
  test('should find a number in a number array', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = BinarySearch(nums, 8);
    expect(result).toEqual(8);
    const result1 = BinarySearch(nums, 4);
    expect(result1).toEqual(4);
  });

  test('should not find result in an array of numbers', () => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = BinarySearch(nums, 12);
    expect(result).toBeNull();
  });

  test('should find object in an array of objects', () => {
    const result = BinarySearch(employees, 8, 'id');
    expect(result).toEqual({
      id: 8,
      firstName: 'cheryl',
      lastName: 'bowers',
      age: 22,
      job: 'cashier',
      level: 2,
      hireDate: '5/1/2019',
    });
    const result1 = BinarySearch(employees, 4, 'id');
    expect(result1).toEqual({
      id: 4,
      firstName: 'alysa',
      lastName: 'mitchell',
      age: 19,
      job: 'bagger',
      level: 1,
      hireDate: '2/1/2020',
    });
  });

  test('should find an entry in an array of strings', () => {
    const arr = ['first', 'hello', 'name', 'second'];
    const result1 = BinarySearch(arr, 'first');
    expect(result1).toEqual('first');
    const result2 = BinarySearch(arr, 'hello');
    expect(result2).toEqual('hello');
    const result3 = BinarySearch(arr, 'name');
    expect(result3).toEqual('name');
    const result4 = BinarySearch(arr, 'second');
    expect(result4).toEqual('second');
  });
});
