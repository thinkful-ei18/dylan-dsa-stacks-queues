'use strict';

class _StackNode {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  push(value) {
    if (!this.top) {
      this.top = new _StackNode(value, null);
      return;
    }
    this.top = new _StackNode(value, this.top);
  }

  pop() {
    if (!this.top) return null;
    let pop = this.top;
    this.top = this.top.next;
    return pop.value;
  }
}
module.exports = Stack;

function peek(stack) {
  return stack.top.value;
}

function display(stack) {
  let tempNode = stack.top;
  let result = peek(stack);
  while (tempNode.next) {
    tempNode = tempNode.next;
    result = tempNode.value + ', ' + result;
  }
  return result;
}

function main() {
  let starTrek = new Stack();
  starTrek.push('Kirk');
  starTrek.push('Spock');
  starTrek.push('McCoy');
  starTrek.push('Scotty');
  console.log(peek(starTrek));
  console.log(display(starTrek));
  // console.log(JSON.stringify(starTrek, null, 4));
}
// main();

function isPalindrome(str) {
  str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  let stack = new Stack();
  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);
  }
  for (let i = 0; i < str.length; i++) {
    if (stack.pop() !== str[i]) return false;
  }
  return true;
}

console.log(isPalindrome('theht'));