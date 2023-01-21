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

import { DoublyLinkedList } from '../src';

const dll = new DoublyLinkedList();
dll.append(1);
console.log('1 appended', dll);
dll.append(3);
console.log('3 appended', dll);

dll.insertAt(2, 1);
console.log('2 inserted at 1', dll);

dll.prepend(0);
console.log('0 prepended', dll);

console.log('before removal', dll);
dll.removeAt(2);

console.log('ddl', dll);

const dblSteps = new DoublyLinkedList();

steps.map((step) => {
  dblSteps.append(step);
});

console.log('dblSteps', dblSteps);
