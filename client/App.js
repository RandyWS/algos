import React from "react";

const App = () => {
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

  let nodeA = new ListNode(7);
  let nodeB = new ListNode(1);
  nodeA.next = nodeB;

  let nodeC = new ListNode(7);
  nodeB.next = nodeC;

  let list1 = new LinkedList(nodeA);

  let nodeAA = new ListNode(5);
  let nodeBB = new ListNode(5);
  nodeAA.next = nodeBB;

  let nodeCC = new ListNode(5);
  nodeBB.next = nodeCC;

  let list2 = new LinkedList(nodeAA);

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

  return <div></div>;
};

export default App;
