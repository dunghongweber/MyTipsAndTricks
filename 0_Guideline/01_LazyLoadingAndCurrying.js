/**
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
