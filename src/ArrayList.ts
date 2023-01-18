export class ArrayList<T> {
  public length: number;
  public data: Record<string, unknown>;

  constructor() {
    this.data = {};
    this.length = 0;
  }

  push(x: T): void {
    this.data[this.length] = x;
    this.length++;
  }

  pop(): T | null {
    if (this.length === 0) {
      return null;
    }
    const response = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return response as T;
  }

  get(idx: number): T | null {
    if (idx > this.length) {
      return null;
    }
    return this.data[idx] as T;
  }

  delete(idx: number): T | null {
    const response = this.data[idx];
    this._collapseTo(idx);
    return response ? (response as T) : null;
  }

  size(): number {
    return this.length;
  }

  private _collapseTo(idx: number) {
    for (let i = idx; i < this.length; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1];
    this.length--;
  }
}
