import { CompareBinaryTrees } from '../src';

const tree1 = {
  value: 10,
  left: {
    value: 5,
    left: null,
    right: null,
  },
  right: {
    value: 20,
    left: {
      value: 15,
      left: null,
      right: null,
    },
    right: null,
  },
};

const tree2 = {
  value: 10,
  left: {
    value: 5,
    left: null,
    right: null,
  },
  right: {
    value: 20,
    left: {
      value: 17,
      left: null,
      right: null,
    },
    right: null,
  },
};

const tree3 = {
  value: 10,
  left: {
    value: 5,
    left: {
      value: 3,
      left: null,
      right: null,
    },
    right: null,
  },
  right: {
    value: 20,
    left: {
      value: 17,
      left: null,
      right: null,
    },
    right: null,
  },
};

describe('CompareBinaryTrees tests', () => {
  test('should match two trees', () => {
    expect(CompareBinaryTrees(tree1, tree1)).toBeTruthy();
  });

  test('should decline two trees', () => {
    expect(CompareBinaryTrees(tree1, tree2)).toBeFalsy();
  });

  test('should have a null for one tree and not for the other', () => {
    expect(CompareBinaryTrees(tree1, tree3)).toBeFalsy();
  });
});
