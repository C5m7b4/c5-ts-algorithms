import { QuickSort } from '../src';
import {
  emps,
  empsSortedByAgeAscending,
  empsSortedByAgeDescending,
  empsSortedByNameAscending,
  empsSortedByNameDescending,
  empsSortedByHireDateAscending,
  empsSortedByHireDateDescending,
} from '../data/data';

describe('QuickSort tests', () => {
  test('should sort an array of numbers ascending', () => {
    const nums = [8, 7, 6, 4, 5];
    expect(QuickSort<number>(nums)).toEqual([4, 5, 6, 7, 8]);
  });

  test('should sort an array of numbers descending', () => {
    const nums = [8, 7, 6, 4, 5];
    expect(QuickSort<number>(nums, false)).toEqual([8, 7, 6, 5, 4]);
  });

  test('should sort emps by age ascending', () => {
    expect(QuickSort(emps, true, 'age')).toEqual(empsSortedByAgeAscending);
  });

  test('should sort emps by age descending', () => {
    expect(QuickSort(emps, false, 'age')).toEqual(empsSortedByAgeDescending);
  });

  test('should sort emps by name ascending', () => {
    expect(QuickSort(emps, true, 'name')).toEqual(empsSortedByNameAscending);
  });

  test('should sort emps by name descending', () => {
    expect(QuickSort(emps, false, 'name')).toEqual(empsSortedByNameDescending);
  });

  test('should sort emps by hire date descending', () => {
    expect(QuickSort(emps, true, 'hireDate', true)).toEqual(
      empsSortedByHireDateAscending
    );
  });

  test('should sort emps by hire date ascending', () => {
    expect(QuickSort(emps, false, 'hireDate', true)).toEqual(
      empsSortedByHireDateDescending
    );
  });
});
