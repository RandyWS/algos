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

export function getLength(list) {
  let length = 0;
  while (list) {
    list = list.next;
    ++length;
  }
  return length;
}

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

// 2.5 sum lists. two nums represented by a linked list, where each node contains a single digit. the digits are stored in reverse order, such that 1s digit is at the head of the list. write a func that adds two nums and rerturns the sum as a linked list. (you are not allowed to cheat and just convert the linked list to an integer)

let nodeA = new ListNode(7);
let nodeB = new ListNode(1);
nodeA.next = nodeB;

let nodeC = new ListNode(6);
nodeB.next = nodeC;

let list1 = new LinkedList(nodeA);

let nodeAA = new ListNode(5);
let nodeBB = new ListNode(9);
nodeAA.next = nodeBB;

let nodeCC = new ListNode(2);
nodeBB.next = nodeCC;

let list2 = new LinkedList(nodeAA);

const sumLists = (listA, listB) => {
  let currNode;
  let prevNode;
  let currSum = 0;
  let remainder = 0;
  let list1Node = listA.head;
  let list2Node = listB.head;

  while (list1Node || list2Node) {
    if (list1Node && list2Node) {
      currSum = list1Node.data + list2Node.data + remainder;
      list1Node = list1Node.next;
      list2Node = list2Node.next;
    } else if (list1Node) {
      currSum = list1Node.data + remainder;
      list1Node = list1Node.next;
    } else if (list2Node) {
      currSum = list2Node.data + remainder;
      list2Node = list2Node.next;
    }

    remainder = Math.floor(currSum / 10);

    if (remainder) {
      currSum = Number(currSum.toString()[1]);
    }

    currNode = new ListNode(currSum);
    if (prevNode) {
      currNode.next = prevNode;
    }
    prevNode = currNode;
  }
  return new LinkedList(currNode);
};

console.log(sumLists(list1, list2));

/**
 * Walk through both lists in step summing each digit. Where the sum is greater
 * than 10 then maintain a carry value. Where one list is longer than the other
 * then copy the rest of the digits across adding any carry values.
 *
 * N = max(|list1|, |list2|)
 * Time: O(N)
 * Additional space: O(N) - algorithm doesn't require additional storage in
 * general, additional space is used to create the new list.
 */
export function sumListsReverseOrder(list1, list2) {
  let head = { next: null }, // pseudo node
    tail = head,
    carry = 0,
    node1 = list1,
    node2 = list2,
    sum;

  while (node1 && node2) {
    sum = node1.val + node2.val + carry;
    if (sum >= 10) {
      carry = 1;
      sum -= 10;
    } else {
      carry = 0;
    }
    tail = tail.next = createNode(sum);
    node1 = node1.next;
    node2 = node2.next;
  }

  node1 = node1 || node2; // go through whatever is remaining of the longer list
  while (node1) {
    sum = node1.val + carry;
    if (sum >= 10) {
      carry = 1;
      sum -= 10;
    } else {
      carry = 0;
    }
    tail = tail.next = createNode(sum);
    node1 = node1.next;
  }

  if (carry > 0) {
    // check for any remaining carry
    tail.next = createNode(carry);
  }

  return head.next;
}

// 2.6 implement a func to check if a linked list is a palindrome

const isPalindrome = (list) => {
  if (!list) {
    throw new Error("invalid input");
  }

  let currNode = list.head;
  let cache = {};
  let onlyOdd = true;
  while (currNode) {
    if (cache[currNode.data]) {
      cache[currNode.data] += 1;
    } else {
      cache[currNode.data] = 1;
    }
    currNode = currNode.next;
  }

  for (let key in cache) {
    if (cache[key] % 2 === 1) {
      if (!onlyOdd) {
        return false;
      } else {
        onlyOdd = false;
      }
    }
  }
  return true;
};

console.log(isPalindrome(list));
console.log(isPalindrome(list1));
console.log(isPalindrome(list2));

/**
 * First find out the length of the list, then walk through half of the list
 * pushing the values onto a stack. Once the middle is reached if the list had
 * an odd length then skip the middle element. After that walk to the end of the
 * list and compare node values to a value popped off the stack, if no mismatches
 * then the list is a palindrome.
 *
 * N = |list|
 * Time: O(N)
 * Additional space: O(N)
 */
export function isPalindromeStack(list) {
  let length = getLength(list);

  if (length <= 1) {
    return true;
  }

  let stack = [],
    node = list;
  for (let i = Math.floor(length / 2); i > 0; --i) {
    stack.push(node.val);
    node = node.next;
  }

  if (length % 2 === 1) {
    node = node.next;
  }

  while (node) {
    if (node.val !== stack.pop()) {
      return false;
    }
    node = node.next;
  }
  // since we only put half the items on the stack it shouldn't be possible
  // for there to be anything left in the stack so it should always be empty
  // as such this check isn't really necessary and this could just be return true
  return stack.length === 0;
}

//2.7 given two singly linked lists deterrmine of the lists intersect. return the intersecting node. note intersection is defined based on ref and not value. if the kth element of the 1st list is the same by ref as the jth of the second, the lists intersect

/**
 * Find out the length of the two lists first. If they intersect at some point
 * then the length of their tails will be the same and any difference in length
 * must be from before they intersect. If the lists are different lengths then
 * skip the difference in the longer list. Walk through both lists in step until
 * a node that is the same in both lists is found or the end of one of the lists
 * is reached.
 *
 * N = max(|list1|, |list2|)
 * Time: O(N)
 * Additional space: O(1)
 */
export function doIntersect(list1, list2) {
  let len1 = getLength(list1),
    len2 = getLength(list2);

  list1 = skip(list1, len1 - len2);
  list2 = skip(list2, len2 - len1);

  let node1 = list1,
    node2 = list2;
  while (node1 && node2) {
    if (node1 === node2) {
      return node1;
    }
    node1 = node1.next;
    node2 = node2.next;
  }

  return undefined;
}

function skip(list, num) {
  while (num > 0) {
    list = list.next;
    --num;
  }
  return list;
}

// 2.8 Loop detection. Given a linked list which might contain a loop, implement an algo that erturns the node at the beginning og the loop if one exists
/**
 * This algorithm simply stores each node it sees into a Set structure, if there
 * is a cycle then the first repeat we see will be the start of that cycle and
 * the value we should return.
 *
 * N = |list|
 * Time: O(N) - assumes Set is hashmap based so O(1) costs
 * Additional space: O(N)
 */
export function findStartOfLoopSet(list) {
  let visited = new Set(),
    node = list;

  while (node) {
    if (visited.has(node)) {
      return node;
    }
    visited.add(node);
    node = node.next;
  }

  return null;
}

/**
 * This algorithm uses the runners principle where we have a slow and fast (2x)
 * runners that both traverse the list. If at some point both runners point to
 * the same node then there is a cycle. Due to the different rate at which they
 * travel they will meet k steps 'before' the start of the cycle so if you reset
 * the slow runner back to the start and leave the faster runner at the meeting
 * point, when they start moving forward again they will eventually meet at the
 * start of the cycle.
 *
 * N = |list|
 * Time: O(N)
 * Additional space: O(1)
 */
export function findStartOfLoop(list) {
  if (!list) {
    return null;
  }

  let slow = list,
    fast = list;

  while (slow.next && fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast === slow) {
      break;
    }
  }

  if (!slow || slow !== fast) {
    // no loop
    return null;
  }

  slow = list;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return fast;
}
