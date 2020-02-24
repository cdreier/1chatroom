import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Chatroom from './Chatroom'
import AdminPanel from './AdminPanel'
import styled, { ThemeProvider } from 'styled-components'
import Theme from './theme/default'

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
    <ThemeProvider theme={Theme}>
      <Container>
        <Router>
          <Switch >
            <Route path="/admin" exact component={AdminPanel} />
            <Route path="/:id" exact component={Chatroom} />
          </Switch >
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App
