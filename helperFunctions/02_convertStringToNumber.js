/*
    1. using the Number() function
    2. using the parseInt() function
    3. using the parseFloat() function
    4. using the unary plus operator (+)
    5. multiplying the string by the number 1
    6. dividing the string by the number 1
    7. subtracting the number 0 from the string
    8. using the bitwise NOT operator (~)
    9. using the Math.floor() function
    10. using the Math.ceil() function
    11. using the Math.round() function
*/
// parseInt : convert to integer
const quantity = "12";
parseInt(quantity, 10)
// parseFloat: convert to float, number with decimals
const quantity = "12.99";
parseFloat(quantity)
// plus operator: work both for integer and float number
const quantity = ["12", "12.99"]
+quantity[0]
+quantity[1]
// by multiply string to a number 1: work both for integer and float number
const quantity = ["12", "10.5"]
quantity[0] * 1
quantity[1] * 1
// by subtract string to a number 1: work both for integer and float number
const quantity = ["12", "10.5"]
quantity[0] - 1
quantity[1] - 1
// using bitwise NOT operator
const quantity = "awesome";
console.log(~~quantity); //expect 0
