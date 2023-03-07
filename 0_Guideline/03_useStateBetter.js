/******/
//
import React, {useState} from 'react'

const Parent = () => {
  const initialList = [
    {
      id: 1,
      complete: false,
      name: "A"
    },
    {
      id: 2,
      complete: false,
      name: "B"
    },
    {
      id: 3,
      complete: false,
      name: "C"
    }
  ]
  
  return (<MyPage defaultList={initialList} />)
}

//default value when dealing with array
const MyPage = ({defaultList = []}) => {
  
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState(defaultList)
  
  
  //use current state when setting state
  function assignCount() {
    setCount(currentVal => currentVal = 5)
  }
  
  //modify array of objects using map, simple
  function handleChangeName = (id, value) => {
    const newTodos = todos.map(item => {
      //find item using id and make change
      if(item.id === id){
        return {...item, name: value}
      }
      //or just return item
      return item
    })
    
    setTodos(currentTodos => currentTodos = newTodos)
  }
  //modify array of objects using map, advanced
  function updateName(id, value) {
    setTodos(prevTodos => {
      const newTodos = [...prevTodos]
      const todo = newTodos.find(item => item.id === id)
      user.name = value
      return newTodos
    })
  }
  
  
  /**
    READ: https://blog.webdevsimplified.com/2019-11/never-store-derived-state/
    WORKING WITH FIND for latest state array DERIVED-STATE
    1. use useState to store id
    2. then create a new variable to perform calculation to get latest todos array
    
    DO NOT DO
    const [selectedTodo, setSelectedTodo] = useState()
    
    const handleSelectTodo = (id) => {
      //this is using a DERIVED/OLD state of todos
      setSelectedTodo(todos.find(item => todo.id === selectedId))
    } 
  */
  const [selectedId, setSelectedId] = useState(0)
  const selectedTodo = todos.find(item => todo.id === selectedId)
  //advanced way, use useMemo
  const selectedTodo = useMemo(() => {
    return todos.find(item => item.id === setSelectedId)
  }, [todos, selectedId])
  
  
  return (<SomeUI />)
}

export default MyPage

