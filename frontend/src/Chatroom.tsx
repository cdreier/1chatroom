import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ChatStore } from './store/index'

const Chatroom: React.FC = () => {

  const { id } = useParams()
  const store = useContext(ChatStore)

  useEffect(() => {
    store.loadMessages(id)
  },        [id])

  return (
    <p>Chatroom</p>
  )
}

export default Chatroom
