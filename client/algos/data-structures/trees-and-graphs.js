import { validate } from "webpack";

/**
 * One way to check if two nodes are connected is to do a BFS of the graph
 * from the source node. BFS would be useful where the nodes have many out
 * edges (degrees) and paths between pairs are not exceedingly deep as it will
 * visit neighbours from the source node radiating outwards.
 *
 * N = |vertices|
 * M = |edges|
 * Time: O(M)
 * Additional space: O(N)
 */
export function isConnectedBFS(graph, source, target) {
  let discovered = new Set(),
    queue = [source];

  while (queue.length > 0) {
    let node = queue.shift();
    for (let neighbour of graph[node]) {
      if (!discovered.has(neighbour)) {
        if (neighbour === target) {
          return true;
        }
        discovered.add(neighbour);
        queue.push(neighbour);
      }
    }
  }

  return false;
}

/**
 * One way to check if two nodes are connected is to do a DFS of the graph
 * from the source node. DFS would be useful where the graph has really long
 * paths and we want to travel as far as we can through that graph as quickly as
 * possible. DFS can be recursive or use a stack and iteration.
 *
 * N = |vertices|
 * M = |edges|
 * Time: O(M)
 * Additional space: O(N)
 */
export function isConnectedDFS(graph, source, target) {
  return dfs(graph, new Set(), source, target);
}

function dfs(graph, discovered, source, target) {
  if (source === target) {
    return true;
  }
  discovered.add(source);
  for (let neighbour of graph[source]) {
    if (!discovered.has(neighbour)) {
      if (dfs(graph, discovered, neighbour, target)) {
        return true;
      }
    }
  }
  return false;
}

//Given a 2D array binaryMatrix of 0s and 1s, implement a function getNumberOfIslands that returns the number of islands of 1s in binaryMatrix.
function getNumberOfIslands(binaryMatrix) {
  let islands = 0;
  let rows = binaryMatrix.length;
  let cols = binaryMatrix[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (binaryMatrix[i][j] === 1) {
        markIsland(binaryMatrix, rows, cols, i, j);
        islands++;
      }
    }
  }
  return islands;
}

const markIsland = (binaryMatrix, rows, cols, i, j) => {
  let q = [];
  q.push([i, j]);
  while (q.length) {
    let item = q.pop();
    let x = item[0];
    let y = item[1];
    if (binaryMatrix[x][y] === 1) {
      binaryMatrix[x][y] = -1;
      pushIfValid(q, rows, cols, x - 1, y);
      pushIfValid(q, rows, cols, x, y - 1);
      pushIfValid(q, rows, cols, x + 1, y);
      pushIfValid(q, rows, cols, x, y + 1);
    }
  }
};

const pushIfValid = (q, rows, cols, x, y) => {
  if (x >= 0 && x < rows && y >= 0 && y < cols) {
    q.push([x, y]);
  }
};

// 4.2 minimal tree. Given a sorted arr with unique ints, write an algo to create a binary search tree w/ minimal height
class treeNode {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

const minTree = (arr) => {
  if (arr.length < 1) {
    return new Error("invalid input");
  }

  if (arr.length === 1) {
    return new treeNode(arr[0]);
  } else {
    const half = Math.floor(arr.length / 2);

    const newNode = new treeNode(arr[half]);
    const arr1 = arr.splice(0, half);
    const arr2 = arr.splice(1, arr.length);

    if (arr1.length) {
      newNode.left = minTree(arr1);
    }

    if (arr2.length) {
      newNode.right = minTree(arr2);
    }
    return newNode;
  }
};

console.log(minTree([0, 1, 3, 5, 10, 12, 15]));
console.log(minTree([0, 1, 3, 5, 10, 12, 15, 16]));
let exampleTree1 = minTree([0, 1, 3, 5, 10, 12, 15]);
let exampleTree2 = minTree([0, 1, 3, 5, 10, 12, 15, 16]);

/**
 * As the list is already sorted the best way to create a balanced tree is by
 * adding the middle node (parent) then the children. The algorithm is basically
 * involves adding the middle element of which split of the array so that the
 * parent is added before the left and right children of each subtree.
 *
 * N = |values|
 * Time: O(N lg N)
 * Additional space: O(N)
 */

class TreeNode {
  constructor(value) {
    this.val = value;
    this.parent = this.left = this.right = null;
  }
}

export class Tree {
  constructor() {
    this.root = null;
  }

  add(value) {
    let node = new TreeNode(value);
    if (!this.root) {
      this.root = node;
    } else {
      let n = this.root,
        branch;
      while (n) {
        branch = value < n.val ? "left" : "right";
        if (!n[branch]) {
          break;
        }
        n = n[branch];
      }
      node.parent = n;
      n[branch] = node;
    }
  }
}

export function makeBalancedTree(values) {
  let tree = new Tree();
  if (values && values.length) {
    add(tree, values, 0, values.length - 1);
  }
  return tree;
}

function add(tree, values, start, end) {
  if (start === end) {
    tree.add(values[start]);
  } else if (start < end) {
    let mid = start + Math.floor((end - start) / 2);
    tree.add(values[mid]);
    add(tree, values, start, mid - 1);
    add(tree, values, mid + 1, end);
  }
}

// 4.3 list of depths. Given a binary tree, design an algo which creates a linked list of all the nodes at each depth
// helpers
class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }
}

const createList = (arr) => {
  let prev;
  let curr;
  for (let i = arr.length - 1; i >= 0; i--) {
    curr = new ListNode(arr[i]);
    if (prev) curr.next = prev;
    prev = curr;
  }
  return new LinkedList(curr);
};

const listOfDepths = (tree) => {
  if (!tree) {
    throw new Error("invalid input");
  }

  let queue = [tree];
  let values = [tree.value];
  let lists = [];
  while (queue.length) {
    lists.push(createList(values));
    let count = queue.length;
    while (count > 0) {
      let curr = queue.shift();
      values.shift();
      if (curr.left) {
        queue.push(curr.left);
        values.push(curr.left.value);
      }
      if (curr.right) {
        queue.push(curr.right);
        values.push(curr.right.value);
      }

      count--;
    }
  }
  return lists;
};

console.log(listOfDepths(exampleTree1));
console.log(listOfDepths(exampleTree2));

/**
 * Travels through tree and adds values into a list of linked lists. Each level
 * of tree is represented in a linked list.
 *
 * N = |tree|
 * Time: O(N)
 * Additional space: O(N)
 */
export function listTreeByDepthOrder(tree) {
  let lists = [];
  addToList(lists, tree.root, 0);
  return lists;
}

function addToList(lists, node, depth) {
  if (node) {
    if (!lists[depth]) {
      lists[depth] = new LinkedList();
    }

    lists[depth].append(node.val);

    addToList(lists, node.left, depth + 1);
    addToList(lists, node.right, depth + 1);
  }
}

// 4.4 check balanced. Implement a func to check if a binary tree is balanced. For this question, a balanced tree is defined as a tree such that the heights of the two subtrees of any node never differ by more than one.
/**
 * This function attempts to check if the tree is completely balanced by finding
 * the shortest and longest paths from root to leaf. If the difference between
 * these two paths is greater than 1 then the tree is not balanced.
 *
 * N = |tree|
 * Time: O(N)
 * Additional space: O(lg N) - space cost is due to call stack size while using
 * recursion, this may be O(N) in the worst case.
 */
export function isBalanced(tree) {
  if (!tree || !tree.root) {
    return true;
  }

  let node = tree.root,
    cache = {
      min: Number.MAX_SAFE_INTEGER,
      max: Number.MIN_SAFE_INTEGER,
    };

  findDepth(cache, node, 0);
  return cache.max - cache.min <= 1;
}

function findDepth(cache, node, depth) {
  if (!node) {
    if (depth < cache.min) {
      cache.min = depth;
    }
    if (depth > cache.max) {
      cache.max = depth;
    }
  } else {
    findDepth(cache, node.left, depth + 1);
    findDepth(cache, node.right, depth + 1);
  }
}

// 4.5 validate bst. implement a func to check if a bst is a valid bst.
const checkBST = (tree) => {
  if (!tree) {
    throw new Error("invalid tree");
  }

  return validate(tree.root);
};

const validate = (node) => {
  if (!node) {
    return true;
  }
  if (node.left) {
    if (node.left.value > node.value) return false;
  }
  if (node.right) {
    if (node.right.value <= node.value) return false;
  }

  return validate(node.left) && validate(node.right);
};

console.log(checkBST(exampleTree1));
console.log(checkBST(exampleTree2));

/**
 * To check if a tree is a valid BST we need to check that all the values under
 * a node are within the ranges defined by the path we took to get there. For
 * example, initially the root can have any value, every time we go down a left
 * child that sets an upper bound on the valid values of their children by that
 * nodes value. Every time you travel down the right child you lower bound the
 * valid values of their children by that nodes value.
 *
 * N = |tree|
 * Time: O(N)
 * Additional space: O(lg N) - due to recursion. Assumes a balanced tree, worst
 * case is O(N)
 */
export function isValidBST(tree) {
  if (!tree) {
    throw new Error("invalid tree");
  }
  return isValidBSTRecursive(
    tree.root,
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY
  );
}

function isValidBSTRecursive(node, min, max) {
  if (node) {
    if (node.val < min || node.val > max) {
      return false;
    }
    return (
      isValidBSTRecursive(node.left, min, node.val) &&
      isValidBSTRecursive(node.right, node.val, max)
    );
  }
  return true;
}

// 4.6 successor. write an algo to find the next node (in-order successor) of a given node in a binary search tree. you may assume each node has a link to its parent
const successor = (node) => {
  if (node.right) {
    return findLeftmost(node.right);
  } else {
    let currNode = node;
    while (currNode.parent) {
      if (currNode.parent.left === currNode) {
        return currNode.parent;
      }
      currNode = currNode.parent;
    }
    return findLeftmost(currNode);
  }
};

const findLeftmost = (node) => {
  if (!node.left) {
    return node.value;
  }
  findLeftmost(node.left);
};

/**
 * Finding the successor as a few different scenarios:
 *   1. Where a right child exists:
 *     a. If it has no left child then it is the successor.
 *     b. If it has a left child then keep following left child pointers until
 *     you've got the left most child, this is the successor.
 *   2. Where no right child exists:
 *     a. If this node is a left child then the successor is its parent.
 *     b. Otherwise follow parent pointers until we find a node that is a left
 *     child of its parent, then the parent is the successor.
 *
 * N = |tree|
 * Time: O(lg N) - assumes balanced tree, worst cast O(N)
 * Additional space: O(1)
 */
export function findSuccessor(node) {
  if (!node) {
    throw new Error("node cannot be null");
  }

  let snode;
  if (node.right) {
    snode = node.right;
    while (snode.left) {
      snode = snode.left;
    }
    return snode.val;
  } else {
    // go up until we find left path
    snode = node;
    while (snode.parent && snode !== snode.parent.left) {
      snode = snode.parent;
    }
    return snode.parent ? snode.parent.val : undefined;
  }
}

// 4.7 build order. You are given a list of projects and a list of dependencies (where the second project is dependent on the first project and must be built after the first project is). Find a build order that will allow the projects to be built. If there is no build order return an error

class GraphNode {
  constructor(value) {
    this.value = value;
    this.adjacents = [];
  }
  addAdjacent(node) {
    this.adjacents.push(node);
  }
  removeAdjacent(node) {
    const index = this.adjacents.indexOf(node);
    if (index > -1) {
      this.adjacents.splice(index, 1);
      return node;
    }
  }
  getAdjacents() {
    return this.adjacents;
  }
  isAdjacent(node) {
    return this.adjacents.indexOf(node) > -1;
  }
}

class Graph {
  constructor() {
    this.nodes = new Map();
  }
  addEdge(source, destination) {
    const sourceNode = this.addVertex(source);
    const destinationNode = this.addVertex(destination);
    sourceNode.addAdjacent(destinationNode);
    return [sourceNode, destinationNode];
  }
  addVertex(value) {
    if (this.nodes.has(value)) {
      return this.nodes.get(value);
    } else {
      const vertex = new GraphNode(value);
      this.nodes.set(value, vertex);
      return vertex;
    }
  }
  removeVertex(value) {
    const current = this.nodes.get(value);
    if (current) {
      for (const nodes of this.nodes.values()) {
        nodes.removeAdjacent(current);
      }
    }
    return this.nodes.delete(value);
  }
  removeEdge(source, destination) {
    const sourceNode = this.nodes.get(source);
    const destinationNode = this.nodes.get(destination);
    if (sourceNode && destinationNode) {
      sourceNode.removeAdjacent(destinationNode);
    }
    return [sourceNode, destinationNode];
  }
}

const projects = ["a", "b", "c", "d", "e", "f"];
const dependencies = [
  ["a", "d"],
  ["f", "b"],
  ["b", "d"],
  ["f", "a"],
  ["d", "c"],
];
const buildProject = (projects, dependencies) => {
  let projectsGraph = new Graph();
  for (let i = 0; i < projects.length; i++) {
    projectsGraph.addVertex(projects[i]);
  }

  for (let j = 0; j < dependencies.length; j++) {
    projectsGraph.addEdge(dependencies[j][0], dependencies[j][1]);
  }

  return projectsGraph;
};

let projectsGraph = buildProject(projects, dependencies);

const projectBuilder = (graph) => {
  let order = [];
};

/**
 * To get the order of the projects we just need to create a graph of the
 * projects and their dependencies and do a topological sort. To detect if an
 * order can be determined we also need to check for cycles as topological sort
 * will only work on DAGs.
 *
 * N = |projects|
 * M = |dependencies|
 * Time: O(N+M) - this assumes that the objects and we use as hashmaps and the
 * Set data type have operations that take O(1) time.
 * Additional space: O(N)
 */
export function buildOrder(projects, dependencies) {
  let adj = {},
    finished = [],
    discovered = new Set(),
    path = new Set();

  // create adjacency matrix
  projects.forEach((project) => (adj[project] = []));
  dependencies.forEach((edge) => adj[edge[1]].push(edge[0]));
  // run topological sort
  projects.forEach((project) =>
    topologicalSort(adj, discovered, finished, path, project)
  );

  return finished.reverse();
}

function topologicalSort(adj, discovered, finished, path, project) {
  if (discovered.has(project)) {
    return;
  }

  discovered.add(project);
  path.add(project);
  for (let neighbour of adj[project]) {
    if (path.has(neighbour)) {
      throw new Error("dependencies are cyclic");
    }

    topologicalSort(adj, discovered, finished, path, neighbour);
  }
  path.delete(project);
  finished.push(project);
}
