import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChatStore } from './store/index'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import ChatInput from './components/ChatInput'
import ChatMessage from './components/ChatMessage'
import useDebounce from './hooks/useDebounce'

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
  color: ${props => props.theme.colors.black};
  background-color: rgba(255, 255, 255, 0.4);
  padding: 0 9px;
  display: none;

  @media ${props => props.theme.util.breakpoint} {
    display: block;
  }
`

const ChatContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`

const LoadMore = styled.div``
const ChatBottom = styled.div`
  height: 1px;
  width: 100%;
  border-color: red;
`

const Chatroom: React.FC = () => {

  const { id } = useParams()
  const store = useContext(ChatStore)
  const chatTop = useRef<HTMLDivElement>()
  const chatBottom = useRef<HTMLDivElement>()
  const scrollRef = useRef<HTMLDivElement>()
  const msgContainerRef = useRef<HTMLDivElement>()
  const [scrollLock, setScrollLock] = useState(false)
  const debounce = useDebounce(700)

  useEffect(() => {
    store.connect(id)
  },        [id])

  useEffect(() => {
    if (!store.connected) {
      return
    }
    const observer = new IntersectionObserver(intersectionList => {
      intersectionList.forEach(e => {
        switch (e.target){
          case chatTop.current:
            if (e.isIntersecting) {
              debounce(() => store.loadMore())
            }
            break
          case chatBottom.current:
            setScrollLock(!e.isIntersecting)
            break
        }
      })

    },                                        { root: msgContainerRef.current })
    observer.observe(chatTop.current)
    observer.observe(chatBottom.current)
    return () => {
      observer.unobserve(chatTop.current)
      observer.unobserve(chatBottom.current)
    }
  },        [store.connected])

  useEffect(() => {
    if (scrollLock) {
      return
    }
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
            <ChatBottom ref={chatBottom}>&nbsp;</ChatBottom>
          </Scrollable>
        </MessageContainer>
        <ChatInput onSubmit={msg => sendMsg(msg)} />
      </ChatContainer>
    </Container>
  )
}

export default observer(Chatroom)
