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

  return <div></div>;
};

export default App;
