/**
  https://www.freecodecamp.org/news/using-typescript-in-react-apps/
*/
import React, { Dispatch, SetStateActionl, useState, useEffect, useRef } from 'react'

//using Dispatch and SetStateAction
interface IDummyProps {
  number: number
  setNumber: Dispatch<SetStateAction<number>>
} 

const DummyComponent:React.FC<IDummyProps> = ({ number, setNumber }) => {

  //useState with TypeScript
  const [number, setNumber] = useState<>(0) //no type defined
  const [number, setNumber] = useState<number>(0)

  //useRef with TypeScript
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.focus()
  }, [])

  return (
    <>
      <input type="text" ref={ref} />
      <div>{number}</div>
      <button
        onClick={() => setNumber(prev => prev+1)}
      >
        ADD
      </button>
    </>
  )

}

export default DummyComponent
