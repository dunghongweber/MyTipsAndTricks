const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 25,
    dob: '08/02/1989',
    active: true
};

// For...in loop
for (const key in user) {

    console.log(`${key}: ${user[key]}`);
}


//Object.keys()
Object.keys(user).forEach((key, index) => {
    console.log(`${key}: ${courses[key]}`);
});


// iterate over object values
Object.values(user).forEach(val => console.log(val));

/**
Object.entries() outputs an array of arrays, with each inner array having two elements. 
The first element being the property and the second element is the value.
*/
const animals = {
    tiger: 1,
    cat: 2,
    monkey: 3
};

const entries = Object.entries(animals);
console.log(entries);
// [ [ 'tiger', 1 ],
//   [ 'cat', 2 ],
//   [ 'monkey', 3 ]

// THEN `for...of` loop
for (const [key, value] of Object.entries(animals)) {
    console.log(`${key}: ${value}`);
}
// OR THEN `forEach()` method
Object.entries(animals).forEach(([key, value]) => {
    console.log(`${key}: ${value}`)
});
