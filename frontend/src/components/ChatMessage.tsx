import React from 'react'
import styled from 'styled-components'

interface ContainerProps {
  ownMessage: boolean
}

const Container = styled.div<ContainerProps>`
  border: 1px solid ${props => props.theme.colors.borders};
  background-color: ${props => props.ownMessage ? props.theme.colors.ownMessage : props.theme.colors.otherMessage};
  padding: 15px;
  max-width: 500px;
  border-bottom-left-radius: ${props => props.ownMessage ? '6px' : '0px'};
  border-bottom-right-radius: ${props => props.ownMessage ? '0px' : '6px'};;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  margin-top: 9px;
  ${props => props.ownMessage ? 'align-self: flex-end;' : ''};
`

const ChatHead = styled.div`
  font-size: ${props => props.theme.fonts.normal};
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
  font-size: ${props => props.theme.fonts.big};
  line-height: ${props => props.theme.fonts.lineHeightBig};
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
