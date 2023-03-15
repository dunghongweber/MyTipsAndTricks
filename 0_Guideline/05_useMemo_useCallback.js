/***********
  USEMEMO, when to use:
  
  1. When you need to compute an array or object
  2. When perform expensive operation
*/
const total = useMemo(() => {
  costs.reduce((acc, curr) => acc _ current, 0)
}, [costs])
//or
const sortedPeople = useMemo(() => {
  [...people].sort()
}, [people])
