import React from 'react'
import AdminModel from './AdminModel'

const AdminStore = React.createContext(new AdminModel())

export {
  AdminStore,
}
