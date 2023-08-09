//declare multiple varibles using Array Destructuring
let [greeting, pronoun] = ["Hello", "I" , "am", "Sarah"];

console.log(greeting);//"Hello"
console.log(pronoun);//"I"

//********************************
//Skipping Items in an Array
let [,pronoun,,name] = ["Hello", "I" , "am", "Sarah"];

console.log(pronoun);//"I"
console.log(name);//"Sarah"

//********************************
//Assigning the rest of an array
let [greeting,...intro] = ["Hello", "I" , "am", "Sarah"];

console.log(greeting);//"Hello"
console.log(intro);//["I", "am", "Sarah"]

//********************************
//Swapping Values using the Destructuring Assignment
let a = 3;
let b = 6;
[a,b] = [b,a];

console.log(a);//6
console.log(b);//3
