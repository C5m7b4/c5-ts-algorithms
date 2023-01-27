import { ComparatorFunction, BalancedType } from './types';

export class AVLTreeNode<K, V> {
  public left: AVLTreeNode<K, V> | null;
  public right: AVLTreeNode<K, V> | null;
  public height: number;
  public key: K;
  public value: V | undefined;

  constructor(key: K, value: V | undefined) {
    this.height = 0;
    this.left = null;
    this.right = null;
    this.key = key;
    this.value = value;
  }

  public rotateRight(): AVLTreeNode<K, V> {
    const oppositeNode = <AVLTreeNode<K, V>>this.left;
    this.left = oppositeNode.right;
    oppositeNode.right = this;
    this.height = Math.max(this.leftHeight, this.rightHeight) + 1;
    oppositeNode.height = Math.max(oppositeNode.leftHeight, this.height) + 1;
    return oppositeNode;
  }

  public rotateLeft(): AVLTreeNode<K, V> {
    const oppositeNode = <AVLTreeNode<K, V>>this.right;
    this.right = oppositeNode.left;
    oppositeNode.left = this;
    this.height = Math.max(this.leftHeight, this.rightHeight) + 1;
    oppositeNode.height = Math.max(oppositeNode.rightHeight, this.height) + 1;
    return oppositeNode;
  }

  public get leftHeight(): number {
    if (this.left === null) {
      return -1;
    }
    return this.left.height || 0;
  }

  public get rightHeight(): number {
    if (this.right === null) {
      return -1;
    }
    return this.right.height || 0;
  }
}

export class AVLTree<K, V> {
  public root: AVLTreeNode<K, V> | null;
  private _size = 0;
  private _comparator: ComparatorFunction<K>;

  constructor(comparator?: ComparatorFunction<K>) {
    this._comparator = comparator ? comparator : this._defaultComparator;
    this.root = null;
  }

  private _defaultComparator(a: K, b: K): number {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  }

  insert(key: K, value?: V): void {
    this.root = this._insert(key, value, this.root);
    this._size++;
  }

  _insert(
    key: K,
    value: V | undefined,
    root: AVLTreeNode<K, V> | null
  ): AVLTreeNode<K, V> {
    if (typeof value === 'undefined' || value === null) {
      // @ts-ignore
      value = key as V;
    }

    if (root === null) {
      return new AVLTreeNode(key, value);
    }

    if (this._comparator(key, root.key) < 0) {
      root.left = this._insert(key, value, root.left);
    } else if (this._comparator(key, root.key) > 0) {
      root.right = this._insert(key, value, root.right);
    } else {
      this._size--;
      return root;
    }

    // update height and rebalance tree
    root.height = Math.max(root.leftHeight, root.rightHeight) + 1;
    const balancedType = this._getBalancedType(root);

    if (balancedType === BalancedType.UNBALANCED_LEFT) {
      if (this._comparator(key, (<AVLTreeNode<K, V>>root.left).key) < 0) {
        root = root.rotateRight();
      } else {
        root.left = (<AVLTreeNode<K, V>>root.left).rotateLeft();
        return root.rotateRight();
      }
    }

    if (balancedType === BalancedType.UNBALANCED_RIGHT) {
      if (this._comparator(key, (<AVLTreeNode<K, V>>root.right).key) > 0) {
        root = root.rotateLeft();
      } else {
        root.right = (<AVLTreeNode<K, V>>root.right).rotateRight();
        return root.rotateLeft();
      }
    }
    return root;
  }

  // logBalanceType(v: number) {
  //   let s = '';
  //   switch (v) {
  //     case 0:
  //       s = 'UNBALANCED_RIGHT';
  //       break;
  //     case 1:
  //       s = 'SLIGHTLY_UNBALANCED_RIGHT';
  //       break;
  //     case 2:
  //       s = 'BALANCED';
  //       break;
  //     case 3:
  //       s = 'SLIGHTLY_UNBALANCED_LEFT';
  //       break;
  //     case 4:
  //       s = 'UNBALANCED_LEFT';
  //       break;
  //     /* istanbul ignore next */
  //     default:
  //       s = 'unknown';
  //       break;
  //   }
  //   console.log('balanceTypeDescription', s);
  // }

  public remove(key: K): void {
    this.root = this._remove(key, this.root);
    this._size--;
  }

  private _remove(
    key: K,
    root: AVLTreeNode<K, V> | null
  ): AVLTreeNode<K, V> | null {
    if (root === null) {
      this._size++;
      return root;
    }

    if (this._comparator(key, root.key) < 0) {
      root.left = this._remove(key, root.left);
    } else if (this._comparator(key, root.key) > 0) {
      root.right = this._remove(key, root.right);
    } else {
      if (!root.left && !root.right) {
        root = null;
      } else if (!root.left && root.right) {
        root = root.right;
      } else if (root.left && !root.right) {
        root = root.left;
      } else {
        const inOrderSuccessor = this._minValue(<AVLTreeNode<K, V>>root.right);
        root.key = inOrderSuccessor.key;
        root.value = inOrderSuccessor.value;
        root.right = this._remove(inOrderSuccessor.key, root.right);
      }
    }

    if (root === null) {
      return root;
    }

    root.height = Math.max(root.leftHeight, root.rightHeight) + 1;
    const balancedType = this._getBalancedType(root);

    if (balancedType === BalancedType.UNBALANCED_LEFT) {
      if (
        this._getBalancedType(<AVLTreeNode<K, V>>root.left) ===
          BalancedType.BALANCED ||
        this._getBalancedType(<AVLTreeNode<K, V>>root.left) ===
          BalancedType.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return root.rotateRight();
      }

      root.left = (<AVLTreeNode<K, V>>root.left).rotateLeft();
      return root.rotateRight();
    }

    if (balancedType === BalancedType.UNBALANCED_RIGHT) {
      if (
        this._getBalancedType(<AVLTreeNode<K, V>>root.right) ===
          BalancedType.BALANCED ||
        this._getBalancedType(<AVLTreeNode<K, V>>root.right) ===
          BalancedType.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return root.rotateLeft();
      }

      root.right = (<AVLTreeNode<K, V>>root.right).rotateRight();
      return root.rotateLeft();
    }
    return root;
  }

  public get(key: K): V | undefined | null {
    if (this.root === null) {
      return null;
    }

    const result = this._get(key, this.root);
    if (result === null) {
      return null;
    }
    return result.value;
  }

  private _get(key: K, root: AVLTreeNode<K, V>): AVLTreeNode<K, V> | null {
    const result = this._comparator(key, root.key);
    if (result === 0) {
      return root;
    }

    if (result < 0) {
      if (!root.left) {
        return null;
      }
      return this._get(key, root.left);
    }

    if (!root.right) {
      return null;
    }
    return this._get(key, root.right);
  }

  public contains(key: K): boolean {
    if (this.root === null) {
      return false;
    }
    return !!this._get(key, this.root);
  }

  public findMinimum(): K | null {
    if (this.root === null) {
      return null;
    }
    return this._minValue(this.root).key;
  }

  private _minValue(root: AVLTreeNode<K, V>): AVLTreeNode<K, V> {
    let current = root;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  public findMaximum(): K | null {
    if (this.root === null) {
      return null;
    }
    return this._maxValue(this.root).key;
  }

  private _maxValue(root: AVLTreeNode<K, V>): AVLTreeNode<K, V> {
    let current = root;
    while (current.right) {
      current = current.right;
    }
    return current;
  }

  public isEmpty(): boolean {
    return this._size === 0;
  }

  public get size(): number {
    return this._size;
  }

  public inOrderTraversal(
    root: AVLTreeNode<K, V>,
    visited: Array<V> = []
  ): Array<V> {
    if (root) {
      this.inOrderTraversal(root.left!, visited);
      visited.push(root.value!);
      this.inOrderTraversal(root.right!, visited);
    }
    return visited;
  }

  public preOrderTraversal(root: AVLTreeNode<K, V>, visited: Array<V> = []) {
    if (root) {
      visited.push(root.value!);
      this.preOrderTraversal(root.left!, visited);
      this.preOrderTraversal(root.right!, visited);
    }
    return visited;
  }

  public postOrderTraversal(root: AVLTreeNode<K, V>, visited: Array<V> = []) {
    if (root) {
      this.postOrderTraversal(root.left!, visited);
      this.postOrderTraversal(root.right!, visited);
      visited.push(root.value!);
    }
    return visited;
  }

  private _getBalancedType(node: AVLTreeNode<K, V>): BalancedType {
    const heightDifference = node.leftHeight - node.rightHeight;
    switch (heightDifference) {
      case -2:
        return BalancedType.UNBALANCED_RIGHT;
      case -1:
        return BalancedType.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalancedType.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalancedType.UNBALANCED_LEFT;
      default:
        return BalancedType.BALANCED;
    }
  }
}
