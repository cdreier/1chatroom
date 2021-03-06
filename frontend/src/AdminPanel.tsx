import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { AdminStore } from './store'
import Login from './components/Login'
import { Table, TableRow, TableCol, TableHead } from './components/Table'

const AdminPanel: React.FC = () => {

  const store = useContext(AdminStore)
  useEffect(() => {
    if (store.tokenSubmitted) {
      store.fetchUsers()
    }
  },        [store.tokenSubmitted])

  const [name, setName] = useState('')

  const saveUser = () => {
    store.createUser(name)
    setName('')
  }

  const onLogin = (token: string) => {
    store.tokenSubmitted = true
    store.token = token
  }

  if (!store.tokenSubmitted) {
    return (
      <Login onLogin={token => onLogin(token)} />
    )
  }

  return (
    <>
      <div>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <button onClick={() => saveUser()}>save</button>
      </div>
      <div>
        {store.errorMessage}
      </div>
      <div>
        <Table>
          <TableHead>
            <span>Name</span>
            <span>URL</span>
          </TableHead>
          {store.users.map(u => {
            return (
              <TableRow key={u.id}>
                <TableCol>{u.name}</TableCol>
                <TableCol>{window.location.host}/{u.id}</TableCol>
              </TableRow>
            )
          })}
        </Table>
      </div>
    </>
  )
}

export default observer(AdminPanel)
