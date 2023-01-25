class BinarySearchTreeNode<T> {
  data: T;
  left?: BinarySearchTreeNode<T>;
  right?: BinarySearchTreeNode<T>;

  constructor(data: T) {
    this.data = data;
  }
}

export class BinarySearchTree<T> {
  head?: BinarySearchTreeNode<T>;
  comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  insert(data: T): BinarySearchTreeNode<T> | null {
    if (!this.head) {
      this.head = new BinarySearchTreeNode<T>(data);
      return this.head;
    }

    let current = this.head;

    while (true) {
      if (this.comparator(data, current.data) === 1) {
        if (current.right) {
          current = current.right;
        } else {
          current.right = new BinarySearchTreeNode<T>(data);
          return current.right;
        }
      } else {
        if (current.left) {
          current = current.left;
        } else {
          current.left = new BinarySearchTreeNode<T>(data);
          return current.left;
        }
      }
    }
  }

  search(data: T): BinarySearchTreeNode<T> | null {
    if (!this.head) return null;

    let current = this.head;

    while (this.comparator(data, current.data) !== 0) {
      if (this.comparator(data, current.data) === 1) {
        if (!current.right) return null;

        current = current.right;
      } else {
        if (!current.left) return null;

        current = current.left;
      }
    }
    return current;
  }

  remove(
    data: BinarySearchTreeNode<T>,
    value: number
  ): BinarySearchTreeNode<T> | null {
    if (typeof data === 'undefined' || data === null) return null;

    if (value < data.data) {
      data.left = this.remove(data.left as BinarySearchTreeNode<T>, value)!;
    } else if (value > data.data) {
      data.right = this.remove(data.right as BinarySearchTreeNode<T>, value)!;
    } else {
      if (data.left == null) {
        return data.right!;
      } else if (data.right == null) {
        return data.left!;
      }

      data.data = this.minValue(data.right);

      data.right = this.remove(data.right, data.data as number)!;
    }
    return data;
  }

  private minValue(root: BinarySearchTreeNode<T>) {
    let minv = root.data;
    while (root.left != null) {
      minv = root.left.data;
      root = root.left;
    }
    return minv;
  }

  inOrderTraversal(
    node: BinarySearchTreeNode<T> | undefined,
    visited: Array<T> = []
  ): Array<T> {
    if (node) {
      this.inOrderTraversal(node.left, visited);
      visited.push(node.data);
      this.inOrderTraversal(node.right, visited);
    }
    return visited;
  }

  preOrderTraversal(
    node: BinarySearchTreeNode<T> | undefined,
    visited: Array<T> = []
  ): Array<T> {
    if (node) {
      visited.push(node.data);
      this.preOrderTraversal(node.left, visited);
      this.preOrderTraversal(node.right, visited);
    }
    return visited;
  }

  postOrderTraversal(
    node: BinarySearchTreeNode<T> | undefined,
    visited: Array<T> = []
  ): Array<T> {
    if (node) {
      this.postOrderTraversal(node.left, visited);
      this.postOrderTraversal(node.right, visited);
      visited.push(node.data);
    }
    return visited;
  }
}
