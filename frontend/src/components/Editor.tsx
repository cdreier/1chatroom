import React, { useContext } from 'react'
import { DemoStore } from '../store'
import { observer } from 'mobx-react-lite'

const Editor: React.FC = () => {
  const demo = useContext(DemoStore)
  return (
    <input value={demo.demostring} onChange={e => demo.demostring = e.target.value} data-testid="editorinput" />
  )
}

export default observer(Editor)
