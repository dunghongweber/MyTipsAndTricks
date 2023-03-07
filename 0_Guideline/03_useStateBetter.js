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
  
  //modify array of objects using map
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
  
  //WORKING WITH FIND for up to date state array
  //useState to store id, then create a new variable to perform calculation to get latest todos array
  /**
    DO NOT DO
    const [selectedTodo, setSelectedTodo] = useState()
    
    const handleSelectTodo = (id) => {
      //this is using a DEPRIVED/OLD state of todos
      setSelectedTodo(todos.find(item => todo.id === selectedId))
    } 
  */
  const [selectedId, setSelectedId] = useState(0)
  const selectedTodo = todos.find(item => todo.id === selectedId)
  
  
  return (<SomeUI />)
}

export default MyPage


