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
// Antd Table row hover effect/color
export const Table = styled(AntTable)`
  .ant-table-row:hover .ant-table-cell-row-hover {
    background: #d5f0f7;
  }
`

// change AntdTable Header
// https://stackoverflow.com/questions/72011001/how-to-change-antd-table-header-color
export const Table = styled(AntTable)`
  .ant-table-thead .ant-table-cell {
      background-color: green;
    }
`


// AntdModal: use props to control children components
// https://stackoverflow.com/questions/63596397/how-to-dynamically-disable-the-button-of-antd-modal-using-button-props
const example = () => {
  const disableCondition = calculation
  
  return(
    <Modal
      ...
      okButtonProps={{ disabled:  disableCondition  }}
    >
  )
}
