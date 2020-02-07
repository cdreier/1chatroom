import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Chatroom from './Chatroom'
import AdminPanel from './AdminPanel'
import styled from 'styled-components'

const Container = styled.div`
  width: 900px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0 12px;
`

const App: React.FC = () => {
  return (
    <Container>
      <Router>
        <Switch >
          <Route path="/admin" exact component={AdminPanel} />
          <Route path="/:id" exact component={Chatroom} />
        </Switch >
      </Router>
    </Container>
  )
}

export default App
