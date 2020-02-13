import React, { useState } from 'react'
import styled from 'styled-components'

const InputContainer = styled.div`
  background-color: palegreen;
  padding: 12px;
  width: 100%;
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
    onSubmit(msg)
    setMsg('')
  }

  return (
    <InputContainer>
      <form onSubmit={(e) => submit(e)}>
        <Input value={msg} onChange={e => setMsg(e.target.value)} />
      </form>
    </InputContainer>
  )
}

export default ChatInput
