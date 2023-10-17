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
  //row expanded effect, use Antd RowName to set this CSS class
  .table-row-expanded {
    background-color: ${props => props.theme.CLOUD_BURST_COLOR};
  }

  //effect when hover a row
  .ant-table-row:hover .ant-table-cell-row-hover {
    background: #c9d1f2;
  }

  //effect when hover an expanded row
  .ant-table-row:hover.table-row-expanded .ant-table-cell-row-hover {
    background-color: ${props => props.theme.CLOUD_BURST_COLOR};
    border: none;
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
