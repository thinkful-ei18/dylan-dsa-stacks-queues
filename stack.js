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
    // if (!this.top) return null;
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
      stack.push({ character: str[i], location: i });
    } else if (validClosedChars[str[i]]) {
      let compare = stack.top ? stack.pop() : undefined;
      if (
        compare === undefined ||
        validClosedChars[str[i]] !== compare.character
      )
        return `False at index ${i}`;
    }
    // else {
    //   return 'Invalid input string';
    // }
  }
  if (stack.top)
    return `Opening ${stack.top.value.character} at ${
      stack.top.value.location
    } that was never closed`;

  return inQuotes['"'] || inQuotes["'"]
    ? "False you didn't close your string"
    : 'True';
}

// console.log(isMatched('(((3 + 5)(((( + (2 + 1)())'));

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

// console.log(display(sort(stack)));

class _QueueNode {
  constructor(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(value) {
    let node = new _QueueNode(value);
    if (this.head === null) {
      this.head = node;
    }
    if (this.tail) {
      node.next = this.tail;
      this.tail.prev = node;
    }
    this.tail = node;
  }

  dequeue() {
    if (this.head === null) return null;
    let returnNode = this.head;
    this.head = returnNode.prev;

    if (returnNode === this.tail) {
      this.tail === null;
    }
    return returnNode.value;
  }
}

function qPeek(q) {
  return q.head.value;
}

function qDisplay(q) {
  let result = q.head.value;
  let tempNode = q.head;
  while (tempNode !== q.tail) {
    tempNode = tempNode.prev;
    result = tempNode.value + ', ' + result;
  }
  return result;
}

class StackQueue {
  constructor() {
    this.stack1 = new Stack();
    this.stack2 = new Stack();
  }

  enqueue(value) {
    this.stack1.push(value);
  }

  dequeue() {
    if (!this.stack1.top && !this.stack2.top) return null;
    if (!this.stack2.top) {
      while (this.stack1.top) {
        let temp = this.stack1.pop();
        this.stack2.push(temp);
      }
    }
    return this.stack2.pop();
  }
}

function mainQ() {
  const queue = new Queue();
  queue.enqueue('Kirk');
  queue.enqueue('Spock');
  queue.enqueue('Uhura');
  queue.enqueue('Sulu');
  queue.enqueue('Checkov');
  console.log(qDisplay(queue));
  queue.dequeue();
  queue.dequeue();
  console.log(qDisplay(queue));
  const stackQueue = new StackQueue();
  stackQueue.enqueue('Kirk');
  stackQueue.enqueue('Spock');
  stackQueue.enqueue('Uhura');
  stackQueue.enqueue('Sulu');
  stackQueue.enqueue('Checkov');
  console.log(JSON.stringify(stackQueue));
  console.log(stackQueue.dequeue());
  stackQueue.enqueue('Checkov');
  console.log(stackQueue.dequeue());
  console.log(JSON.stringify(stackQueue));
}

// mainQ();

function squareDance(q) {
  const spares = new Queue();
  let result = '';
  let person, male, female, gender;
  let counter = 0;

  while (q.head) {
    person = q.dequeue();
    if (spares.head && person.gender !== qPeek(spares).gender) {
      male = person.gender === 'male' ? person : qPeek(spares);
      female = person.gender === 'female' ? person : qPeek(spares);
      result += `Female Dancer is: ${female.name} and the Male Dancer is ${male.name} \n`;
      spares.dequeue();
    } else if (q.head && person.gender !== qPeek(q).gender) {
      male = person.gender === 'male' ? person : qPeek(q);
      female = person.gender === 'female' ? person : qPeek(q);
      result += `Female Dancer is: ${female.name} and the Male Dancer is ${male.name} \n`;
      q.dequeue();
    } else {
      spares.enqueue(person);
    }
  }

  while (spares.head) {
    gender =spares.dequeue().gender;
    counter++;
  }

  result += `There are ${counter} ${gender} dancers waiting to dance`;
  return result;
}

// let dancers = new Queue();
// dancers.enqueue('F Jane');
// dancers.enqueue('M Frank');
// dancers.enqueue('M Sherlock');
// dancers.enqueue('F Madonna');
// dancers.enqueue('M David');
// dancers.enqueue('M Christopher');
// dancers.enqueue('F Beyonce');
// // console.log(qDisplay(dancers));
// console.log(squareDance(dancers));


const DANCERS = [
  { name: 'Gwendolyn Wilderman', gender: 'female' },
  { name: 'Wilbur Brakus', gender: 'male' },
  { name: 'Vallie Howell', gender: 'female' },
  { name: 'Nova Doyle', gender: 'female' },
  { name: 'Monica Turcotte', gender: 'female' },
  { name: 'Corine Smith', gender: 'female' },
  { name: 'Jamir Sporer', gender: 'male' }
];

const customerId = [1, 2, 3, 4, 5, 6, 7, 8];

function populateQueue(queue, data) {
  for (let datum of data) {
    queue.enqueue(datum);
  }
}

// const dancers = new Queue();
// populateQueue(dancers, DANCERS);
// console.log(squareDance(dancers));


function ophidianBank(q) {
  let counter = 0;
  while(counter < 25) {
    q.enqueue(Math.floor(Math.random() * 100) + 8);
    let person = q.dequeue();
    if (Math.random() < .25) {
      q.enqueue(person);
    }
    console.log(qDisplay(q));
    counter++;
  }
  
}

const customers = new Queue();
populateQueue(customers, customerId);
ophidianBank(customers);