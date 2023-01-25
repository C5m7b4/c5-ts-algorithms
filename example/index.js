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
