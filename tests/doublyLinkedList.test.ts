import { DoublyLinkedList } from '../src';

describe('doublyLinkedList tests', () => {
  let list;
  beforeEach(() => {
    list = new DoublyLinkedList<number>();
  });

  test('constructor', () => {
    expect(list).toEqual(expect.any(DoublyLinkedList<number>));
  });

  test('should append one item', () => {
    list.append(1);
    expect(list.length).toEqual(1);
    expect(list.head).toEqual({ value: 1 });
  });

  test('should append two items', () => {
    list.append(1);
    list.append(3);
    expect(list.length).toEqual(2);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(3);
  });

  test('should insertAt', () => {
    list.append(1);
    list.append(3);
    list.insertAt(2, 1);
    expect(list.length).toEqual(3);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(3);
    expect(list.head.next.value).toEqual(2);
  });

  test('should throw if id is greater than length of the list', () => {
    expect(() => list.insertAt(2, 3)).toThrowError();
  });

  test('should insertAt when the id equals the length', () => {
    list.append(1);
    list.insertAt(2, 1);
    expect(list.length).toEqual(2);
  });

  test('should insertAt with an id of 0', () => {
    list.append(2);
    list.insertAt(1, 0);
    expect(list.length).toEqual(2);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(2);
  });

  test('should prepend and empty list', () => {
    list.prepend(1);
    expect(list.length).toEqual(1);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(1);
  });

  test('should debug', () => {
    list.append(1);
    list.append(2);
    list.debug();
    expect(list.length).toEqual(2);
  });

  test('should remove', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    list.remove(2);
    expect(list.tail.value).toEqual(3);
  });

  test('should handle removing and item that is not there', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    list.remove(4);
    expect(list.length).toEqual(3);
  });

  test('should get', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    const result = list.get(2);
    expect(result).toEqual(3);
  });

  test('should removeAt', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    list.removeAt(1);
    expect(list.tail.value).toEqual(3);
    expect(list.head.value).toEqual(1);
    expect(list.length).toEqual(2);
  });

  test('should handle removeAt with an invalid index', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    const result = list.removeAt(5);
    expect(list.length).toEqual(3);
    expect(result).toBeUndefined();
  });

  test('should clear', () => {
    list.append(1);
    list.append(2);
    list.clear();
    expect(list.length).toEqual(0);
    expect(list.head).toBeUndefined();
    expect(list.tail).toBeUndefined();
  });

  test('should return undefined is only removing the head', () => {
    list.append(1);
    const result = list.removeNode(0);
    expect(list.length).toEqual(0);
    expect(result).toEqual(1);
  });

  test('should remove the head', () => {
    list.append(1);
    list.append(2);
    const node = list.getAt(0);
    const result = list.removeNode(node);
    expect(list.length).toEqual(1);
    expect(result).toEqual(1);
  });
});
