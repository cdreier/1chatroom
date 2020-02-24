import React from 'react'
import styled from 'styled-components'

interface ContainerProps {
  ownMessage: boolean
}

const Container = styled.div<ContainerProps>`
  border: 1px solid #aeaeae;
  padding: 9px;
  max-width: 400px;
  border-bottom-left-radius: ${props => props.ownMessage ? '6px' : '0px'};
  border-bottom-right-radius: ${props => props.ownMessage ? '0px' : '6px'};;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  margin-top: 9px;
  ${props => props.ownMessage ? 'align-self: flex-end;' : ''};
`

const ChatHead = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  font-family: ${props => props.theme.fonts.secondary};
`

const Author = styled.span`
`
const ChatTime = styled.span`
  margin-left: 30px;
`

const MessageBody = styled.p`
  margin: 9px 0 0;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 21px;
  line-height: 30px;
`

interface ChatMessageProps {
  author: string
  date: Date
  children: string
  self: string
}

const ChatMessage: React.FC<ChatMessageProps> = ({ children, author, date, self }) => {
  return (
    <Container ownMessage={self === author}>
      <ChatHead>
        <Author>{author}</Author>
        <ChatTime>{date.toLocaleDateString()} - {date.toLocaleTimeString()}</ChatTime>
      </ChatHead>
      <MessageBody>{children}</MessageBody>
    </Container>
  )
}

export default ChatMessage
