// https://flaviocopes.com/how-to-cut-array-half-javascript/

const list = [1, 2, 3, 4, 5, 6]
const half = Math.ceil(list.length / 2);    

const firstHalf = list.slice(0, half)
const secondHalf = list.slice(half)
