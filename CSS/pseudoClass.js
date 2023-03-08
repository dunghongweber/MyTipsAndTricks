import styled from 'styled-component'
import {Button as AntButton} from 'antd'
/**
  https://www.w3schools.com/css/css_pseudo_classes.asp
*/

export const MyDiv = styled(AntButton)`

  &:hover{
    position: relative;
    top: -20px;
  }

  &:focus{
    border: 5px double #F63232;
    outline: none;
  }

`
