import { useRef } from 'react'
/**
  using state only if you need to check user input at the same time they are typing
  using REF is when you just need the value at the end and submit to server for validation
  https://www.youtube.com/watch?v=GGo3MVBFr1A
*/

function App () {
  const emailRef = useRef()
  const passwordRef = useRef()
  
  function onSubmit(e) {
    e.preventDefault()
    console.log({email: emailRef.current.value, password:passwordRef.current.value})
  }
  
  return(
    <form>
      <input ref={emailRef} />
      <input ref={passwordRef} />
      <button type='submit'>Submit</button>
    </form>
  )

}
