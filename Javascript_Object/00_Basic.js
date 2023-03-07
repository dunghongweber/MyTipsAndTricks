/*************************
  Accessing properties
*/
const myCar = {
  make: "Ford",
  model: "Mustang",
  year: 1969,
};
// Dot notation
myCar.make = "Ford";
// Bracket notation
myCar["make"] = "Ford";

/*************************
  Deleting properties
*/
delete myCar.year;

/*************************
  SPREAD operation
*/
const pikachu = { name: "Ben" };
const stats = { hp: 40, attack: 50 };
//instead of complicated copy or assign object, 
//we can create new combined object as following:
const lvl_0 = { ...pikachu, ...stats, hp: 20 };

/*************************
  Algorithm with Object
*/
const numArr = [2, 1, 2, 3, 4, 5, 2];
function findDuplicate(arr) {
  let myObject = {};
  let result;
  arr.forEach((e) => {
    if (!myObject[e]) {
      myObject[e] = 1; //create new key
    } else {
      result = e; //set duplicate as result
    }
  });


  return result;
}
