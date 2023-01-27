import { AVLTree } from '../src';

describe('avlTree tests', () => {
  let tree;

  beforeEach(() => {
    tree = new AVLTree<number, number>();
  });

  test('should perform a preOrder traversal', () => {
    tree.insert(50);
    tree.insert(70);
    tree.insert(20);
    tree.insert(10);
    tree.insert(5);
    const result = tree.preOrderTraversal(tree.root);
    expect(result).toEqual([50, 10, 5, 20, 70]);
  });

  test('should handle an inOrder traversal', () => {
    tree.insert(50);
    tree.insert(70);
    tree.insert(20);
    tree.insert(10);
    tree.insert(5);
    const result = tree.inOrderTraversal(tree.root);
    expect(result).toEqual([5, 10, 20, 50, 70]);
  });

  test('should hand a postOrder traversal', () => {
    tree.insert(50);
    tree.insert(70);
    tree.insert(20);
    tree.insert(10);
    tree.insert(5);
    const result = tree.postOrderTraversal(tree.root);
    expect(result).toEqual([5, 20, 10, 70, 50]);
  });

  test('should handle a duplicate value', () => {
    tree.insert(50);
    tree.insert(50);
    expect(tree.root.key).toEqual(50);
    expect(tree.root.value).toEqual(50);
    expect(tree.root.left).toBeNull();
    expect(tree.root.right).toBeNull();
  });

  test('should handle unbalanced left', () => {
    tree.insert(50);
    tree.insert(20);
    tree.insert(70);
    tree.insert(10);
    tree.insert(5);
    tree.insert(60);
    tree.insert(65);
    expect(tree.root.right.value).toEqual(65);
  });

  test('should handle unbalanced right', () => {
    tree.insert(20);
    tree.insert(70);
    tree.insert(60);
    tree.insert(72);
    expect(tree.root.right.value).toEqual(70);

    tree = new AVLTree<number, number>();
    tree.insert(20);
    tree.insert(60);
    tree.insert(70);
    tree.insert(62);
    expect(tree.root.right.value).toEqual(70);
  });

  test('should handle a custom comparator', () => {
    const comparator = (a: number, b: number) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    };
    const testTree = new AVLTree<number, number>(comparator);
    testTree.insert(50);
    testTree.insert(20);
    testTree.insert(70);
    // @ts-ignore
    expect(testTree.root.value).toEqual(50);
  });

  test('should remove a node', () => {
    tree.insert(50);
    tree.insert(10);
    tree.remove(10);
    expect(tree.root.left).toBeNull();
    tree.insert(60);
    expect(tree.root.right.value).toEqual(60);
    tree.remove(60);
    expect(tree.root.right).toBeNull();
  });

  test('should handle remove on an empty tree', () => {
    const testTree = new AVLTree<number, number>();
    testTree.remove(50);
    expect(testTree.root).toBeNull();
  });

  test('should handle get', () => {
    tree.insert(50);
    tree.insert(70);
    tree.insert(10);
    let result = tree.get(10);
    expect(result).toEqual(10);
    result = tree.get(5);
    expect(result).toBeNull();
    result = tree.get(75);
    expect(result).toBeNull();
  });

  test('should get min and max values', () => {
    tree.insert(50);
    tree.insert(20);
    tree.insert(70);
    const min = tree.findMinimum();
    expect(min).toEqual(20);
    const max = tree.findMaximum();
    expect(max).toEqual(70);
  });

  test('should test min and max with an empty tree', () => {
    const testTree = new AVLTree<number, number>();
    const min = testTree.findMinimum();
    const max = testTree.findMaximum();
    expect(min).toBeNull();
    expect(max).toBeNull();
  });

  test('should report is the tree is empty or not', () => {
    const testTree = new AVLTree<number, number>();
    expect(tree.isEmpty()).toBeTruthy();
    testTree.insert(5);
    expect(testTree.isEmpty()).toBeFalsy();
  });

  test('should get the size', () => {
    const size = tree.size;
    expect(size).toEqual(0);
    tree.insert(5);
    expect(tree.size).toEqual(1);
  });

  test('should handle a get with a empty tree', () => {
    let result = tree.get(0);
    expect(result).toBeNull();
    tree.insert(5);
    result = tree.get(10);
    expect(result).toBeNull();
  });

  test('should handle contains', () => {
    let result = tree.contains(5);
    expect(result).toBeFalsy();
    tree.insert(5);
    result = tree.contains(5);
    expect(result).toBeTruthy();
  });

  test('should remove when there is only a left', () => {
    tree.insert(50);
    tree.insert(20);
    tree.insert(10);
    tree.remove(20);
    expect(tree.root.left.value).toEqual(10);

    const newTree = new AVLTree<number, number>();
    newTree.insert(50);
    newTree.insert(70);
    newTree.insert(20);
    newTree.insert(10);
    newTree.remove(20);
    expect(newTree.root!.left!.value).toEqual(10);
  });

  test('should remove when there is only a right', () => {
    tree.insert(50);
    tree.insert(70);
    tree.insert(20);
    tree.insert(75);
    tree.insert(30);
    tree.remove(20);
    expect(tree.root.left.value).toEqual(30);
  });

  test('should trigger unbalanced right on a removal', () => {
    tree.insert(50);
    tree.insert(70);
    tree.insert(30);
    tree.insert(60);
    tree.remove(30);
    expect(tree.root.value).toEqual(60);
  });

  test('should trigger unbalanced left on a removal', () => {
    tree.insert(50);
    tree.insert(70);
    tree.insert(30);
    tree.insert(35);
    tree.remove(70);
    expect(tree.root.value).toEqual(35);
  });

  test('should trigger a slightly unbalanced left on a removal', () => {
    tree.insert(50);
    tree.insert(70);
    tree.insert(30);
    tree.insert(75);
    tree.insert(35);
    tree.insert(60);
    tree.insert(20);
    tree.insert(80);
    tree.insert(15);
    tree.remove(30);
    expect(tree.root.left.value).toEqual(20);
  });

  test('should trigger a slightly unbalanced right on a removal', () => {
    tree.insert(50);
    tree.insert(70);
    tree.insert(30);
    tree.insert(75);
    tree.insert(35);
    tree.insert(25);
    tree.remove(35);
    tree.remove(25);
    tree.remove(30);
    expect(tree.root.right.value).toEqual(75);
  });
});
