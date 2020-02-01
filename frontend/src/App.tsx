import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Chatroom from './Chatroom'
import AdminPanel from './AdminPanel'
import styled from 'styled-components'

const Container = styled.div`
  width: 900px;
  margin: 0 auto;
`

const App: React.FC = () => {
  return (
    <Container>
      <Router >
        <Route path="/" exact component={Chatroom} />
        <Route path="/admin" exact component={AdminPanel} />
      </Router >
    </Container>
  )
}

export default App
