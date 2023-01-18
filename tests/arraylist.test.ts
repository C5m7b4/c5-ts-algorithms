import { ArrayList } from '../src';

describe('arraylist tests', () => {
  let list;
  beforeEach(() => {
    list = new ArrayList();
  });
  test('constructor', () => {
    expect(list).toEqual(expect.any(ArrayList));
  });
  test('push', () => {
    list.push(1);
    list.push(2);
    expect(list.size()).toEqual(2);
  });
  test('pop', () => {
    list.push(1);
    list.push(2);
    const poppedValue = list.pop();
    expect(poppedValue).toEqual(2);
    expect(list.size()).toEqual(1);
  });
  test('get', () => {
    list.push('this is the first entry');
    list.push({ name: 'mike', id: 1 });
    const getResult = list.get(1);
    expect(getResult).toEqual({ name: 'mike', id: 1 });
  });
  test('delete', () => {
    list.push(1);
    list.push(2);
    list.push(3);
    const deleted = list.delete(1);
    expect(deleted).toEqual(2);
    expect(list.get(0)).toEqual(1);
    expect(list.get(1)).toEqual(3);
    expect(list.size()).toEqual(2);
  });
  test('pop an emptyArrayList', () => {
    const popResult = list.pop();
    expect(popResult).toBeNull();
  });
  test('should return null when getting an invalid index', () => {
    expect(list.get(4)).toBeNull();
  });
  test('should return null when deleting an invalid index', () => {
    expect(list.delete(4)).toBeNull();
  });
});
