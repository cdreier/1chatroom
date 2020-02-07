import styled from 'styled-components'

const Table = styled.div`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 12px;
  color: #484848;
  display:table;
`

const TableRow = styled.div`
  display:table-row;
  color: #484848;
  text-decoration: none;
  margin-top: 3px;
  &:nth-child(even){
    background-color: #f2f2f2;
  }
`

const TableCol = styled.div`
  display:table-cell;
  text-align: center;
  max-width: 300px;
  word-wrap: break-word;
  padding: 12px 0px;
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
