/*
  https://stackoverflow.com/questions/32374976/converting-array-to-linked-list-from-eloquent-javascript
*/
//Linked List definition function
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}
//array of nodes
let input = [1, 2, 3]
//reverse the nodes to start from the end to the top node
let head = input.reverse().reduce((acc, curr) => {
  if (acc == null) {
    //bottom node got val = curr and next = null
    acc = new ListNode(curr);
  } else {
    //next node before it will contain val = curr and next is the already created node of linked list
    acc = new ListNode(curr, acc);
  }
  //return acc as basic behavior of reduce function
  return acc;
}, null);
