/**
  READ: 
  https://www.w3schools.com/js/js_array_methods.asp
  
  EXERCISE:
  https://www.w3resource.com/javascript-exercises/javascript-array-exercises.php
  https://www.tutorialsandyou.com/javascript/javascript-array-exercises-practice-and-solution-15.html
*/

/************
  FIND
*/
const array1 = [5, 12, 8, 130, 44];
const found = array1.find(element => element > 10);
console.log(found);
// expected output: 12

/************
  AT
*/
const array1 = [5, 12, 8, 130, 44];

let index = 2;
console.log(`Using an index of ${index} the item returned is ${array1.at(index)}`);
// expected output: "Using an index of 2 the item returned is 8"


index = -2;
console.log(`Using an index of ${index} item returned is ${array1.at(index)}`);
// expected output: "Using an index of -2 item returned is 130"


/************
  FINDINDEX
*/
const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// expected output: 3
