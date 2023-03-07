/********************
  1. Only NESTED Components in 3 layers
  2. Use GRID before FLEX, use FLEX only for the very last layer or basic component
  3. DO NOT use redundant <div> but use <></> or <React.Fragment></React.Fragment>
  4. for Props Drilling: use useContext before using Redux. However, useContext makes component un-reusable
*/

/********************
  5. When create a component, create a directory/folder name of that component.
  then create a JS file with the regular name of that component MyComponent.js
  then create a index.js file to export your component 
*/
export {default} from './MyComponent'

/********************
  DO NOT return NULL, use conditional check
*/
{loading && <Header />}
//check for specific condition with array
{items.length > 1 && <Item />}

/********************
  useMemo when calculation is BEFORE rendering
*/
const createDate = useMemo(() => {
 return moment(data.createAt)
}, [data.createAt])
 
export default myComponent = () => {
  return(<div>Create At: {createDate}</div>)
}
 
 /********************
  useMemo for heavy calculation or checking condition once only when rendering component
*/
 //do not do
 {item && item.name && item.name === 'A' && item.age === 12 && (<Header />)}
 //instead, do:
 const checkCondition = useMemo(() => {
   return item && item.name && item.name === 'A' && item.age === 12
 }, [item.name, item.age])
 {checkCondition && (<Header />)}


/********************
  DO NOT use <img>, use <div> with background-image instead for easier styling
*/
 export const ImageProduct = styled.div`
    background-image: url(${(props) => props.picture});
    background-repeat: none;
    background-size: contain;
    
    padding-top: 100%; //to make this a square
 `
 
/********************
  AVOID height
*/
 export const Button = styled(AntButton)`
    //do not use
    height: 30px;
    
    //but USE
    padding: 0.5rem 0; 
 `
 
 /********************
  USE switch statement
*/
 const displaySomething = (input) => {
    switch (input) {
      case 'condition 1': 
        //Do something
        break
      case 2:
        return A //use return to bypass break
      default
        //return or do default
        break
    }
 }

