import React, { useContext, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { ChatStore } from './store/index'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import ChatInput from './components/ChatInput'
import ChatMessage from './components/ChatMessage'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`

const MessageContainer = styled.div`
  flex: 1;
  padding: 0 12px;
  overflow: auto;
  margin-bottom: 6px;
`

const Scrollable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`

const UserList = styled.div`
  height: 100%;
  width: 200px;
  border-right: 1px solid ${props => props.theme.colors.secondary};
  font-size: 1em;
  font-family: ${props => props.theme.fonts.secondary};
`

const ChatContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`

const LoadMore = styled.div`
`

const Chatroom: React.FC = () => {

  const { id } = useParams()
  const store = useContext(ChatStore)
  const chatTop = useRef<HTMLDivElement>()
  const scrollRef = useRef<HTMLDivElement>()
  const msgContainerRef = useRef<HTMLDivElement>()

  useEffect(() => {
    store.connect(id)
  },        [id])

  useEffect(() => {
    const observer = new IntersectionObserver(intersectionList => {
      if (intersectionList[0].isIntersecting) {
        console.log('loadmore')
        store.loadMore()
      }
    },                                        { root: msgContainerRef.current })
    observer.observe(chatTop.current)
    return () => {
      observer.unobserve(chatTop.current)
    }
  },        [])

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
  },        [store.messages.length])

  const sendMsg = (msg: string) => {
    store.sendMessage(msg)
  }

  return (
    <Container>
      <UserList>
        {store.users.map(u => {
          return (
            <p key={u.name}>{u.name} {u.online ?  '*' : ''}</p>
          )
        })}
      </UserList>
      <ChatContainer>
        <MessageContainer ref={msgContainerRef}>
          <Scrollable ref={scrollRef}>
            <LoadMore ref={chatTop} >...</LoadMore>
          {store.messages.map(m => {
            return (
              <ChatMessage key={m.hash} author={m.author} date={m.time} self={store.self}>{m.text}</ChatMessage>
            )
          })}
          </Scrollable>
        </MessageContainer>
        <ChatInput onSubmit={msg => sendMsg(msg)} />
      </ChatContainer>
    </Container>
  )
}

export default observer(Chatroom)
