import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Chatroom from './Chatroom'

interface IProps {}

class App extends React.Component<IProps> {

  render() {
    return (
      <Router>
        <Route path="/" exact component={Chatroom} />
      </Router>
    )
  }
}

export default App
