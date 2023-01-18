import { Add } from '../src';

describe('add tests', () => {
  test('should add two numbers', () => {
    expect(Add(2, 3)).toEqual(5);
  });
});
