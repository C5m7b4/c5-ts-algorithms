console.log('you are ready to start coding');

import { LinkedList } from '../src';

const list = new LinkedList();
list.push(1);
list.push(2);
list.push(3);
const listItem1 = list.find(1);
console.log('listItem1', listItem1);

console.log(list);

import { steps } from '../data/data';
console.log('steps', steps);

const stepList = new LinkedList();

steps.map((step) => {
  stepList.push(step);
});

console.log('stepList', stepList);
