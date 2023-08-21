/*
  Interface and Props type
  create them in an Interface folder for each main component
  then export and share among the children
*/
export interface IProject { //naming interface with I infront
  name: string
  link: string
  description: string
}
export type PropCard = { //naming props with Props
  name: string
  link: string
  description: string
}

/*
  USE Interface and Props: import and declare it in ReactTS
  https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/default_props
*/
import React from 'react'
import { PropCard } from '../interfaces/interfaces'

const ComponentCard: React.FC<PropCard> = ({ name, link, description }) => {
  return (
    <div style={{ width: '18rem' }}>
    </div>
  )
}
export default ComponentCard

/*
  React CHILDREN in props type
  https://blog.logrocket.com/using-react-children-prop-with-typescript/
  https://www.carlrippon.com/react-children-with-typescript/
*/
import React from 'react'
type Props = {
  children: JSX.Element
}

const LayoutLandingPage: React.FC<Props> = ({ children }) => {
  return (
      <div style={{ marginTop: '3.5rem' }}>
        {children}
      </div>
  )
}
export default LayoutLandingPage
