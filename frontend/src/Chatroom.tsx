import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ChatStore } from './store/index'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const MessageContainer = styled.div`
  flex: 1;
`

const InputContainer = styled.div`
  background-color: palegreen;
  padding: 12px;
  width: 100%;
`

const Chatroom: React.FC = () => {

  const { id } = useParams()
  const store = useContext(ChatStore)

  useEffect(() => {
    store.loadMessages(id)
  },        [id])

  return (
    <Container>
      <MessageContainer>
        <p>Chatroom</p>
      </MessageContainer>
      <InputContainer>
  <input />
      </InputContainer>
    </Container>
  )
}

export default Chatroom
