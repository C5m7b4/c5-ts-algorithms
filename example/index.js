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

import { AdjacencyGraph } from '../src';

const graph = new AdjacencyGraph();
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(3, 5);
graph.addEdge(2, 4);
graph.addEdge(4, 5);
graph.addEdge(4, 6);
console.log('graph', graph);
const dfs = graph.depthFirstTraversal(0);
console.log('dfs', dfs);

const graph2 = new AdjacencyGraph();
graph2.addEdge(0, 1);
graph2.addEdge(0, 2);
graph2.addEdge(0, 3);
graph2.addEdge(1, 4);
graph2.addEdge(2, 4);
graph2.addEdge(2, 5);
const bfs = graph2.breadthFirstTraversal(0);
console.log('bfs', bfs);

import { BinarySearchTree } from '../src';
function comparator(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

const bst = new BinarySearchTree(comparator);
bst.insert(10);
bst.insert(70);
bst.insert(50);
bst.insert(40);
bst.insert(60);
bst.insert(55);
bst.insert(65);
console.log('bst', bst);

const bstResult = bst.remove(bst.head, 50);
console.log('bstResult', bstResult);

import { AVLTree } from '../src';

const avlTree = new AVLTree();
avlTree.insert(50);
avlTree.insert(20);
avlTree.insert(30);
avlTree.remove(20);
console.log('avlTree', avlTree);
const avlResult = avlTree.preOrderTraversal(avlTree.root);
console.log('avlResult', avlResult);

import { BinarySearch } from '../src';

const binaryArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const binaryResult = BinarySearch(binaryArray, 8);
console.log('binaryResult', binaryResult);

const arr = ['first', 'hello', 'name', 'second'];
const result8 = BinarySearch(arr, 'first');
console.log('result8', result8);

const words = ['bazinga', 'flags', 'fun', 'another', 'truth'];
console.log(words.sort());

console.log(
  words.sort((a, b) => {
    if (b > a) return 1;
    if (b < a) return -1;
    return 0;
  })
);

const emps = [
  {
    id: 1,
    name: 'jimbo',
    age: 25,
    hireDate: '1/1/2020',
    price: '1.25',
  },
  {
    id: 2,
    name: 'sally',
    age: 18,
    hireDate: '2/1/2023',
    price: '3.75',
  },
  {
    id: 3,
    name: 'tom',
    age: 42,
    hireDate: '6/5/2021',
    price: '.65',
  },
  {
    id: 4,
    name: 'donna',
    age: 12,
    hireDate: '7/1/2020',
    price: '10.25',
  },
];

import { QuickSort } from '../src';
const nums = [8, 7, 6, 4, 5];
console.log(QuickSort(nums, true));
console.log(QuickSort(nums, false));
const numbs1 = [50, 45, 10, 2, 18, 25, 13];
console.log(QuickSort(numbs1, true));
console.log(QuickSort(numbs1, false));

console.log(QuickSort(emps, true, 'age'));
console.log(QuickSort(emps, false, 'age'));

console.log(QuickSort(emps, true, 'name'));
console.log(QuickSort(emps, false, 'name'));

console.log(QuickSort(emps, true, 'hireDate', true));
console.log(QuickSort(emps, false, 'hireDate', true));

import { BubbleSort } from '../src';

console.log('bubbleSort', BubbleSort(nums));
console.log('bubbleSort', BubbleSort(nums, false));

console.log('bubbleSort', BubbleSort(emps, true, 'age'));
console.log('bubbleSort', BubbleSort(emps, false, 'age'));
console.log('bubbleSort', BubbleSort(emps, true, 'name'));
console.log('bubbleSort', BubbleSort(emps, false, 'name'));
console.log('bubbleSort', BubbleSort(emps, true, 'hireDate', true));
console.log('bubbleSort', BubbleSort(emps, false, 'hireDate', true));
