import { LinkedList } from '../src';

describe('linkedList tests', () => {
  let list;
  beforeEach(() => {
    list = new LinkedList();
  });

  test('constructor', () => {
    expect(list).toEqual(expect.any(LinkedList));
  });

  test('should push', () => {
    list.push('a');
    list.push('b');
    list.push('c');
    expect(list.length).toEqual(3);
  });

  test('should pop', () => {
    list.push(1);
    list.push(2);
    list.push(3);
    const popped = list.pop();
    expect(popped).toEqual(3);
    expect(list.length).toEqual(2);
  });

  test('should handle a find with an invalid id', () => {
    const result = list.find(2);
    expect(result).toBeNull();
  });

  test('should find an item properly', () => {
    list.push(1);
    list.push(2);
    const result = list.find(1);
    expect(result).toEqual({ value: 2 });
  });

  test('should handle a get with an invalid id', () => {
    const result = list.get(1);
    expect(result).toBeNull();
  });

  test('should get successfully', () => {
    list.push(1);
    list.push(2);
    const result = list.get(1);
    expect(result).toEqual(2);
  });

  test('should delete properly', () => {
    list.push(1);
    list.push(2);
    list.push(3);
    expect(list.length).toEqual(3);
    const result = list.delete(1);
    expect(result).toEqual(2);
    expect(list.length).toEqual(2);
  });

  test('should handle deleting the head', () => {
    list.push(1);
    expect(list.head).toEqual({ value: 1 });
    const result = list.delete(0);
    expect(list.head).toBeUndefined();
    expect(result).toEqual(1);
    expect(list.length).toEqual(0);
    const result2 = list.delete(0);
    expect(result2).toBeNull();
  });

  test('should handle deleting the tail', () => {
    list.push(1);
    list.push(2);
    const result = list.delete(2);
    expect(result).toBeNull();
  });
});
