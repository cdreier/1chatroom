import React from 'react'

interface ChatMessageProps {
  author: string
  children: string
}

const ChatMessage: React.FC<ChatMessageProps> = ({ children, author }) => {
  return (
    <div>
      {author}: {children}
    </div>
  )
}

export default ChatMessage
