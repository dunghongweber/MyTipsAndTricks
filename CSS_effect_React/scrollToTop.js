/**
* How to scroll to top in a scrollable/overflow div
* https://stackoverflow.com/questions/71131353/how-put-scroll-to-top-when-scroller-is-inside-div-in-react
* https://codesandbox.io/s/fervent-chatterjee-2owrqu?file=/src/App.js:122-229
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
