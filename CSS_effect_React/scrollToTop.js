/**
* How to scroll to top in a scrollable/overflow div
*/

import React, { useRef } from 'react'
import {
  Container,
  ListSurvey,
} from './styles'

const Component = ({surveysList}) => {
  const [surveySearch, setSurveySearch] = useState('')
  const topRef = useRef(null) //create a ref point

  const scrollToTop = () => {
    topRef.current.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  //when searchbox value changes
  useEffect(() => {
      scrollToTop() //scroll to top every search
  }, [surveySearch])

  return (
    <div>
      <ListSurvey ref={topRef}> //put a ref point where you want to scroll
          {surveysList.map((element, index) => {
              return (<SurveyItem/>)
          })}
        </ListSurvey>
    </div>
  )
}

export default Component


/***********************************************************/
/*
  ListSurvey styling is a scrollable component
*/
export const ListSurvey = styled.div`
  overflow-y: scroll;
`
