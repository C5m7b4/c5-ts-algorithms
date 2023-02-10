export type SinglyLinkedNode<T> = {
  value: T;
  next: SinglyLinkedNode<T>;
};

export type DoublyLinkedListNode<T> = {
  value: T;
  prev?: DoublyLinkedListNode<T>;
  next?: DoublyLinkedListNode<T>;
};

export type AdjacencyVertex<T> = {
  node: T;
  edges: number[];
};

export type ComparatorFunction<T> = (a: T, b: T) => number;

export const enum BalancedType {
  // right child is 2 or more then left
  UNBALANCED_RIGHT,
  // right is 1 or more than the left
  SLIGHTLY_UNBALANCED_RIGHT,
  // left and right the same
  BALANCED,
  // left is 1 or more than right
  SLIGHTLY_UNBALANCED_LEFT,
  // left is 2 or more than right
  UNBALANCED_LEFT,
}

export type BinaryNode<T> = {
  value: T;
  left: BinaryNode<T> | null;
  right: BinaryNode<T> | null;
};
