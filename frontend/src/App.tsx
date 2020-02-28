import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Chatroom from './Chatroom'
import AdminPanel from './AdminPanel'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Theme from './theme/default'

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0 12px;

  @media ${props => props.theme.util.breakpoint} {
    width: 900px;
    height: 100%;
  }

`

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.background};
    background-image: linear-gradient(30deg, ${props => props.theme.colors.background2} 12%, transparent 12.5%, transparent 87%, ${props => props.theme.colors.background2} 87.5%, ${props => props.theme.colors.background2}),
    linear-gradient(150deg, ${props => props.theme.colors.background2} 12%, transparent 12.5%, transparent 87%, ${props => props.theme.colors.background2} 87.5%, ${props => props.theme.colors.background2}),
    linear-gradient(30deg, ${props => props.theme.colors.background2} 12%, transparent 12.5%, transparent 87%, ${props => props.theme.colors.background2} 87.5%, ${props => props.theme.colors.background2}),
    linear-gradient(150deg, ${props => props.theme.colors.background2} 12%, transparent 12.5%, transparent 87%, ${props => props.theme.colors.background2} 87.5%, ${props => props.theme.colors.background2}),
    linear-gradient(60deg, ${props => props.theme.colors.background3} 25%, transparent 25.5%, transparent 75%, ${props => props.theme.colors.background3} 75%, ${props => props.theme.colors.background3}),
    linear-gradient(60deg, ${props => props.theme.colors.background3} 25%, transparent 25.5%, transparent 75%, ${props => props.theme.colors.background3} 75%, ${props => props.theme.colors.background3});
    background-size:40px 70px;
    background-position: 0 0, 0 0, 20px 35px, 20px 35px, 0 0, 20px 35px;
  }

`

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
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
