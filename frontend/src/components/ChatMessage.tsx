import React from 'react'
import styled from 'styled-components'

interface ContainerProps {
  ownMessage: boolean
  system?: boolean
}

const Container = styled.div<ContainerProps>`
  border-bottom: 1px solid white;
  ${props => props.ownMessage ? 'border-right ' : 'border-left'}: 1px solid white;
  background-color: ${props => props.ownMessage ? props.theme.colors.ownMessage : props.theme.colors.otherMessage};
  ${props => props.ownMessage ? 'align-self: flex-end;' : ''};
  border-bottom-left-radius: ${props => props.ownMessage ? '6px' : '0px'};
  border-bottom-right-radius: ${props => props.ownMessage ? '0px' : '6px'};
  padding: 15px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  margin-top: 9px;

  max-width: ${props => props.system ? '100%' : '500px'};
  ${props => props.system ? 'width: 95%' : ''};
  ${props => props.system ? 'align-self: center;' : ''};
`

const ChatHead = styled.div`
  font-size: ${props => props.theme.fonts.normal};
  display: flex;
  justify-content: space-between;
  font-family: ${props => props.theme.fonts.secondary};
`

const Author = styled.span`
  color: ${props => props.theme.colors.black};
`

interface ChatTimeProps {
  hidden?: boolean
}

const ChatTime = styled.span<ChatTimeProps>`
  margin-left: 30px;
  color: ${props => props.theme.colors.black};
  ${props => props.hidden ? 'display: none' : ''};
`

const MessageBody = styled.p`
  margin: 9px 0 0;
  font-family: ${props => props.theme.fonts.primary};
  font-size: ${props => props.theme.fonts.big};
  line-height: ${props => props.theme.fonts.lineHeightBig};
  color: ${props => props.theme.colors.black};
`

interface ChatMessageProps {
  author: string
  date: Date
  children: string
  self: string
  dateFormatter?: (d: Date) => string
}

const SYSTEM_MESSAGE_AUTHOR = 'System'

const ChatMessage: React.FC<ChatMessageProps> = ({ children, author, date, self, dateFormatter }) => {

  const isSystemMessage = author === SYSTEM_MESSAGE_AUTHOR

  return (
    <Container ownMessage={self === author} system={isSystemMessage}>
      <ChatHead>
        <Author>{author}</Author>
        <ChatTime hidden={isSystemMessage}>{dateFormatter(date)}</ChatTime>
      </ChatHead>
      <MessageBody>{children}</MessageBody>
    </Container>
  )
}

ChatMessage.defaultProps = {
  dateFormatter: (d: Date) => `${d.toLocaleDateString()}, ${d.toLocaleTimeString()}`,
}

export default ChatMessage
