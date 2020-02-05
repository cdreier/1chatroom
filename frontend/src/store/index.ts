import React from 'react'
import AdminModel from './AdminModel'
import ChatModel from './ChatModel'

const AdminStore = React.createContext(new AdminModel())
const ChatStore = React.createContext(new ChatModel())

export {
  AdminStore,
  ChatStore,
}
