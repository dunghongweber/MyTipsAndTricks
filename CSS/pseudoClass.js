import styled from 'styled-component'
import {Button as AntButton} from 'antd'

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
