import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { DemoStore } from '../store'

const Wrapper = styled.div`
  background-color: #333;
  padding: 10px;
  color: white;
  display: flex;
  justify-content: space-between;
`

const Title = styled.span`
`

const Demo = styled.span`
`

interface IProps {
  children: any,
}

const Headerbar = ({ children }: IProps) => {

  const demo = useContext(DemoStore)

  return (
    <Wrapper>
      <Title>{children}</Title>
      <Demo>{demo.demostring}</Demo>
    </Wrapper>
  )
}

export default observer(Headerbar)
