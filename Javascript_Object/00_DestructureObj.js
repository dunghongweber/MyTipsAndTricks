//simple
const person = {name: "Sarah", country: "Nigeria", job: "Developer"};
const {name, country, job} = person;

/************************************************
  Computed Property Name
  Computed property name is another object literal feature that also works for destructuring. 
    You can specify the name of a property via an expression if you put it in square brackets.
*/
let property = "job";
let {[property] : foo} = {name: "Sarah", country: "Nigeria", job: "Developer"};

console.log(foo);//"Developer"

/************************************************
  Nesting in Object Destructuring
    Objects can also be nested when destructuring
*/
let person = {
    name: "Sarah",
    place: {
        country: "Nigeria", 
        city: "Lagos" }, 
    friends : ["Annie", "Becky"]
};

let {name:foo,
     place: {
         country : bar,
         city : x}
    } = person;

console.log(foo);//"Sarah"
console.log(bar);//"Nigeria"
