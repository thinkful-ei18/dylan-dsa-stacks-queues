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
  for (let i = 0; i < str.length / 2; i++) {
    if (stack.pop() !== str[i]) return false;
  }
  return true;
}

// console.log(isPalindrome('theht'));

function isMatched(str) {
  let stack = new Stack();
  let validOpenChars = { '(': true, '{': true, '[': true };
  const validClosedChars = { ')': '(', '}': '{', ']': '[' };
  const inQuotes = { '"': false, "'": false };

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '"' || str[i] === "'") {
      str[i] === '"'
        ? (inQuotes['"'] = !inQuotes['"'])
        : (inQuotes["'"] = !inQuotes["'"]);
      continue;
    } else if (inQuotes['"'] || inQuotes["'"]) {
      continue;
    }

    if (validOpenChars[str[i]]) {
      stack.push(str[i]);
    } else if (validClosedChars[str[i]]) {
      let compare = stack.pop();
      if (validClosedChars[str[i]] !== compare) return `False at index ${i}`;
    } 
    // else {
    //   return 'Invalid input string';
    // }
  }

  return inQuotes['"'] || inQuotes["'"]
    ? "False you didn't close your string"
    : 'True';
}

console.log(isMatched('(3 + 5) + (2 + 1)'));

// function sort(stack) {
//   let prevMax = Number.POSITIVE_INFINITY;
//   let max = Number.NEGATIVE_INFINITY;
//   let result = new Stack();
//   while (max !== prevMax) {
//     let temp = stack;
//     while (temp.top) {
//       console.log(temp);
//       let candidate = temp.pop();
//       max = candidate > max && candidate < prevMax ? candidate : max;
//     }
//     prevMax = max;
//     result.push(max);
//     max = Number.NEGATIVE_INFINITY;
//   }
//   return result;
// }

function sort(stack) {
  let temp = new Stack();
  while (stack.top) {
    let val = stack.pop();
    while (temp.top && peek(temp) > val) {
      stack.push(temp.pop());
    }
    temp.push(val);
  }
  return temp;
}

let stack = new Stack();
stack.push(0);
stack.push(4);
stack.push(2);

console.log(display(sort(stack)));
