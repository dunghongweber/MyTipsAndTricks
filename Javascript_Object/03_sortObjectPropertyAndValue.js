/**
  https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
*/
let maxSpeed = {
    car: 300, 
    bike: 60, 
    motorbike: 200, 
    airplane: 1000,
    helicopter: 400, 
    rocket: 8 * 60 * 60
};
let sortable = [];
//push key & value to an array [key, value]
for (var vehicle in maxSpeed) {
    sortable.push([vehicle, maxSpeed[vehicle]]);
}
//sort that array, a[1] b[1] because we want to compare the values, not the keys
sortable.sort(function(a, b) {
    return a[1] - b[1];
});
/**
  code above will return an array:
  [
    ["bike", 60], ["motorbike", 200], ["car", 300],
    ["helicopter", 400], ["airplane", 1000], ["rocket", 28800]
  ]
*/
//then create a new object by pushing those elements of the above array
let objSorted = {}
sortable.forEach(function(item){
    objSorted[item[0]]=item[1]
})

/**
  But for ES8, we can use Object.entries() function to transform object to array
  then use reduce to tranform array to object
*/
const maxSpeed = {
    car: 300, 
    bike: 60, 
    motorbike: 200, 
    airplane: 1000,
    helicopter: 400, 
    rocket: 8 * 60 * 60
};

const sortable = Object.entries(maxSpeed)             //convert object keys & values to array
    .sort(([,a],[,b]) => a-b)                         //sort those array element by the value (the 2nd element of the array)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});   //use reduce to tranform the sorted array back to the object

/**
  For ES10 use Object.fromEntries to transform our sortedArray back to object
  this is the best case but we need to understand how all of these work
*/
const maxSpeed = {
    car: 300, 
    bike: 60, 
    motorbike: 200, 
    airplane: 1000,
    helicopter: 400, 
    rocket: 8 * 60 * 60
};
const sortable = Object.fromEntries(
    Object.entries(maxSpeed).sort(([,a],[,b]) => a-b)
);
