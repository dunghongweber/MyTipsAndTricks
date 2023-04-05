import styled from 'styled-components'
import { Select as AntSelect } from 'antd'

//border radius for Antd Select
export const Select = styled(AntSelect)`
  &:not(.ant-select-disabled):not(.ant-select-customize-input) {
    .ant-select-selector {
      border-radius: 0.5rem;
    }
  }
`
