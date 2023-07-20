//Interface and Props type
//create them in an Interface folder for each main component
//then export and share among the children
export interface IProject {
  name: string
  link: string
  description: string
}

export type PropCard = {
  name: string
  link: string
  description: string
}

//USE Interface and Props
//import and declare it in ReactTS
import React from 'react'
import { PropCard } from '../interfaces/interfaces'

const ComponentCard: React.FC<PropCard> = ({ name, link, description }) => {
  return (
    <div style={{ width: '18rem' }}>
    </div>
  )
}
export default ComponentCard
