/*******************
  Lazy Loading and Async Import
  work with Next.js and Create-React-App for importing code and component
*/
import {helpFunction} from './helpers' //instead of this
function Page() {
  //do this instead to import code asynchronously
  const hello = async () => {
    const {helpFunction} = await import('./helpers')
    return helpFunction
  }
}

//with React component
const Button = React.lazy(() => import('/Button')) //lazy loading a component
function Page() {
  return (
    //wrap it in Suspense and provide a fallback UI when the component is loading
    <Suspense fallback={<div>Loading...</div>}>
      <Button />
    </Suspense>
  )
}

/*******************
  Currying for better code look
*/
//instead of
const handleChange = (e, id) => {
    console.log({e, id})
}
<input onChange={(e) => handleChange(e, id)} /> 

//we can use Currying by creating a function that return another function
//outer function takes custom argument
//inner function handle the event
const handleChange = (id) => {
  return (e) => {
    console.log({e, id})
  }
}
<input onChange={handleChange(id)} /> 
