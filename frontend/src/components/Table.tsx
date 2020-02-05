import styled from 'styled-components'

const Table = styled.div`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 12px;
  color: #484848;
  display:table;
`

interface TableRowProps {
  active?: boolean
}

const TableRow = styled.div<TableRowProps>`
  display:table-row;
  color: #484848;
  text-decoration: none;
  margin-top: 3px;
  ${props => props.active ? 'background-color: #f2f2f2;' : ''}
  :hover{
    background-color: #f2f2f2;
  }
  cursor: pointer;
`

const TableCol = styled.div`
  display:table-cell;
  text-align: center;
  max-width: 300px;
  word-wrap: break-word;
  padding: 12px 0px;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  :first-child {
    border-left: 1px solid #eaeaea;
  }
  :last-child {
    border-right: 1px solid #eaeaea;
  }
`

const TableHead = styled.div`
  display: table-row;
  span {
    display: table-cell;
    text-align: center;
    font-weight: bold;
  }
`

export {
  Table,
  TableRow,
  TableCol,
  TableHead,
}
