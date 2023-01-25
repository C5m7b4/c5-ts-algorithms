import { AdjacencyGraph } from '../src';

const log = () => {
  // do nothing with this
};

describe('adjacencyGraph tests', () => {
  test('should automatically add the first node', () => {
    const graph = new AdjacencyGraph('id');
    const node1 = { id: 1 };
    const node2 = { id: 2 };
    graph.addEdge(node1, node2);
    expect(graph.adjList.get(1)!.edges).toEqual([2]);
    const graph1 = new AdjacencyGraph();
    graph1.addEdge(1, 2);
    expect(graph1.adjList.get(1)!.edges).toEqual([2]);
  });

  test('should be able to add a vertex as on object', () => {
    const graph = new AdjacencyGraph('id');
    const node1 = { id: 1 };
    graph.addVertex(node1);
    let node = graph.adjList.get(1);
    let result = { node: { id: 1 }, edges: [] };
    expect(node).toEqual(result);

    const node2 = { id: 2 };
    graph.addVertex(node2);
    node = graph.adjList.get(2);
    result = { node: { id: 2 }, edges: [] };
    expect(node).toEqual(result);
  });

  test('should be able to add vertex with a more complex object', () => {
    const graph = new AdjacencyGraph('id');
    const node1 = { id: 1, name: 'mike', job: 'developer' };
    graph.addVertex(node1);
    const node = graph.adjList.get(1);
    const result = {
      node: { id: 1, name: 'mike', job: 'developer' },
      edges: [],
    };
    expect(node).toEqual(result);
  });

  test('should be able to add vertex with simple numbers', () => {
    const graph = new AdjacencyGraph();
    graph.addVertex(1);
    expect(graph.adjList.get(1)).toEqual({ node: 1, edges: [] });
    graph.addVertex(2);
    expect(graph.adjList.get(2)).toEqual({ node: 2, edges: [] });
    expect(graph.adjList.size).toEqual(2);
  });

  test('should be abel to add an edge with objects', () => {
    const graph = new AdjacencyGraph('id');
    const node1 = { id: 1 };
    const node2 = { id: 2 };
    graph.addVertex(node1);
    graph.addEdge(node1, node2);
    expect(graph.adjList.size).toEqual(2);

    let edges = graph.adjList.get(1)!.edges;
    let result = [2];
    expect(edges).toEqual(result);
    const node5 = { id: 5 };
    graph.addEdge(node1, node5);
    edges = graph.adjList.get(1)!.edges;
    result = [2, 5];
    expect(edges).toEqual(result);
    expect(graph.adjList.size).toEqual(3);
  });

  // this is the structure this test is using
  // 1: [2,5]
  // 2: [1,5,3,4]
  // 3: [2,4]
  // 4: [2,5,3]
  // 5: [4,1,2]
  test('should not duplicate edges', () => {
    const graph = new AdjacencyGraph();
    graph.addVertex(1);
    graph.addEdge(1, 2);
    graph.addEdge(1, 5);
    graph.addEdge(2, 1);
    graph.addEdge(2, 3);
    graph.addEdge(2, 3);
    graph.addEdge(2, 4);
    graph.addEdge(3, 2);
    graph.addEdge(3, 4);
    graph.addEdge(4, 2);
    graph.addEdge(4, 5);
    graph.addEdge(4, 3);
    graph.addEdge(5, 4);
    graph.addEdge(5, 1);
    graph.addEdge(5, 2);
    expect(graph.adjList.get(1)!.edges).toEqual([2, 5]);
    expect(graph.adjList.get(2)!.edges).toEqual([1, 3, 4, 5]);
    expect(graph.adjList.get(3)!.edges).toEqual([2, 4]);
    expect(graph.adjList.get(4)!.edges).toEqual([2, 3, 5]);
    expect(graph.adjList.get(5)!.edges).toEqual([1, 4, 2]);
  });

  test('should not duplicate edges with objects', () => {
    const graph = new AdjacencyGraph('id');
    const node1 = { id: 1 };
    const node2 = { id: 2 };
    const node3 = { id: 3 };
    const node4 = { id: 4 };
    const node5 = { id: 5 };
    graph.addVertex(node1);

    graph.addEdge(node1, node2);
    graph.addEdge(node1, node5);
    graph.addEdge(node2, node1);
    graph.addEdge(node2, node5);
    graph.addEdge(node2, node3);
    graph.addEdge(node2, node4);
    graph.addEdge(node3, node2);
    graph.addEdge(node3, node4);
    graph.addEdge(node4, node2);
    graph.addEdge(node4, node5);
    graph.addEdge(node4, node3);
    graph.addEdge(node5, node4);
    graph.addEdge(node5, node1);
    graph.addEdge(node5, node2);
    expect(graph.adjList.get(1)!.edges).toEqual([2, 5]);
    expect(graph.adjList.get(2)!.edges).toEqual([1, 5, 3, 4]);
    expect(graph.adjList.get(3)!.edges).toEqual([2, 4]);
    expect(graph.adjList.get(4)!.edges).toEqual([2, 3, 5]);
    expect(graph.adjList.get(5)!.edges).toEqual([1, 2, 4]);
  });

  test('should be able to remove an edge', () => {
    const graph = new AdjacencyGraph('id');
    const node1 = { id: 1 };
    const node2 = { id: 2 };
    graph.addVertex(node1);
    graph.addEdge(node1, node2);
    const node5 = { id: 5 };
    graph.addEdge(node1, node5);
    graph.removeEdge(node1, node5);
    expect(graph.adjList.get(1)!.edges).toEqual([2]);
    expect(graph.adjList.get(5)!.edges).toEqual([]);
  });

  test('should be able to remove an edge with just numbers', () => {
    const graph = new AdjacencyGraph();
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addEdge(1, 2);
    graph.addEdge(1, 5);
    graph.removeEdge(1, 5);
    expect(graph.adjList.get(5)!.edges).toEqual([]);
    expect(graph.adjList.get(1)!.edges).toEqual([2]);
  });

  test('should be able to remove a vertex', () => {
    const graph = new AdjacencyGraph('id');
    const node1 = { id: 1 };
    const node2 = { id: 2 };
    graph.addVertex(node1);
    graph.addEdge(node1, node2);
    const node5 = { id: 5 };
    graph.addEdge(node1, node5);
    graph.removeVertex(node5);
    expect(graph.adjList.get(1)!.edges).toEqual([2]);
    expect(graph.adjList.size).toEqual(2);
  });

  test('should be able to remove a vertex with just numbers', () => {
    const graph = new AdjacencyGraph();
    graph.addVertex(1);
    graph.addEdge(1, 2);
    graph.addEdge(1, 5);
    graph.removeVertex(5);
    expect(graph.adjList.get(1)!.edges).toEqual([2]);
    expect(graph.adjList.size).toEqual(2);
  });

  test('should return depth first traversal using only numbers', () => {
    const graph = new AdjacencyGraph();
    graph.addVertex(1);
    graph.addEdge(1, 2);
    graph.addEdge(1, 5);
    graph.addEdge(2, 1);
    graph.addEdge(2, 5);
    graph.addEdge(2, 3);
    graph.addEdge(2, 4);
    graph.addEdge(3, 2);
    graph.addEdge(3, 4);
    graph.addEdge(4, 2);
    graph.addEdge(4, 5);
    graph.addEdge(4, 3);
    graph.addEdge(5, 4);
    graph.addEdge(5, 1);
    graph.addEdge(5, 2);
    const result = graph.depthFirstTraversal(1, log);
    expect(result).toEqual([1, 5, 4, 3, 2]);
  });

  test('should return depth first traversal using objects', () => {
    const graph = new AdjacencyGraph('id');
    const node1 = { id: 1 };
    const node2 = { id: 2 };
    const node5 = { id: 5 };
    graph.addVertex(node1);
    graph.addEdge(node1, node2);
    graph.addEdge(node1, node5);
    graph.addEdge(node2, node1);
    const nodeResult1 = { node: { id: 1 }, edges: [2, 5] };
    const nodeResult2 = { node: { id: 5 }, edges: [1] };
    const nodeResult3 = { node: { id: 2 }, edges: [1] };
    const result = graph.depthFirstTraversal(node1, log);
    expect(result[0]).toEqual(nodeResult1);
    expect(result[1]).toEqual(nodeResult2);
    expect(result[2]).toEqual(nodeResult3);
  });

  test('should return breadth first traversal using objects', () => {
    const graph = new AdjacencyGraph('id');
    const node1 = { id: 1 };
    const node2 = { id: 2 };
    const node5 = { id: 5 };
    graph.addVertex(node1);
    graph.addEdge(node1, node2);
    graph.addEdge(node1, node5);
    graph.addEdge(node2, node1);
    const result = graph.breadthFirstTraversal(node1, log);
    const nodeResult1 = { node: { id: 1 }, edges: [2, 5] };
    expect(result[0]).toEqual(nodeResult1);
    const nodeResult2 = { node: { id: 2 }, edges: [1] };
    expect(result[1]).toEqual(nodeResult2);
    const nodeResult3 = { node: { id: 5 }, edges: [1] };
    expect(result[2]).toEqual(nodeResult3);
  });

  test('should return breadth first search on numbers', () => {
    const graph = new AdjacencyGraph();
    graph.addVertex(1);
    graph.addEdge(1, 2);
    const result = graph.breadthFirstTraversal(1, log);
    expect(result[0]).toEqual(1);
  });

  test('should handle removing an edge that does not exist', () => {
    const graph = new AdjacencyGraph();
    graph.addEdge(1, 2);
    let result = graph.removeEdge(3, 4);
    expect(result).toBeUndefined();
    const graph1 = new AdjacencyGraph('id');
    const node1 = { id: 1 };
    const node2 = { id: 2 };
    graph1.addEdge(node1, node2);
    const node3 = { id: 3 };
    const node4 = { id: 4 };
    result = graph1.removeEdge(node3, node4);
    expect(result).toBeUndefined();
  });

  test('should handle breadth first traversal without a function', () => {
    const graph = new AdjacencyGraph();
    graph.addVertex(1);
    graph.addEdge(1, 2);
    let result = graph.breadthFirstTraversal(1);
    expect(result[0]).toEqual(1);
    const graph1 = new AdjacencyGraph('id');
    const node1 = { id: 1 };
    const node2 = { id: 2 };
    graph1.addEdge(node1, node2);
    result = graph1.breadthFirstTraversal(node1);
    expect(result).toEqual([
      { edges: [2], node: { id: 1 } },
      { edges: [1], node: { id: 2 } },
    ]);
  });

  test('should handle depth first traversal without a function', () => {
    const graph = new AdjacencyGraph();
    graph.addVertex(1);
    graph.addEdge(1, 2);
    let result = graph.depthFirstTraversal(1);
    expect(result[0]).toEqual(1);
    const graph1 = new AdjacencyGraph('id');
    const node1 = { id: 1 };
    const node2 = { id: 2 };
    graph1.addEdge(node1, node2);
    result = graph1.depthFirstTraversal(node1);
    expect(result).toEqual([
      { edges: [2], node: { id: 1 } },
      { edges: [1], node: { id: 2 } },
    ]);
  });

  test('should handle depth first traversal on an empty graph', () => {
    const graph = new AdjacencyGraph();
    // @ts-ignore
    const result = graph.depthFirstTraversal();
    expect(result).toEqual([]);
  });

  test('should add a vertex that is  not present', () => {
    const graph = new AdjacencyGraph('id');
    graph.addVertex({ id: 1 });
    graph.addVertex({ id: 1 });
    expect(graph.adjList.get(1)!.edges).toEqual([]);

    const graph1 = new AdjacencyGraph();
    graph1.addVertex(1);
    graph1.addVertex(1);
    expect(graph1.adjList.get(1)!.edges).toEqual([]);
  });
});
