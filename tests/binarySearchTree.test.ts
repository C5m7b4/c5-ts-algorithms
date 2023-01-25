import { BinarySearchTree } from '../src';

describe('binarySearchTree tests', () => {
  function comparator(a, b) {
    if (a < b) return -1;

    if (a > b) return 1;

    return 0;
  }

  let bst;

  beforeEach(() => {
    bst = new BinarySearchTree<number>(comparator);
  });

  test('pre order', () => {
    bst.insert(5);

    bst.insert(2);
    bst.insert(3);
    bst.insert(1);

    bst.insert(7);
    bst.insert(6);
    bst.insert(8);

    const preOrder = bst.preOrderTraversal(bst.head);
    expect(preOrder).toEqual([5, 2, 1, 3, 7, 6, 8]);
  });

  test('inorder', () => {
    bst.insert(5);

    bst.insert(2);
    bst.insert(3);
    bst.insert(1);

    bst.insert(7);
    bst.insert(6);
    bst.insert(8);
    const result = bst.inOrderTraversal(bst.head);
    expect(result).toEqual([1, 2, 3, 5, 6, 7, 8]);
  });

  test('postorder', () => {
    bst.insert(5);

    bst.insert(2);
    bst.insert(3);
    bst.insert(1);

    bst.insert(7);
    bst.insert(6);
    bst.insert(8);
    const result = bst.postOrderTraversal(bst.head);
    expect(result).toEqual([1, 3, 2, 6, 8, 7, 5]);
  });

  test('should search and find a node', () => {
    bst.insert(5);
    bst.insert(2);
    bst.insert(3);
    bst.insert(1);
    bst.insert(8);
    bst.insert(6);

    let result = bst.search(3);
    expect(result.data).toEqual(3);
    result = bst.search(6);
    expect(result.data).toEqual(6);
    result = bst.search(1);
    expect(result.data).toEqual(1);
    result = bst.search(2);
    expect(result.data).toEqual(2);
  });

  test('should search for something that isnt there', () => {
    bst.insert(5);
    bst.insert(2);
    bst.insert(3);
    bst.insert(1);
    bst.insert(8);
    bst.insert(6);

    const result = bst.search(12);
    console.log('result', result);
    expect(result).toBeNull();
  });

  test('should search an empty tree', () => {
    const result = bst.search(5);
    expect(result).toBeNull();
  });

  test('should have a null left', () => {
    bst.insert(8);
    bst.insert(19);
    bst.insert(21);
    const result = bst.search(5);
    expect(result).toBeNull();
  });

  test('should remove a node', () => {
    bst.insert(4);
    bst.insert(2);
    bst.insert(1);
    bst.insert(3);
    bst.insert(8);
    bst.insert(6);
    bst.insert(5);
    bst.insert(7);
    const result = bst.remove(bst.head, 6);
    expect(result.data).toEqual(4);
  });

  test('should run on an empty tree', () => {
    const result = bst.remove(bst.head, 5);
    expect(result).toBeNull();
  });

  test('should remove something from the right with a higher value', () => {
    bst.insert(4);
    bst.insert(6);
    bst.insert(5);
    const result = bst.remove(bst.head, 6);
    expect(result.data).toEqual(4);
  });

  test('should remove something that has a smaller left', () => {
    bst.insert(10);
    bst.insert(70);
    bst.insert(50);
    bst.insert(40);
    bst.insert(60);
    bst.insert(55);
    bst.insert(65);
    const result = bst.remove(bst.head, 50);
    expect(result.data).toEqual(10);
  });
});
