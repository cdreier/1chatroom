import React from 'react'
import DemoModel from './DemoModel'

const DemoStore = React.createContext(new DemoModel())

export {
  DemoStore,
}
