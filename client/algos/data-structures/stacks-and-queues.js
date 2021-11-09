/**
 * TripleStack class holds 3 stacks in one array. This is done by interleaving
 * the values from the 3 indexes, so the first items are at 0, 1 and 2 and
 * subsequent items are every 3 places from those. This class takes advantage
 * of the fact that JavaScript arrays are dynamic and doesn't hold the stacks
 * to any size. It doesn't reduce the size of the underlying array when items
 * are popped but that could easily be added.
 *
 * Time: push O(1), pop O(1), peek O(1)
 * Additional space: push O(1), pop O(1), peek O(1)
 */
export class TripleStack {
  constructor() {
    this._array = [];
    this._lengths = [0, 0, 0];
  }

  _getLength(stack) {
    return this._lengths[stack - 1];
  }

  push(stack, value) {
    let idx = this._getLength(stack) * 3 + stack - 1;
    this._array[idx] = value;
    ++this._lengths[stack - 1];
  }

  pop(stack) {
    let length = this._getLength(stack),
      value;
    if (length > 0) {
      let idx = (length - 1) * 3 + stack - 1;
      value = this._array[idx];
      this._array[idx] = undefined;
      --this._lengths[stack - 1];
    }
    return value;
  }

  peek(stack) {
    let length = this._getLength(stack),
      value;
    if (length > 0) {
      let idx = (length - 1) * 3 + stack - 1;
      value = this._array[idx];
    }
    return value;
  }

  isEmpty(stack) {
    return this._getLength(stack) === 0;
  }
}

// 3.2 how would you design a stack, whcih in addition to push and pop, has a function which returns the min element? Push, pop, and min should operate in o(1) time

/**
 * MinStack maintains a current stack minimum by putting an object on the stack
 * that holds the value and the minimum at that time rather than just the value.
 * When items are popped the value is returned without the wrapping object. When
 * minimum is called we return the min property of the wrapping object.
 *
 * Time: push O(1), pop O(1), peek O(1), min O(1)
 * Additional space: push O(N), pop O(1), peek O(1), min O(1)
 * Additional space required in push to create wrapping object to hold min at
 * that point.
 */
export class MinStack {
  constructor() {
    this._stack = [];
  }

  push(value) {
    let min = this.min();
    this._stack.push({
      value: value,
      min: Math.min(min !== undefined ? min : Number.POSITIVE_INFINITY, value),
    });
  }

  pop() {
    if (!this.isEmpty()) {
      let item = this._stack.pop();
      return item.value;
    }
  }

  peek() {
    if (!this.isEmpty()) {
      let item = this._stack[this._stack.length - 1];
      return item.value;
    }
  }

  min() {
    if (!this.isEmpty()) {
      let item = this._stack[this._stack.length - 1];
      return item.min;
    }
  }

  isEmpty() {
    return this._stack.length === 0;
  }
}

// 3.3 stack of plates. implement a data structure that creates a new stack once the previous one exceeds capacity
/**
 * StackOfStacks uses multiple smaller stacks to hold values. New stacks are
 * created or dropped as required. popAt allows for an item to be popped from
 * any stack, when that occurs items from subsequent stacks are taken and moved
 * forward in the list of stacks so that there are no gaps.
 *
 * N = total number of items
 * M = size of smaller stack
 * Time: push O(1), pop O(1), popAt O(N)
 * Additional space: push O(1), pop O(1), popAt O(M)
 */
export class StackOfStacks {
  constructor(maxSize) {
    if (arguments.length < 1) {
      throw new Error("maxSize argument is required");
    }
    this.stacks = [[]];
    this.max = maxSize;
  }

  push(value) {
    if (this.stacks[this.stacks.length - 1].length >= this.max) {
      this.stacks.push([]);
    }
    this.stacks[this.stacks.length - 1].push(value);
  }

  pop() {
    let value = this.stacks[this.stacks.length - 1].pop();
    if (
      this.stacks.length > 1 &&
      this.stacks[this.stacks.length - 1].length === 0
    ) {
      this.stacks.pop();
    }
    return value;
  }

  popAt(number) {
    if (number < 1 || number > this.stacks.length) {
      throw new Error("stack number is invalid");
    }
    if (number === this.stacks.length) {
      return this.pop();
    }

    let stack = this.stacks[number - 1],
      value = stack.pop(),
      tempStack = [],
      nextStack;
    // move items from subsequent stacks forward to fill the gap
    if (number < this.stacks.length) {
      for (let i = number; i < this.stacks.length; ++i) {
        nextStack = this.stacks[i];
        // reverse next stack - we could actually use other operators in
        // JavaScript like shift or reverse to do this simpler but that would
        // be cheating
        while (nextStack.length > 0) {
          tempStack.push(nextStack.pop());
        }
        stack.push(tempStack.pop());
        while (tempStack.length > 0) {
          nextStack.push(tempStack.pop());
        }
        stack = nextStack;
      }
    }
    // drop any empty stacks at the end beyond the first one
    if (
      this.stacks.length > 1 &&
      this.stacks[this.stacks.length - 1].length === 0
    ) {
      this.stacks.pop();
    }

    return value;
  }
}

// 3.4 queue via stacks. implement a MyQueue class which implements a queue via stacks\
class MyQueue {
  constructor() {
    this.in = [];
    this.out = [];
  }
  push(val) {
    this.in.push(val);
    this.out.push(this.in.pop());
  }
  pop() {
    return this.out.pop();
  }
}
/**
 * Queues and Stacks have different orders for extracting items. To create a
 * queue with stacks we have two stacks, one for inserting items and one for
 * extracting them. When dequeuing an item if the extract stack is empty we
 * use queue operations to pop all the items off the insert stack onto the
 * extract stack which will now be in the right order for a queue.
 *
 * N = |MyQueue|
 * Time: enqueue O(1), dequeue O(N)
 * Additional space: O(N) - to hold the input items
 */
export class MyQueue {
  constructor() {
    this.eStack = [];
    this.dStack = [];
  }

  enqueue(value) {
    this.eStack.push(value);
  }

  dequeue() {
    if (this.dStack.length === 0 && this.eStack.length === 0) {
      throw new Error("queue is empty");
    }
    if (this.dStack.length === 0) {
      while (this.eStack.length > 0) {
        this.dStack.push(this.eStack.pop());
      }
    }
    return this.dStack.pop();
  }
}

// 3.5 sort stack. write a program to sort a stack such that the smallest items are on top. you can use an additional temp structure, but you may not copy the elements into any other data structure, such as an array
/**
 * Sort the stack by taking one item off the input stack at a time, find the
 * right place within the processed items in the temp stack to insert it into.
 * Insertion is done by holding the next value aside and moving the temp stack
 * values into the input stack until the right spot is found.
 *
 * N = |stack|
 * Time: O(N^2)
 * Additional space: O(1) - while there are 2 stacks there are only a fixed
 * number of items.
 */
export function sortStack(stack) {
  let temp = [];
  temp.push(stack.pop());
  while (!isEmpty(stack)) {
    let curr = stack.pop(),
      count = 0;

    while (!isEmpty(temp) && curr < peek(temp)) {
      stack.push(temp.pop());
      ++count;
    }
    temp.push(curr);
    for (let i = 0; i < count; ++i) {
      temp.push(stack.pop());
    }
  }

  while (!isEmpty(temp)) {
    stack.push(temp.pop());
  }

  return stack;
}

function peek(stack) {
  return stack[stack.length - 1];
}

function isEmpty(stack) {
  return stack.length === 0;
}
