export class AVLTree<T> {
  root: AVLTreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  add(value: T) {
    if (!this.root) {
      this.root = new AVLTreeNode(value);
    } else {
      this.root.add(value);
    }
  }

  toJson() {
    return JSON.stringify(this.root, null, 4);
  }

  toObject() {
    return this.root;
  }

  isEmpty() {
    return this.root ? false : true;
  }
}

export class AVLTreeNode<T> {
  left?: AVLTreeNode<T> | null;
  right?: AVLTreeNode<T> | null;
  value: T;
  height: number;

  constructor(
    value: T,
    left?: AVLTreeNode<T> | null,
    right?: AVLTreeNode<T> | null
  ) {
    this.left = left;
    this.right = right;
    this.value = value;
    this.height = 1;
  }

  add(value: T) {
    // decide to go left or right
    if (value < this.value) {
      if (this.left) {
        this.left.add(value);
      } else {
        this.left = new AVLTreeNode<T>(value);
      }
      if (!this.right || this.right.height < this.left.height) {
        this.height = this.left.height + 1;
      }
    } else {
      // go right
      if (this.right) {
        this.right.add(value);
      } else {
        this.right = new AVLTreeNode(value);
      }
      if (!this.left || this.right.height > this.left.height) {
        this.height = this.right.height + 1;
      }
    }
    this.balance();
  }

  balance() {
    // ask if this node is out of balance
    // if not out of balance, do nothing
    // if it is not balanced, do we need to single or double rotate
    // if single, just call rotate on self
    // if double, call rotate on child and self
    const rightHeight = this.right ? this.right?.height : 0;
    const leftHeight = this.left ? this.left?.height : 0;

    if (leftHeight! > rightHeight! + 1) {
      const leftRightHeight = this.left?.right ? this.left?.right.height : 0;
      const leftLeftHeight = this.left?.left ? this.left?.left.height : 0;

      if (leftRightHeight > leftLeftHeight) {
        this.left?.rotateRR();
      }
      this.rotateLL();
    } else if (rightHeight > leftHeight + 1) {
      const rightRightHeight = this.right?.right ? this.right?.right.height : 0;
      const rightLeftHeight = this.right?.left ? this.right?.left.height : 0;

      if (rightLeftHeight > rightRightHeight) {
        this.right?.rotateLL();
      }
      this.rotateRR();
    }
  }

  rotateRR() {
    // call this if the right child is heavy
    const valueBefore = this.value;
    const leftBefore = this.left;

    this.value = this.right?.value ? (this.right?.value as T) : (0 as T);
    this.left = this.right;
    this.right = this.right?.right;

    if (this.left?.left != undefined) {
      this.left.right = this.left?.left;
    }
    if (leftBefore != undefined && this.left != undefined) {
      this.left.left = leftBefore;
    }
    if (valueBefore != undefined && this.left != undefined) {
      this.left.value = valueBefore;
    }
    this.left?.updateInNewLocation();
    this.updateInNewLocation();
  }

  rotateLL() {
    // call if the left child is heavy
    const valueBefore = this.value;
    const rightBefore = this.right;

    this.value = this.left?.value ? (this.left?.value as T) : (0 as T);
    this.right = this.left;
    this.left = this.left?.left;
    if (this.right?.right != undefined) {
      this.right.left = this.right.right;
    }
    if (rightBefore != undefined && this.right != undefined) {
      this.right.right = rightBefore;
    }
    if (valueBefore != undefined && this.right != undefined) {
      this.right.value = valueBefore;
    }
    this.right?.updateInNewLocation();
    this.updateInNewLocation();
  }

  updateInNewLocation() {
    // calculate the new height
    if (!this.right && !this.left) {
      this.height = 1;
    } else if (
      !this.right ||
      (this.left && this.right.height < this.left.height)
    ) {
      this.height = this.left ? this.left.height + 1 : 0;
    } else {
      this.height = this.right ? this.right.height + 1 : 0;
    }
  }
}
