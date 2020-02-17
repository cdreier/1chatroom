import React from 'react'
import styled from 'styled-components'

interface ContainerProps {
  ownMessage: boolean
}

const Container = styled.div<ContainerProps>`
  border: 1px solid #aeaeae;
  padding: 9px;
  border-bottom-left-radius: ${props => props.ownMessage ? '6px' : '0px'};
  border-bottom-right-radius: ${props => props.ownMessage ? '0px' : '6px'};;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  margin-top: 9px;
  ${props => props.ownMessage ? 'align-self: flex-end;' : ''};
`

const Author = styled.span`
  font-size: 12px;
`

const MessageBody = styled.p`
  margin: 9px 0 0;
`

interface ChatMessageProps {
  author: string
  children: string
  self: string
}

const ChatMessage: React.FC<ChatMessageProps> = ({ children, author, self }) => {
  return (
    <Container ownMessage={self === author}>
      <Author>{author}</Author>
      <MessageBody>{children}</MessageBody>
    </Container>
  )
}

export default ChatMessage
