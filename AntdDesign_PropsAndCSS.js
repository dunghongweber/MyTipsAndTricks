/*
  https://www.designcise.com/web/tutorial/how-to-reuse-common-css-in-styled-components
  antd props usually take in string value only, don't use boolean value
*/
import styled, { css } from 'styled-components';

//working with props
export const DivStatus = styled.div`
  //props should be lowercase
  z-index: ${(props) => props.zindex};
  margin-left: ${(props) => props.first};
  background-image: url(${(props) => props.picture}); /* The image used */
`

//props with CSS function
const styledDiv = styled.div`
  ${props => props.takeViewportHeight && `min-height: calc(100vh - 16px);`}
`

// REUSE: extract CSS
const CommonStyle = css`
    height: 50px;
    color: blue;
    text-align: center;
    background-color: aqua;
`
const Square = styled.div`
    width: 50px;
    ${CommonStyle}
`

//Extend the Styles of an Existing Component
const Square2 = styled.div`
    width: 50px;
    height: 50px;
    color: blue;
`
const Rectangle = styled(Square2)`
    width: 100px;
`
