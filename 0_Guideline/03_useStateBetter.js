/*
  1. Whenever updating a state in React, try to use functional update instead of setting state
  2. Make sure to declare initial state type to prevent crashing, add optional chaining to double check
*****/
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
  const [user, setUser] = useState({age: 1, name: "Bob"})
  
  
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
      todo.name = value
      return newTodos
    })
  }

  //to modify property of object state
  const modifyName = () => {
    setUser(prevUser => ({...prevUser, name: "Kim"}))
  }
  
   /*******
    for Form with multiple Input fields, assign unique name to each input field
    then make a state of an object with multiple properties storing all those fields data
    and just write 1 update function
  */

  const [formData, setFormData] = useState({username: '', password: '', age: ''})
  // dynamic update function
  const updateFormData = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
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

  /*******
    at 12:55
    https://www.youtube.com/watch?v=Fhu5cu864ag 
    React deprived state
    happens when you get an element from array (in a state) then store that element inside another state
    when the array state update, the state that store the selected element won't. You can use useEffect to resolve this

    But the BEST way to make sure a data piece is updated is to store in a const 
    and use a state to store the selectId instead of the whole selected object
  */
  const [prods, setProds] = useState([{id: 1, quantity: 1, id: 2, quantity: 20}])
  const [prodId, setProdId] = useState(null)
  const selectedProd = prods.find(p => p.id ==== prodId)
  //the above code will give out updated selectProd (with quantity increased) 
  //when this bellow updateProds is called somewhere
  const updateProds = (id) => {
    setProds(prev => {
      return prev.map(p => {
        if(p.id === id) return ({...p, quantity: p.quantity + 1})
        return p
      })
    })
  }
  
  return (<SomeUI />)
}

export default MyPage


