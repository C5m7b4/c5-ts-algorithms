export type SinglyLinkedNode<T> = {
  value: T;
  next: SinglyLinkedNode<T>;
};

export type DoublyLinkedListNode<T> = {
  value: T;
  prev?: DoublyLinkedListNode<T>;
  next?: DoublyLinkedListNode<T>;
};
