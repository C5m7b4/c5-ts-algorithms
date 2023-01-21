import { DoublyLinkedListNode } from './types';

export class DoublyLinkedList<T> {
  public length: number;
  public head?: DoublyLinkedListNode<T>;
  public tail?: DoublyLinkedListNode<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  debug() {
    let curr = this.head;
    let out = '';
    for (let i = 0; curr && i < this.length; i++) {
      out += `${i} => ${JSON.stringify(curr.value)},`;
      curr = curr.next;
    }
    console.log(out);
  }

  prepend(item: T): void {
    const node = { value: item } as DoublyLinkedListNode<T>;

    this.length++;

    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;

    this.head = node;
  }

  insertAt(item: T, idx: number): void {
    if (idx > this.length) {
      throw new Error(
        'you are trying to insert at a position that is greater than the lists length'
      );
    }

    if (idx === this.length) {
      this.append(item);
      return;
    } else if (idx === 0) {
      this.prepend(item);
      return;
    }

    this.length++;
    const curr = this.getAt(idx) as DoublyLinkedListNode<T>;
    const node = { value: item } as DoublyLinkedListNode<T>;

    node.next = curr;
    node.prev = curr.prev;

    /* istanbul ignore else */
    if (curr.prev) {
      curr.prev.next = node;
      curr.prev = node;
    }

    /* istanbul ignore else */
    if (this.head) {
      this.head.prev = undefined;
    }
  }

  append(item: T): void {
    this.length++;
    const node = { value: item } as DoublyLinkedListNode<T>;

    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }

    node.prev = this.tail;
    node.next = undefined;

    this.tail.next = node;
    this.tail = node;
  }

  remove(item: T): T | undefined {
    let curr = this.head;

    for (let i = 0; curr && i < this.length; i++) {
      if (curr.value === item) {
        break;
      }
      curr = curr.next;
    }

    if (!curr) {
      return undefined;
    }

    return this.removeNode(curr);
  }

  get(idx: number): T | undefined {
    return this.getAt(idx)?.value;
  }

  removeAt(idx: number): T | undefined {
    const node = this.getAt(idx);

    if (!node) {
      return undefined;
    }
    return this.removeNode(node);
  }

  private removeNode(node: DoublyLinkedListNode<T>): T | undefined {
    this.length--;

    if (this.length === 0) {
      const out = this.head?.value;
      this.head = this.tail = undefined;
      return out;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    /* istanbul ignore else */
    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node == this.head) {
      this.head = node.next;
    }

    node.prev = node.next = undefined;
    return node?.value;
  }

  getAt(idx: number): DoublyLinkedListNode<T> | undefined {
    let curr = this.head;
    for (let i = 0; curr && i < idx; i++) {
      curr = curr.next;
    }
    return curr;
  }

  clear(): boolean {
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
    return true;
  }
}
