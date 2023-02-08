import { BubbleSort } from '../src';
import {
  emps,
  empsSortedByAgeAscending,
  empsSortedByAgeDescending,
  empsSortedByNameAscending,
  empsSortedByNameDescending,
  empsSortedByHireDateAscending,
  empsSortedByHireDateDescending,
} from '../data/data';

describe('BubbleSort tests', () => {
  test('should sort an array of numbers ascending', () => {
    const nums = [4, 8, 2, 1, 7];
    expect(BubbleSort(nums)).toEqual([1, 2, 4, 7, 8]);
  });

  test('should sort an array of numbers descending', () => {
    const nums = [4, 8, 2, 1, 7];
    expect(BubbleSort(nums, false)).toEqual([8, 7, 4, 2, 1]);
  });

  test('should sort emps by age ascending', () => {
    expect(BubbleSort(emps, true, 'age')).toEqual(empsSortedByAgeAscending);
  });

  test('should sort emps by age descending', () => {
    expect(BubbleSort(emps, false, 'age')).toEqual(empsSortedByAgeDescending);
  });

  test('should sort emps by name ascending', () => {
    expect(BubbleSort(emps, true, 'name')).toEqual(empsSortedByNameAscending);
  });

  test('should sort emps by name descending', () => {
    expect(BubbleSort(emps, false, 'name')).toEqual(empsSortedByNameDescending);
  });

  test('should sort emps by hire date descending', () => {
    expect(BubbleSort(emps, true, 'hireDate', true)).toEqual(
      empsSortedByHireDateAscending
    );
  });

  test('should sort emps by hire date ascending', () => {
    expect(BubbleSort(emps, false, 'hireDate', true)).toEqual(
      empsSortedByHireDateDescending
    );
  });
});
