import styled from 'styled-components'

export const DivStatus = styled.div`
  //props should be lowercase
  z-index: ${(props) => props.zindex};
  margin-left: ${(props) => props.first};
  background-image: url(${(props) => props.picture}); /* The image used */
`
