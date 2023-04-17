//makes the first letter uppercase, then appends the rest of the string.
const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

//add or remove Math.round if needed
const calculatePercent = (value, total) => Math.round((value / total) * 100)
//toFixed() returns a string value
const calculatePercent = (value, total) => {
  const percent = (value / total) * 100
  return isNaN(percent) ? 0 : percent.toFixed(2)
}

//get random item from array (items)
const getRandomItem = (items) =>  items[Math.floor(Math.random() * items.length)];

//remove duplicate for simple array
const removeDuplicates = (arr) => [...new Set(arr)];

//sort array by object property (key)
//uses the native sort method, compares the elements in the array based off of the provided key
//and sorts the array in ascending order.
const sortBy = (arr, key) => arr.sort((a, b) => a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0);

const lessons = [{ position: 1, name: "Intro" }, { position: 0, name: "Basics" }];
sortBy(lessons, 'position'); 

//check Arrays/Objects are equal
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

isEqual([1, '2'], [1, 2]); // false
isEqual([1, 2], [1, 2]); // true

//count number of occurences (frequency)
const countOccurrences = (arr, value) => arr.reduce((a, v) => (v === value ? a + 1 : a), 0);

//wait for certain amount of time
const wait = async (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

wait(2000).then(() => goToSignupPage());

//pluck single property from array of ojects
//It takes an array of objects and a property that each of the objects contains. 
//The function maps over this array and returns an array with only the values of the property that we specified.
const pluck = (objs, key) => objs.map((obj) => obj[key]);

const users = [{ name: "Abe", age: 45 }, { name: "Jennifer", age: 27 }];
pluck(users, 'name'); // ['Abe', 'Jennifer']

//insert element at certain Position
const insert = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index)];

const items = [1, 2, 4, 5];
// insert the number 3 at index 2:
insert(items, 2, 3); // [1, 2, 3, 4, 5]

// format a number with commas as thousands separators
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

