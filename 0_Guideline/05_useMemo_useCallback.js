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


/***********
  USECALLBACK, when to use:
  
  1. When you want to keep your callback function to being stale
  2. When you want to retain the referential identity of the callback function
*/
//in Parent Component
const sortFunc = useCallback ((a,b) => ..., [])  //prevent recreate the function everytime Parent Component re-renders

<NameList names={names} sortFunc={sortFunc} />
//in Child Component
 const NameList = ({names, sortFunc}) => {
   //sortFunc won't be recreated every time Parent re-render
    const sortedNames = useMemo(() => {
       [...names].sort(sortFunc)
    },[names, sortFunc])
    
    return (<div>...</div>)
 }
