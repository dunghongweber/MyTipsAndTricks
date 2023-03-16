/**
  use Array.includes for multiple criteria
*/
function test(fruit) {
  // extract conditions to array
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (redFruits.includes(fruit)) {
    console.log('red');
  }
}

/**
  return early, don't nest
*/
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (!fruit) throw new Error('No fruit!'); // condition 1: throw error early
  if (!redFruits.includes(fruit)) return; // condition 2: stop when fruit is not red

  console.log('red');

  // condition 3: must be big quantity
  if (quantity > 10) {
    console.log('big quantity');
  }
}

/**
  use default parameters and destructuring
*/
function test(fruit, quantity = 1) { // if quantity not provided, default to one
  if (!fruit) return;
  console.log(`We have ${quantity} ${fruit}!`);
}
function test({name} = {}) {
  console.log (name || 'unknown');
}

/**
  use Object / Map instead of switch.
  or use Array.filter() if possible
*/
const fruitColor = {
    red: ['apple', 'strawberry'],
    yellow: ['banana', 'pineapple'],
    purple: ['grape', 'plum']
  };

function test(color) {
  return fruitColor[color] || [];
}

const fruitColor = new Map()
    .set('red', ['apple', 'strawberry'])
    .set('yellow', ['banana', 'pineapple'])
    .set('purple', ['grape', 'plum']);

function test(color) {
  return fruitColor.get(color) || [];
}

/**
  use Array.some() or Array.every() if needed
*/
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
];
function test() {
  // condition: short way, all fruits must be red
  const isAllRed = fruits.every(f => f.color == 'red'); // false

   // condition: if any fruit is red
  const isAnyRed = fruits.some(f => f.color == 'red'); // true
}
