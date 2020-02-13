import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ChatStore } from './store/index'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import ChatInput from './components/ChatInput'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`

const MessageContainer = styled.div`
  flex: 1;
`

const UserList = styled.div`
  height: 100%;
  width: 200px;
  border-right: 1px solid #f2f2f2;
`

const ChatContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`

const Chatroom: React.FC = () => {

  const { id } = useParams()
  const store = useContext(ChatStore)

  useEffect(() => {
    store.connect(id)
  },        [id])

  const sendMsg = (msg: string) => {
    store.sendMessage(msg)
  }

  return (
    <Container>
      <UserList>
        {store.users.map(u => {
          return (
            <p key={u.name}>{u.name}</p>
          )
        })}
      </UserList>
      <ChatContainer>
        <MessageContainer>
          <p>Chatroom</p>
        </MessageContainer>
        <ChatInput onSubmit={msg => sendMsg(msg)} />
      </ChatContainer>
    </Container>
  )
}

export default observer(Chatroom)
