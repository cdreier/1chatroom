import React, { useState } from 'react'
import styled from 'styled-components'

const InputContainer = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  padding: 12px;
  >form{
    display: flex;
  }
`

const Input = styled.input`
  flex: 1;
  padding: 6px;
  outline: none;
`

interface ChatInputProps {
  onSubmit: (msg: string) => void
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {

  const [msg, setMsg] = useState('')

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (msg.trim() === '') {
      return
    }
    onSubmit(msg)
    setMsg('')
  }

  return (
    <InputContainer>
      <form onSubmit={(e) => submit(e)}>
        <Input autoFocus value={msg} onChange={e => setMsg(e.target.value)} data-testid="input" />
      </form>
    </InputContainer>
  )
}

export default ChatInput
