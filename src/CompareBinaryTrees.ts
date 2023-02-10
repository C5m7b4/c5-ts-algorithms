import { BinaryNode } from './types';

export const CompareBinaryTrees = <T>(
  a: BinaryNode<T> | null,
  b: BinaryNode<T> | null
): boolean => {
  if (a === null && b === null) {
    return true;
  }

  if (a === null || b === null) {
    return false;
  }

  if (a.value !== b.value) {
    return false;
  }

  return (
    CompareBinaryTrees(a.left, b.left) && CompareBinaryTrees(a.right, b.right)
  );
};
