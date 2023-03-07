/***********
  Instead of using Container and Element for smart component (logic) and dumb component (UI)
  We can extract the states and functions (logic) into a customHook
  
  1. Single Responsibility Principle
  Break code into smaller components when possible
  Whenever there is useState and useEffect, move it into a customHook if possible
  
  2. Dependency Inversion Principle
  create a onSubmit function at a parent component
  pass it as a prop to a child component (Form)
  so now Form can be used anywhere and we can create a bunch of parent components with different onSubmit for each usage
  
*/
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  
  const fetchProduct = async () => {
    const response = axios.get('url.com')
    
    if(response && response.data) setProducts(response.data)
  }
    
  useEffect(() => {
    fetchProduct()
  }, [])
  
  const otherCalculation = () => {
    console.log('Do something else')
  }
  
  //return states and functions for the component
  return {products, otherCalculation}
  
}
