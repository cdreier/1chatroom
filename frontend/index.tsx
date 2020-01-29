import { hot } from 'react-hot-loader/root'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/App'

// import * as mobx from 'mobx'
// mobx.useStrict(true)

const RootComponent = hot(() => {
  return <App />
})

ReactDOM.render(
  <RootComponent />,
  document.getElementById('mount'),
)
