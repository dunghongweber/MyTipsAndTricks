const squads = [
  { name: "Alpha", members: 5, rank: 2, specialized: "asault" },
  { name: "Bravo", members: 6, rank: 3, specialized: "vanguard" },
  { name: "Charlie", members: 5, rank: 2, specialized: "vanguard" },
  { name: "Delta", members: 6, rank: 3, specialized: "security" },
  { name: "Echo", members: 7, rank: 1, specialized: "command" },
  { name: "Foxtrox", members: 5, rank: 4, specialized: "asault" },
];

/***********************
  FOREACH
*/
squads.forEach((item, index) => console.log(`${item.name} - ${item.age} ${index}`));

/***********************
  FILTER
*/
const filterArrow = squads.filter((item) => item.rank > 2);

/***********************
  MAP
*/
squads.map(item => {
  if(item.members > 5){
    return {...item, captain: true}
  }
  
  return item
})

/***********************
  SORT
*/
//ascending
squads.sort((a, b) => (a.rank > b.rank ? -1 : 1));

//for number array, we can do the following syntax for increasement
//swab b - a for decreasement
const sortedCod = squads.sort((a, b) => a - b);

/***********************
  EVERY
  return true/false if condition is met
  break out of forEach loop using Every
*/
const existRank4 = squad.every(item => {
  if(item.rank > 3){
    return true
  }
  return false
})


/***********************
  REDUCE
  executes a "reducer" callback function on each element of the array, in order,
  passing in the return value from the Calculation on the preceding element.
  the final result of running the reducer across all elements of the array is a single value
 
  return a single value
  run a "reducer" callback function on each element and perform some calculation
  with both the current element and the value of previous calculation (total) by performing calculation of callback function
  then store the end value in a final result.
*/
const reduceSquadMembers = squads.reduce((totalMem, currentSquad) => {
  return totalMem + currentSquad.members;
}, 0);
//total is just a result of previous calculation
//initial value can be array or number or anything
//as long as the callback function can perform correct calculation base on initial value and total
const newAges = squads.reduce((myArray, squad) => myArray.concat(`rank: ${squad.rank}`), []);


/***********************
  Combine and Chain functions
*/
const combined = coordinates
  .map((c) => c * 2)
  .sort((a, b) => a - b)
  .filter((x) => x <= 100)
  .reduce((total, e) => total + e, 0);

