import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Demo from './Demo'

interface IProps {}

class App extends React.Component<IProps> {

  render() {
    return (
      <Router>
        <Route path="/" exact component={Demo} />
      </Router>
    )
  }
}

export default App
