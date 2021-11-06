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

let node1 = new ListNode(2);
let node2 = new ListNode(5);
node1.next = node2;

let node3 = new ListNode(1);
node2.next = node3;
let node4 = new ListNode(1);
node3.next = node4;

let list = new LinkedList(node1);

// 2.1 write code to remove duplicates frrom a unsorted linked list.
// what would you do if a temp buffer was not allowed?
const removeDupl = (list) => {
  let cache = {};
  let currNode = list.head;
  cache[currNode.data] = true;
  while (currNode.next) {
    if (cache[currNode.next.data]) {
      currNode.next = currNode.next.next;
    } else {
      cache[currNode.next.data] = true;
      currNode = currNode.next;
    }
  }
  return list;
};

console.log(removeDupl(list));

export function removeDuplicatesSet(list) {
  if (!list) {
    return list;
  }

  let seen = new Set(),
    node = list;

  // add head
  seen.add(node.val);
  while (node.next) {
    if (seen.has(node.next.val)) {
      // skip next node
      node.next = node.next.next;
    } else {
      seen.add(node.next.val);
      node = node.next;
    }
  }

  return list; // return list, head will never change
}

//2.2 return kth to last. implement algo to find kth to last element of a singly linked list
const kthToLast = (list, k) => {
  let count = k;
  let node1 = list.head;
  let node2 = list.head;
  while (node1.next) {
    node1 = node1.next;
    if (count > 0) {
      count--;
    } else {
      node2 = node2.next;
    }
  }
  return node2;
};

console.log(kthToLast(list, 3));

// 2.3 implement algo to delete mmiddle node given that node
// * Copy the value from the next node into the current node object and then
//  * update the next pointer of the current object to skip over the next node.
//  *
//  * Time: O(1)
//  * Additional space: O(1)
//  */
export function deleteMiddleNode(node) {
  if (!node || !node.next) {
    throw new Error("invalid node");
  }

  node.val = node.next.val;
  node.next = node.next.next;
}

// 2.4 partition. write code to partition a linked list around value x so that al nodes less than x come before all nodes greater than or equal to x. the partition element can appear in the right partition
const partition = (list, partition) => {
  let currNode = list.head;
  let prevNode = list.head;

  while (currNode.next) {
    if (currNode.data <= partition) {
      prevNode.next = currNode.next;
      currNode.next = list.head;
      list.head = currNode;
      currNode = prevNode.next;
    } else {
      prevNode = currNode;
      currNode = currNode.next;
    }
  }

  if (currNode.data <= partition) {
    currNode.next = list.head;
    list.head = currNode;
  }
  return list;
};

console.log(partition(list, 1));

console.log(partition(list, 1));
